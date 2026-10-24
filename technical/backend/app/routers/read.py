"""P3 read endpoints, all under /api/v1 and all tenant-scoped (row-level security)."""
from __future__ import annotations

import json
import re

import numpy as np
import pandas as pd
import psycopg2.extras
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import FileResponse, JSONResponse

from .. import config, deps
from ..db import pg
from ..ml import irt
from ..services import analytics, profiles

router = APIRouter(prefix="/api/v1")
STAFF = deps.require(*deps.STAFF)
OWNER = deps.require("owner", "admin")


def audit(conn, p: deps.Principal, action: str, entity: str, entity_id: str) -> None:
    with conn.cursor() as cur:
        cur.execute("INSERT INTO audit_log(actor, institute_id, action, entity, entity_id) VALUES (%s,%s,%s,%s,%s)",
                    (p.user_id, p.institute_id, action, entity, str(entity_id)))


def batch_or_404(conn, batch_id: str) -> dict:
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute("SELECT id::text, name, exam, class_level, mentor_capacity_per_week, published_capacity FROM batches WHERE id=%s", (batch_id,))
            b = cur.fetchone()
    except psycopg2.errors.InvalidTextRepresentation:
        conn.rollback()
        raise HTTPException(422, "batch id is not a valid uuid")
    if not b:
        raise HTTPException(404, "batch not found")
    return dict(b)


def flagged_for_test(conn, test_id: str) -> list[dict]:
    df = analytics.qdf(conn, "SELECT r.student_id::text AS student_id, r.question_id::text AS question_id, r.is_correct::int AS y, r.response, tq.position "
                             "FROM responses r JOIN test_questions tq ON tq.test_id=r.test_id AND tq.question_id=r.question_id "
                             "WHERE r.test_id=%s AND r.status='answered'", (test_id,))
    if not len(df):
        return []
    fl = irt.flag_wrong_keys(df, min_n=20)
    out = []
    keys = analytics.qdf(conn, "SELECT question_id::text AS question_id, accepted_answers::text AS accepted FROM answer_keys WHERE test_id=%s AND version=(SELECT max(version) FROM answer_keys k2 WHERE k2.test_id=answer_keys.test_id AND k2.question_id=answer_keys.question_id)", (test_id,))
    kmap = dict(zip(keys.question_id, keys.accepted)) if len(keys) else {}
    tot = df.groupby("student_id").y.mean()
    top = set(tot[tot >= tot.quantile(0.67)].index)
    for r in fl.itertuples():
        q = df[df.question_id == r.question_id]
        top_resp = q[q.student_id.isin(top)].response.value_counts()
        out.append({"test_id": test_id, "question_id": r.question_id, "question_no": int(q.position.iloc[0]),
                    "point_biserial": round(float(r.point_biserial), 3), "n": int(r.n), "current_key": kmap.get(r.question_id),
                    "suggested_key": str(top_resp.index[0]) if len(top_resp) else None,
                    "reason": f"Correctness correlates {r.point_biserial:.2f} with the overall score; the key may be wrong",
                    "confidence": round(float(min(1, max(0, 0.5 - r.point_biserial))), 2)})
    return out


# ---------------------------------------------------------------- batches
@router.get("/batches")
def list_batches(p=Depends(STAFF), conn=Depends(deps.tenant)):
    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute("SELECT b.id::text, b.name, b.exam, b.class_level, b.academic_year, b.published_capacity, b.mentor_capacity_per_week, "
                    "count(s.id) AS students, count(s.id) FILTER (WHERE s.status='active') AS active_students "
                    "FROM batches b LEFT JOIN students s ON s.batch_id=b.id GROUP BY b.id ORDER BY b.name")
        return {"institute_slug": deps.slug_of(p.institute_id), "batches": [dict(r) for r in cur.fetchall()]}


@router.get("/batches/{batch_id}/students")
def batch_students(batch_id: str, p=Depends(STAFF), conn=Depends(deps.tenant)):
    batch_or_404(conn, batch_id)
    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute("SELECT id::text AS student_id, roll_no, name, status, dob FROM students WHERE batch_id=%s ORDER BY roll_no", (batch_id,))
        return {"batch_id": batch_id, "students": [{**dict(r), "dob": str(r["dob"])} for r in cur.fetchall()]}


