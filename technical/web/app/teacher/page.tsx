"use client";

import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import type { EChartsOption } from "echarts";
import { EChart } from "@/components/echart";
import { Badge, Button, Card, CardTitle, Note, Origin, PageHead, PageSkeleton, Select, Stat, Unavailable } from "@/components/ui";
import { useApp, useData } from "@/lib/app-context";
import { BAND_COLOR, BAND_LABEL, BAND_TONE, type Band } from "@/lib/bands";
import { useStudents } from "@/lib/names";
import { pct } from "@/lib/utils";

const PAGE = 8;
const BANDS: Band[] = ["not_enough_data", "needs_support", "steady", "strong"];
const SCALE = 3; // bar axis runs -SCALE..+SCALE on the ability scale (never shown as numbers)

export default function TeacherPage() {
  const { L, lang } = useApp();
  const mastery = useData("mastery");
  const risk = useData("risk");
  const { nameOf, rollOf, loading: sl } = useStudents();
  const [batchId, setBatchId] = useState("");
  const [sel, setSel] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(0);

  const m = mastery.data;
  const batch = m?.batches.find((b) => b.batch_id === batchId) ?? m?.batches[0];
  const tn = (t: { name_en: string; name_hi: string }) => (lang === "hi" ? t.name_hi : t.name_en);
  const bl = (b: Band) => L(...BAND_LABEL[b]);

  const grid = useMemo(() => {
    if (!m || !batch) return null;
    const ids = [...batch.student_ids].sort((a, b) => rollOf(a).localeCompare(rollOf(b)));
    const cell = new Map(m.cells.map((c) => [`${c.student_id}|${c.topic_id}`, c]));
    return { ids, topics: m.topics, cell };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [m, batch, sl]);

  const bandAt = (sid: string, tid: string): Band => {
    const c = grid?.cell.get(`${sid}|${tid}`);
    return (c?.band as Band) ?? "not_enough_data";
  };

  const option = useMemo<EChartsOption | null>(() => {
    if (!grid) return null;
    const data: unknown[] = [];
    grid.ids.forEach((sid, yi) =>
      grid.topics.forEach((t, xi) => {
        const b = t.probably_untaught ? "not_enough_data" : bandAt(sid, t.topic_id);
        data.push({ value: [xi, yi, BANDS.indexOf(b)], itemStyle: { color: BAND_COLOR[b], opacity: t.probably_untaught ? 0.55 : 1 } });
      })
    );
    return {
      grid: { left: 8, right: 8, top: 8, bottom: 110, containLabel: true },
      tooltip: {
        formatter: (p: unknown) => {
          const v = (p as { value: [number, number, number] }).value; const bb = BANDS[v[2]];
          const t = grid.topics[v[0]];
          const sid = grid.ids[v[1]];
          const extra = t.probably_untaught ? `<br/>${L("Probably not taught yet", "शायद अभी पढ़ाया नहीं गया")}` : "";
          return `${rollOf(sid)} · ${nameOf(sid)}<br/>${tn(t)}<br/><b>${bl(bb)}</b>${extra}`;
        },
      },
      xAxis: {
        type: "category",
        position: "bottom",
        data: grid.topics.map(tn),
        axisLabel: { rotate: 55, interval: 0, fontSize: 10, formatter: (s: string) => (s.length > 24 ? s.slice(0, 23) + "…" : s) },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: { type: "category", inverse: true, data: grid.ids.map((s) => rollOf(s)), axisLabel: { fontSize: 11, fontWeight: 600 }, axisLine: { show: false }, axisTick: { show: false } },
      visualMap: {
        type: "piecewise",
        show: false,
        dimension: 2,
        pieces: BANDS.map((b, i) => ({ value: i, color: BAND_COLOR[b] })),
      },
      series: [{ type: "heatmap", data, itemStyle: { borderColor: "#fff", borderWidth: 2, borderRadius: 3 } }],
    } as EChartsOption;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, lang, sl]);

  if (mastery.loading || risk.loading) return <PageSkeleton />;
  if (!m || !batch || !grid) return <Unavailable what="mastery" detail={mastery.error} />;

  const untaught = m.topics.filter((t) => t.probably_untaught);
  const r = risk.data;
  const rows = r ? [...r.list].sort((a, b) => nameOf(a.student_id).localeCompare(nameOf(b.student_id))) : [];
  const pages = Math.ceil(rows.length / PAGE);
  const shown = rows.slice(page * PAGE, page * PAGE + PAGE);
  const adults = rows.filter((x) => x.track === "full").length;
  const baseRows = r
    ? [
        { key: "b1_attendance_rule", en: "Attendance < 75% rule", hi: "उपस्थिति < 75% नियम" },
        { key: "b2_ranked_rule", en: "Ranked attendance rule", hi: "क्रमबद्ध उपस्थिति नियम" },
        { key: "model", en: "Pragati model", hi: "प्रगति मॉडल" },
      ].filter((x) => r.baselines[x.key])
    : [];
  const cmp: EChartsOption | null = r
    ? {
        legend: { bottom: 0 },
        xAxis: { type: "category", data: baseRows.map((b) => L(b.en, b.hi)) },
        yAxis: { type: "value", min: 0, max: 1, axisLabel: { formatter: (v: number) => pct(v) } },
        tooltip: { trigger: "axis", valueFormatter: (v) => pct(Number(v), 1) },
        series: [
          { name: L("Precision", "सटीकता"), type: "bar", data: baseRows.map((b) => r.baselines[b.key].precision) },
          { name: L("Recall", "पकड़"), type: "bar", data: baseRows.map((b) => r.baselines[b.key].recall) },
        ],
      }
    : null;

  const selCells = sel ? grid.topics.map((t) => ({ t, c: grid.cell.get(`${sel}|${t.topic_id}`) })) : [];

  return (
    <div className="space-y-6">
      <PageHead
        title={L("Home", "होम")}
        sub={L(`${batch.name} · ${batch.exam.replace("_", " ")} · who needs a hand this week`, `${batch.name} · ${batch.exam.replace("_", " ")} · इस सप्ताह किसे मदद चाहिए`)}
        right={
          <Select
            label={L("Batch", "बैच")}
            value={batch.batch_id}
            onChange={(v) => {
              setBatchId(v);
              setSel(null);
            }}
            options={m.batches.map((b) => ({ value: b.batch_id, label: `${b.name} · ${b.exam.replace("_", " ")}` }))}
          />
        }
      />

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label={L("Students in this batch", "इस बैच में विद्यार्थी")} value={batch.student_ids.length} origin="synthetic" />
        <Stat label={L("On this week's list", "इस सप्ताह की सूची में")} value={rows.length} sub={r ? L(`cap ${r.capacity_per_week} (mentor time)`, `सीमा ${r.capacity_per_week} (मेंटर का समय)`) : undefined} origin="model" />
        <Stat label={L("Topics tracked", "ट्रैक किए गए विषय")} value={m.topics.length} sub={L(`${untaught.length} probably not taught yet`, `${untaught.length} शायद अभी पढ़ाए नहीं गए`)} origin="model" />
        <Stat label={L("Adults on list (own consent)", "सूची में वयस्क (स्वयं की सहमति)")} value={adults} sub={L("Others: academic support only", "बाकी: केवल शैक्षिक सहयोग")} origin="model" />
      </section>

      <Card>
        <CardTitle right={<Origin origin={m.origin} />}>{L("Topic mastery", "विषय-वार दक्षता")}</CardTitle>
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-soft" aria-label="Legend">
          {(["not_enough_data", "needs_support", "steady", "strong"] as Band[]).map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 rounded" style={{ background: BAND_COLOR[b], border: "1px solid #d5dbe7" }} />
              {bl(b)}
            </span>
          ))}
          <span className="text-ink-mute">· {L("Pale columns: topic probably not taught yet", "फीके कॉलम: विषय शायद अभी नहीं पढ़ाया गया")}</span>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            {option && (
              <EChart
                option={option}
                height={Math.max(360, grid.ids.length * 20 + 180)}
                label="Mastery heatmap"
                onClick={(p) => {
                  const v = (p.value as unknown[] | undefined) ?? [];
                  if (typeof v[1] === "number") setSel(grid.ids[v[1]]);
                }}
              />
            )}
          </div>
        </div>
        {untaught.length > 0 && (
          <div className="mt-3">
            <Note>
              <b>{untaught.map(tn).slice(0, 3).join(", ")}</b>
              {untaught.length > 3 ? ` +${untaught.length - 3}` : ""}:{" "}
              {L("whole batch looks low. Likely not taught yet, not student weakness. Check the teaching plan first.", "पूरा बैच कमज़ोर दिखता है। संभवतः अभी पढ़ाया नहीं गया, विद्यार्थी की कमज़ोरी नहीं। पहले शिक्षण योजना देखें।")}
            </Note>
          </div>
        )}
        <p className="mt-2 text-xs text-ink-mute">{L("Click a row to see that student's topics with how sure we are.", "किसी पंक्ति पर क्लिक करें: उस विद्यार्थी के विषय और हमारी निश्चितता देखें।")}</p>
      </Card>

      {sel && (
        <Card>
          <CardTitle
            right={
              <Button variant="ghost" onClick={() => setSel(null)}>
                {L("Close", "बंद करें")}
              </Button>
            }
          >
            {L("Topic mastery with uncertainty", "अनिश्चितता सहित विषय-वार दक्षता")} · {rollOf(sel)} {nameOf(sel)}
          </CardTitle>
          <p className="mb-3 text-xs text-ink-soft">{L("Bar = likely range, tick = best estimate. A wide bar means we are less sure.", "पट्टी = संभावित सीमा, निशान = सर्वोत्तम अनुमान। चौड़ी पट्टी = कम निश्चितता।")}</p>
          <ul className="grid gap-x-8 gap-y-2 md:grid-cols-2">
            {selCells.map(({ t, c }) => {
              const b: Band = t.probably_untaught ? "not_enough_data" : ((c?.band as Band) ?? "not_enough_data");
              const showBar = c && b !== "not_enough_data";
              const lo = c ? Math.max(-SCALE, c.theta - 1.28 * c.se) : 0;
              const hi = c ? Math.min(SCALE, c.theta + 1.28 * c.se) : 0;
              const at = (x: number) => ((x + SCALE) / (2 * SCALE)) * 100;
              return (
                <li key={t.topic_id} className="grid grid-cols-[1fr_120px_96px] items-center gap-2 text-xs">
                  <span className="truncate text-ink" title={tn(t)}>{tn(t)}</span>
                  <span className="relative h-2 rounded-full bg-[#e9edf4]">
                    {showBar && c && (
                      <>
                        <span className="absolute h-2 rounded-full bg-brand/35" style={{ left: `${at(lo)}%`, width: `${Math.max(2, at(hi) - at(lo))}%` }} />
                        <span className="absolute -top-0.5 h-3 w-1 rounded bg-brand" style={{ left: `${at(c.theta)}%` }} />
                      </>
                    )}
                  </span>
                  <Badge tone={BAND_TONE[b]} className="justify-center">{bl(b)}</Badge>
                </li>
              );
            })}
          </ul>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardTitle right={<Badge tone="calm">{L("Visible to mentor and owner only", "केवल मेंटर और मालिक को दिखता है")}</Badge>}>{L("Support list", "सहयोग सूची")}</CardTitle>
          {!r ? (
            <Unavailable what="risk" detail={risk.error} />
          ) : (
            <>
              <p className="mb-3 text-sm text-ink-soft">
                {L(`Sized to mentor capacity (${r.capacity_per_week}/week). Listed by name, not priority. Each row: why, and what could help.`, `मेंटर क्षमता के अनुसार (${r.capacity_per_week}/सप्ताह)। नाम के क्रम में। हर पंक्ति: कारण और सहायक कदम।`)}
              </p>
              <ul className="divide-y divide-line">
                {shown.map((row) => {
                  const isDone = done.has(row.student_id);
                  return (
                    <li key={row.student_id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-brand-dark">{rollOf(row.student_id)}</span>
                          <span className="font-medium text-ink">{nameOf(row.student_id)}</span>
                          {row.track === "full" ? <Badge tone="teal">{L("Adult, own consent", "वयस्क, स्वयं की सहमति")}</Badge> : <Badge tone="calm">{L("Academic support", "शैक्षिक सहयोग")}</Badge>}
                        </div>
                        <ul className="mt-1 list-disc pl-5 text-[13px] text-ink-soft">
                          {row.reasons.map((x) => (
                            <li key={x.code}>{lang === "hi" ? x.text_hi : x.text_en}</li>
                          ))}
                        </ul>
                        <p className="mt-1 text-[13px] font-medium text-brand-dark">→ {lang === "hi" ? row.supportive_action.text_hi : row.supportive_action.text_en}</p>
                      </div>
                      <Button
                        variant={isDone ? "soft" : "ghost"}
                        className="shrink-0 self-start border border-line"
                        aria-pressed={isDone}
                        onClick={() =>
                          setDone((d) => {
                            const n = new Set(d);
                            if (n.has(row.student_id)) n.delete(row.student_id);
                            else n.add(row.student_id);
                            return n;
                          })
                        }
                      >
                        <Check size={14} /> {isDone ? L("Done", "हो गया") : L("Log outcome", "नतीजा दर्ज करें")}
                      </Button>
                    </li>
                  );
                })}
              </ul>
              {pages > 1 && (
                <div className="mt-3 flex items-center justify-between text-sm">
                  <Button variant="ghost" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>{L("Previous", "पिछला")}</Button>
                  <span className="text-ink-mute">{page + 1} / {pages} · {done.size} {L("done", "पूरे")}</span>
                  <Button variant="ghost" disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)}>{L("Next", "अगला")}</Button>
                </div>
              )}
            </>
          )}
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardTitle right={<Origin origin="synthetic" />}>{L("Model vs your current rule", "मॉडल बनाम आपका मौजूदा नियम")}</CardTitle>
            {cmp && <EChart option={cmp} height={240} label="Model vs attendance rule" />}
            <p className="mt-2 text-xs text-ink-soft">{r?.note} {L("Synthetic data: a real pilot settles the true uplift.", "कृत्रिम डेटा: असली लाभ पायलट से तय होगा।")}</p>
          </Card>
          <Card>
            <CardTitle>{L("Answer-key alerts", "उत्तर-कुंजी चेतावनियाँ")}</CardTitle>
            {m.wrong_key_flags.length === 0 ? (
              <p className="text-sm text-ink-soft">{L("No suspicious answer keys in recent tests.", "हाल के टेस्ट में कोई संदिग्ध उत्तर-कुंजी नहीं मिली।")}</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {m.wrong_key_flags.map((f, i) => (
                  <li key={i} className="rounded-xl bg-amber-soft p-2 text-[#7a4e05]">{Object.entries(f).map(([k, v]) => `${k}: ${String(v)}`).join(" · ")}</li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
