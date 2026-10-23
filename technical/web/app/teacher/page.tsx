"use client";

import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { EChartsOption } from "echarts";
import { EChart } from "@/components/echart";
import { Badge, Button, Card, CardTitle, Note, Origin, PageHead, PageSkeleton, Select, Unavailable } from "@/components/ui";
import { useApp, useData } from "@/lib/app-context";
import { useStudents } from "@/lib/names";
import { pct } from "@/lib/utils";

const PAGE = 10;

export default function TeacherPage() {
  const { L, lang } = useApp();
  const mastery = useData("mastery");
  const risk = useData("risk");
  const { nameOf, rollOf, loading: sl } = useStudents();
  const [batchId, setBatchId] = useState<string>("");
  const [topicId, setTopicId] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(0);

  const m = mastery.data;
  const batch = m?.batches.find((b) => b.batch_id === batchId) ?? m?.batches[0];

  const grid = useMemo(() => {
    if (!m || !batch) return null;
    const ids = [...batch.student_ids].sort((a, b) => nameOf(a).localeCompare(nameOf(b)) || a.localeCompare(b));
    const topics = m.topics;
    const cell = new Map(m.cells.map((c) => [`${c.student_id}|${c.topic_id}`, c]));
    return { ids, topics, cell };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [m, batch, sl]);

  const option = useMemo<EChartsOption | null>(() => {
    if (!grid) return null;
    const data: unknown[] = [];
    grid.ids.forEach((sid, yi) =>
      grid.topics.forEach((t, xi) => {
        const c = grid.cell.get(`${sid}|${t.topic_id}`);
        if (t.probably_untaught) {
          data.push({ value: [xi, yi, null], itemStyle: { color: "#e6e9ef" } });
        } else if (!c || c.band === "not_enough_data") {
          data.push({ value: [xi, yi, null], itemStyle: { color: "#f3f5f9", borderColor: "#d5dbe7", borderType: "dashed" } });
        } else {
          // Higher uncertainty -> lower opacity.
          const op = Math.max(0.3, Math.min(1, 1.05 - c.se / 1.2));
          data.push({ value: [xi, yi, c.theta], itemStyle: { opacity: op } });
        }
      })
    );
    return {
      grid: { left: 8, right: 8, top: 8, bottom: 120, containLabel: true },
      tooltip: {
        formatter: (p: unknown) => {
          const v = (p as { value: [number, number, number | null] }).value;
          const t = grid.topics[v[0]];
          const sid = grid.ids[v[1]];
          const c = grid.cell.get(`${sid}|${t.topic_id}`);
          const nm = lang === "hi" ? t.name_hi : t.name_en;
          if (t.probably_untaught) return `${nameOf(sid)}<br/>${nm}<br/>${L("Probably not taught yet", "शायद अभी पढ़ाया नहीं गया")}`;
          if (!c || c.band === "not_enough_data") return `${nameOf(sid)}<br/>${nm}<br/>${L("Not enough data yet", "अभी पर्याप्त डेटा नहीं")}`;
          return `${nameOf(sid)}<br/>${nm}<br/>θ ${c.theta.toFixed(2)} ± ${c.se.toFixed(2)} · ${c.band.replace("_", " ")}`;
        },
      },
      xAxis: {
        type: "category",
        data: grid.topics.map((t) => (lang === "hi" ? t.name_hi : t.name_en)),
        axisLabel: { rotate: 55, interval: 0, fontSize: 10, formatter: (s: string) => (s.length > 24 ? s.slice(0, 23) + "…" : s) },
        splitArea: { show: false },
      },
      yAxis: { type: "category", inverse: true, data: grid.ids.map((s) => `${nameOf(s)} ${rollOf(s).replace(/^.*-/, "")}`), axisLabel: { fontSize: 11 } },
      visualMap: {
        min: -1.5,
        max: 1.5,
        calculable: false,
        orient: "horizontal",
        left: "center",
        bottom: 0,
        itemWidth: 12,
        itemHeight: 140,
        text: [L("Stronger", "मज़बूत"), L("Needs support", "सहारा चाहिए")],
        inRange: { color: ["#f3d9a4", "#e8eef9", "#7fb0f2", "#1f6feb"] },
        seriesIndex: 0,
      },
      series: [{ type: "heatmap", data, itemStyle: { borderColor: "#fff", borderWidth: 1 }, emphasis: { itemStyle: { borderColor: "#17233b", borderWidth: 1 } } }],
    } as EChartsOption;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, lang, sl]);

  const topicDetail = useMemo(() => {
    if (!m || !grid || !topicId) return null;
    const t = m.topics.find((x) => x.topic_id === topicId)!;
    const cells = grid.ids.map((s) => grid.cell.get(`${s}|${topicId}`)).filter(Boolean) as typeof m.cells;
    const usable = cells.filter((c) => c.band !== "not_enough_data");
    const counts: Record<string, number> = {};
    cells.forEach((c) => (counts[c.band] = (counts[c.band] ?? 0) + 1));
    const mean = usable.length ? usable.reduce((a, c) => a + c.theta, 0) / usable.length : null;
    return { t, counts, mean, n: cells.length, usable: usable.length };
  }, [m, grid, topicId]);

  if (mastery.loading || risk.loading) return <PageSkeleton />;
  if (!m) return <Unavailable what="mastery" detail={mastery.error} />;

  const r = risk.data;
  const supportRows = r
    ? [...r.list].sort((a, b) => nameOf(a.student_id).localeCompare(nameOf(b.student_id)))
    : [];
  const pages = Math.ceil(supportRows.length / PAGE);
  const shown = supportRows.slice(page * PAGE, page * PAGE + PAGE);
  const baseRows = r
    ? [
        { key: "b1_attendance_rule", en: "Attendance < 75% rule", hi: "उपस्थिति < 75% नियम" },
        { key: "b2_ranked_rule", en: "Ranked attendance rule", hi: "क्रमबद्ध उपस्थिति नियम" },
        { key: "model", en: "Pragati model", hi: "प्रगति मॉडल" },
      ].filter((x) => r.baselines[x.key])
    : [];
  const cmpOption: EChartsOption | null = r
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

  return (
    <div className="space-y-6">
      <PageHead
        title={L("Teacher view", "शिक्षक दृश्य")}
        sub={L("Where each batch stands, and who could use a hand this week.", "हर बैच की स्थिति, और इस सप्ताह किसे मदद चाहिए।")}
        right={
          <Select
            label={L("Batch", "बैच")}
            value={batch?.batch_id ?? ""}
            onChange={(v) => {
              setBatchId(v);
              setTopicId(null);
            }}
            options={m.batches.map((b) => ({ value: b.batch_id, label: `${b.name} · ${b.exam.replace("_", " ")}` }))}
          />
        }
      />

      <Card>
        <CardTitle right={<Origin origin={m.origin} />}>{L("Topic mastery heatmap", "विषय-वार दक्षता हीटमैप")}</CardTitle>
        <p className="mb-2 text-sm text-ink-soft">
          {L(
            "Darker blue is stronger. Faded cells carry more uncertainty. Grey: topic probably not taught yet. Dashed: not enough data yet. Students are listed by name.",
            "गहरा नीला मतलब मज़बूत। फीके खाने में अनिश्चितता ज़्यादा है। स्लेटी: विषय शायद पढ़ाया नहीं गया। बिंदीदार: अभी पर्याप्त डेटा नहीं। विद्यार्थी नाम के क्रम में हैं।"
          )}
        </p>
        {option && (
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              <EChart
                option={option}
                height={Math.max(360, (grid?.ids.length ?? 10) * 18 + 190)}
                label="Mastery heatmap"
                onClick={(p) => {
                  const v = (p.value as number[] | undefined) ?? [];
                  if (grid && v.length) setTopicId(grid.topics[v[0]].topic_id);
                }}
              />
            </div>
          </div>
        )}
        <p className="mt-1 text-xs text-ink-mute">{L("Click a cell to open that topic.", "किसी खाने पर क्लिक करके विषय खोलें।")}</p>
      </Card>

      {topicDetail && (
        <aside
          role="dialog"
          aria-label="Topic detail"
          className="fixed inset-x-0 bottom-0 z-40 max-h-[70vh] overflow-y-auto rounded-t-2xl border border-line bg-white p-5 shadow-2xl sm:inset-x-auto sm:right-4 sm:top-24 sm:bottom-4 sm:w-96 sm:rounded-2xl"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <Badge tone="brand">{topicDetail.t.subject}</Badge>
              <h3 className="mt-2 font-semibold text-ink">{lang === "hi" ? topicDetail.t.name_hi : topicDetail.t.name_en}</h3>
            </div>
            <Button variant="ghost" aria-label={L("Close", "बंद करें")} onClick={() => setTopicId(null)}>
              <X size={16} />
            </Button>
          </div>
          {topicDetail.t.probably_untaught && (
            <Note tone="calm">{L("This topic is probably not taught yet in this batch.", "यह विषय इस बैच में शायद अभी नहीं पढ़ाया गया।")}</Note>
          )}
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-ink-mute">{L("Students with enough data", "पर्याप्त डेटा वाले विद्यार्थी")}</dt>
              <dd className="text-lg font-semibold tabular-nums">
                {topicDetail.usable} / {topicDetail.n}
              </dd>
            </div>
            <div>
              <dt className="text-ink-mute">{L("Batch mean ability (θ)", "बैच औसत क्षमता (θ)")}</dt>
              <dd className="text-lg font-semibold tabular-nums">{topicDetail.mean === null ? L("Not enough data yet", "अभी पर्याप्त डेटा नहीं") : topicDetail.mean.toFixed(2)}</dd>
            </div>
          </dl>
          <ul className="mt-3 space-y-1 text-sm text-ink-soft">
            {Object.entries(topicDetail.counts).map(([b, c]) => (
              <li key={b} className="flex justify-between">
                <span>{b.replace(/_/g, " ")}</span>
                <span className="tabular-nums">{c}</span>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardTitle right={<Origin origin={r?.origin} />}>{L("Support this week", "इस सप्ताह सहयोग सूची")}</CardTitle>
          {!r ? (
            <Unavailable what="risk" detail={risk.error} />
          ) : (
            <>
              <p className="mb-3 text-sm text-ink-soft">
                {L(
                  `Sized to mentor capacity (${r.capacity_per_week} students per week). Listed by name, not by priority. Each row shows why and what could help.`,
                  `मेंटर क्षमता के अनुसार (${r.capacity_per_week} विद्यार्थी प्रति सप्ताह)। नाम के क्रम में, प्राथमिकता के क्रम में नहीं। हर पंक्ति में कारण और सहायक कदम हैं।`
                )}
              </p>
              <ul className="divide-y divide-line">
                {shown.map((row) => {
                  const isDone = done.has(row.student_id);
                  return (
                    <li key={row.student_id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-ink">{nameOf(row.student_id)}</span>
                          <span className="text-xs text-ink-mute">{rollOf(row.student_id)}</span>
                          {row.track === "full" ? (
                            <Badge tone="teal">{L("Adult, own consent", "वयस्क, स्वयं की सहमति")}</Badge>
                          ) : (
                            <Badge tone="calm">{L("Academic support", "शैक्षिक सहयोग")}</Badge>
                          )}
                        </div>
                        <ul className="mt-1 list-disc pl-5 text-[13px] text-ink-soft">
                          {row.reasons.map((x) => (
                            <li key={x.code}>{lang === "hi" ? x.text_hi : x.text_en}</li>
                          ))}
                        </ul>
                        <p className="mt-1 text-[13px] text-brand-dark">
                          → {lang === "hi" ? row.supportive_action.text_hi : row.supportive_action.text_en}
                        </p>
                      </div>
                      <Button
                        variant={isDone ? "soft" : "ghost"}
                        className="shrink-0 self-start border border-line"
                        aria-pressed={isDone}
                        onClick={() =>
                          setDone((d) => {
                            const n = new Set(d);
                            n.has(row.student_id) ? n.delete(row.student_id) : n.add(row.student_id);
                            return n;
                          })
                        }
                      >
                        <Check size={14} /> {isDone ? L("Done", "हो गया") : L("Mark done", "पूरा करें")}
                      </Button>
                    </li>
                  );
                })}
              </ul>
              {pages > 1 && (
                <div className="mt-3 flex items-center justify-between text-sm">
                  <Button variant="ghost" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                    {L("Previous", "पिछला")}
                  </Button>
                  <span className="text-ink-mute">
                    {page + 1} / {pages} · {done.size} {L("done", "पूरे")}
                  </span>
                  <Button variant="ghost" disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)}>
                    {L("Next", "अगला")}
                  </Button>
                </div>
              )}
            </>
          )}
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardTitle right={<Origin origin="synthetic" />}>{L("Model vs your current rule", "मॉडल बनाम आपका मौजूदा नियम")}</CardTitle>
            {cmpOption && <EChart option={cmpOption} height={240} label="Model vs attendance rule" />}
            <p className="mt-2 text-xs text-ink-soft">
              {r?.note} {L("Synthetic data: a real pilot settles the true uplift.", "कृत्रिम डेटा: असली लाभ पायलट से तय होगा।")}
            </p>
          </Card>

          <Card>
            <CardTitle>{L("Answer-key alerts", "उत्तर-कुंजी चेतावनियाँ")}</CardTitle>
            {m.wrong_key_flags.length === 0 ? (
              <p className="text-sm text-ink-soft">{L("No suspicious answer keys in recent tests.", "हाल के टेस्ट में कोई संदिग्ध उत्तर-कुंजी नहीं मिली।")}</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {m.wrong_key_flags.map((f, i) => (
                  <li key={i} className="rounded-xl bg-amber-soft p-2 text-[#7a4e05]">
                    {Object.entries(f)
                      .map(([k, v]) => `${k}: ${String(v)}`)
                      .join(" · ")}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