@router.get("/batches/{batch_id}/heatmap")
def heatmap(batch_id: str, top_topics: int = Query(25, ge=5, le=100), as_of: str | None = None,
            p=Depends(STAFF), conn=Depends(deps.tenant)):
    batch_or_404(conn, batch_id)
    res = analytics.state(conn, p.institute_id, batch_id, as_of)
    tests = analytics.qdf(conn, "SELECT id::text AS id FROM tests WHERE batch_id=%s ORDER BY test_date DESC LIMIT 3", (batch_id,))
    flags = []
    for tid in (tests.id.tolist() if len(tests) else []):
        flags += flagged_for_test(conn, tid)
    wk = [{"test_id": f["test_id"], "question_no": f["question_no"], "reason": f["reason"], "confidence": f["confidence"]} for f in flags[:5]]
    return analytics.heatmap_json(res, deps.slug_of(p.institute_id), batch_id, top_topics, wk)


@router.get("/batches/{batch_id}/support-list")
def support_list(batch_id: str, as_of: str | None = None, p=Depends(STAFF), conn=Depends(deps.tenant)):
    b = batch_or_404(conn, batch_id)
    res = analytics.state(conn, p.institute_id, batch_id, as_of)
    audit(conn, p, "view_risk_scores", "batch", batch_id)
    return analytics.support_list_json(res, deps.slug_of(p.institute_id), capacity=b["mentor_capacity_per_week"])


@router.get("/batches/{batch_id}/percentile")
def batch_percentile(batch_id: str, as_of: str | None = None, p=Depends(STAFF), conn=Depends(deps.tenant)):
    b = batch_or_404(conn, batch_id)
    res = analytics.state(conn, p.institute_id, batch_id, as_of)
    return analytics.percentile_json(res, deps.slug_of(p.institute_id), b)


@router.get("/batches/{batch_id}/summary")
def batch_summary(batch_id: str, as_of: str | None = None, p=Depends(STAFF), conn=Depends(deps.tenant)):
    b = batch_or_404(conn, batch_id)
    res = analytics.state(conn, p.institute_id, batch_id, as_of)
    tt = res["tt"]
    return {"batch": b, "students": int(len(res["students"])), "active": int((res["students"].status == "active").sum()),
            "scored_for_support": int(len(res["scores"])), "excluded_no_consent": res["excluded_no_consent"],
            "mean_test_pct": float(tt.pct.mean()) if len(tt) else None, "tests_in_batch": int(tt.test_id.nunique()),
            "needs_support_cells": int((res["cells"].band == "needs_support").sum()),
            "recompute_seconds": res["seconds"], "as_of": str(res["as_of"].date())}


# ---------------------------------------------------------------- students
def _check_student(p, conn, sid: str) -> dict:
    deps.guard_student(p, sid)
    try:
        return profiles.student_row(conn, sid)
    except profiles.NotFound:
        raise HTTPException(404, "student not found")
    except psycopg2.errors.InvalidTextRepresentation:
        conn.rollback()
        raise HTTPException(422, "student id is not a valid uuid")


@router.get("/students/{student_id}/profile")
def student_profile(student_id: str, as_of: str | None = None, p=Depends(deps.current_principal), conn=Depends(deps.tenant)):
    _check_student(p, conn, student_id)
    audit(conn, p, "view_student_profile", "student", student_id)
    return profiles.student_envelope(conn, p.institute_id, deps.slug_of(p.institute_id), student_id, as_of)


@router.get("/students/{student_id}/parent-view")
def parent_view(student_id: str, as_of: str | None = None, p=Depends(deps.current_principal), conn=Depends(deps.tenant)):
    _check_student(p, conn, student_id)
    return profiles.parent_view(conn, p.institute_id, deps.slug_of(p.institute_id), student_id, as_of)


@router.get("/students/{student_id}/percentile")
def student_percentile(student_id: str, as_of: str | None = None, p=Depends(deps.current_principal), conn=Depends(deps.tenant)):
    sr = _check_student(p, conn, student_id)
    res = analytics.state(conn, p.institute_id, sr["batch_id"], as_of)
    out = analytics.percentile_json(res, deps.slug_of(p.institute_id), {"exam": sr["exam"]})
    out["students"] = [s for s in out["students"] if s["student_id"] == student_id]
    return out


@router.get("/students/{student_id}/reports")
def student_reports(student_id: str, p=Depends(deps.current_principal), conn=Depends(deps.tenant)):
    _check_student(p, conn, student_id)
    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute("SELECT id::text, lang AS language, period AS month, content AS body, numbers_json, verified, path AS source, created_at "
                    "FROM reports WHERE student_id=%s ORDER BY created_at DESC LIMIT 50", (student_id,))
        rows = [{**dict(r), "created_at": r["created_at"].isoformat(), "checks": [{"id": "verifier_all_8", "passed": bool(r["verified"])}]} for r in cur.fetchall()]
    return {**analytics.env("reports/1", deps.slug_of(p.institute_id), "model"), "hi_reviewed": False, "reports": rows}


@router.get("/tests/{test_id}/flagged-questions")
def flagged_questions(test_id: str, p=Depends(STAFF), conn=Depends(deps.tenant)):
    with conn.cursor() as cur:
        try:
            cur.execute("SELECT 1 FROM tests WHERE id=%s", (test_id,))
        except psycopg2.errors.InvalidTextRepresentation:
            conn.rollback()
            raise HTTPException(422, "test id is not a valid uuid")
        if not cur.fetchone():
            raise HTTPException(404, "test not found")
    return {"test_id": test_id, "flags": flagged_for_test(conn, test_id), "rule": f"point-biserial below {irt.WRONG_KEY_PB} with at least 20 answers"}


@router.get("/tests")
def list_tests(batch_id: str | None = None, p=Depends(STAFF), conn=Depends(deps.tenant)):
    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        if batch_id:
            cur.execute("SELECT id::text, batch_id::text, name, test_date, exam_pattern_code, max_marks, source, day_after_off_warning FROM tests WHERE batch_id=%s ORDER BY test_date DESC", (batch_id,))
        else:
            cur.execute("SELECT id::text, batch_id::text, name, test_date, exam_pattern_code, max_marks, source, day_after_off_warning FROM tests ORDER BY test_date DESC LIMIT 200")
        return {"tests": [{**dict(r), "test_date": str(r["test_date"])} for r in cur.fetchall()]}


# ---------------------------------------------------------------- owner and evidence pages
@router.get("/owner/dashboard")
def owner_dashboard(as_of: str | None = None, p=Depends(OWNER), conn=Depends(deps.tenant)):
    audit(conn, p, "export_register", "owner_dashboard", p.institute_id)
    return profiles.owner_dashboard(conn, p.institute_id, deps.slug_of(p.institute_id), as_of)


def _file_json(path):
    if not path.exists():
        raise HTTPException(404, f"{path.name} not found")
    return JSONResponse(json.loads(path.read_text(encoding="utf-8")))


@router.get("/datacard")
def datacard(p=Depends(deps.current_principal)):
    return _file_json(config.ARTIFACTS / deps.slug_of(p.institute_id) / "datacard.json")


@router.get("/scaling")
def scaling(p=Depends(deps.current_principal)):
    return _file_json(config.ARTIFACTS / "scaling.json")


@router.get("/models")
def models(p=Depends(deps.current_principal)):
    base = json.loads((config.ARTIFACTS / "models.json").read_text(encoding="utf-8"))
    mf = config.MODELS_DIR / "manifest.json"
    base["runtime"] = json.loads(mf.read_text(encoding="utf-8")) if mf.exists() else None
    return base


# ---------------------------------------------------------------- mock-compatible static routes (no auth, synthetic files only)
@router.get("/figures/{name}")
def figure(name: str):
    if not re.fullmatch(r"[a-z0-9_]+\.png", name):
        raise HTTPException(400, "bad name")
    p = config.ARTIFACTS / "figures" / name
    if not p.exists():
        raise HTTPException(404, "not found")
    return FileResponse(p, media_type="image/png")


@router.get("/{institute}/{file}")
def mock_file(institute: str, file: str):
    """Exactly what the Next.js mock API returns: ml/artifacts/<institute|global>/<file>.json (falls back to samples/)."""
    ok = re.compile(r"^[a-z0-9_]+$")
    if not ok.match(institute) or not ok.match(file):
        raise HTTPException(400, "bad name")
    for root in (config.ARTIFACTS,):
        real = root / (f"{file}.json" if institute == "global" else f"{institute}/{file}.json")
        sample = root / "samples" / (f"{file}.json" if institute == "global" else f"{institute}/{file}.json")
        for cand in (real, sample):
            if cand.exists():
                return FileResponse(cand, media_type="application/json")
    raise HTTPException(404, "not found")
