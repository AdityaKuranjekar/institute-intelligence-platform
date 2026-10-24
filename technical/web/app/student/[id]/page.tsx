"use client";

import { Flame, HeartHandshake, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import type { EChartsOption } from "echarts";
import { EChart } from "@/components/echart";
import { PersonPicker } from "@/components/person-picker";
import { ReportGenerator } from "@/components/report-generator";
import { Badge, Card, CardTitle, Note, Origin, PageHead, PageSkeleton, Unavailable } from "@/components/ui";
import { useApp, useData } from "@/lib/app-context";
import { BAND_LABEL, BAND_TONE, bandOf, trendWord } from "@/lib/bands";
import { subjectLabel, useStudents } from "@/lib/names";

function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) return null;
  const w = 120;
  const h = 36;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - 4 - v * (h - 8)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-full" aria-hidden>
      <polyline points={pts} fill="none" stroke="#1e4a8a" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function StudentPage({ params }: { params: { id: string } }) {
  const { L, lang, softLang, langTouched } = useApp();
  const st = useData("student");
  const pr = useData("percentile");
  const { list } = useStudents();
  const id = params.id === "_" ? list[0]?.student_id : params.id;
  const s = st.data?.students.find((x) => x.student_id === id);
  const [checked, setChecked] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (s && !langTouched && (s.language_pref === "hi" || s.language_pref === "en")) softLang(s.language_pref);
  }, [s, langTouched, softLang]);
  useEffect(() => setChecked(new Set()), [id]);

  if (st.loading) return <PageSkeleton />;
  if (!st.data) return <Unavailable what="student" detail={st.error} status={st.status} />;
  if (!s) return <Unavailable what="student" detail="Pick a student above." />;

  const pRange = s.percentile_range ?? pr.data?.students.find((x) => x.student_id === s.student_id) ?? null;
  const t = (en: string, hi?: string) => (lang === "hi" && hi ? hi : en);

  const trend: EChartsOption = {
    xAxis: { type: "category", data: s.score_trend.map((x, i) => `${L("Test", "टेस्ट")} ${i + 1}`) },
    yAxis: { type: "value", scale: true },
    tooltip: { trigger: "axis" },
    series: [{ type: "line", smooth: true, data: s.score_trend.map((x) => x.marks), areaStyle: { opacity: 0.08 }, symbolSize: 8 }],
  };

  const fan = (r: { low: number; mid: number; high: number }): EChartsOption => {
    const N = 5;
    const ks = Array.from({ length: N }, (_, i) => i + 1);
    const w = (k: number) => Math.sqrt(N / k); // widest at test 1, real range at test N
    const low = ks.map((k) => Math.max(0, r.mid - (r.mid - r.low) * w(k)));
    const high = ks.map((k) => Math.min(100, r.mid + (r.high - r.mid) * w(k)));
    return {
      grid: { left: 8, right: 16, top: 16, bottom: 28, containLabel: true },
      tooltip: { trigger: "axis", formatter: (p: unknown) => { const i = (p as { dataIndex: number }[])[0].dataIndex; return `${L("After test", "टेस्ट के बाद")} ${ks[i]}: ${low[i].toFixed(0)}–${high[i].toFixed(0)}`; } },
      xAxis: { type: "category", boundaryGap: false, data: ks.map((k) => `${L("Test", "टेस्ट")} ${k}`) },
      yAxis: { type: "value", min: 0, max: 100 },
      series: [
        { type: "line", data: low, stack: "fan", symbol: "none", lineStyle: { opacity: 0 } },
        { type: "line", data: high.map((h, i) => h - low[i]), stack: "fan", symbol: "none", lineStyle: { opacity: 0 }, areaStyle: { color: "#1e4a8a", opacity: 0.2 } },
        { type: "line", data: ks.map(() => r.mid), symbolSize: 9, lineStyle: { width: 3 }, itemStyle: { color: "#1e4a8a" } },
      ],
    };
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <PageHead title={L(`Hi ${s.display_name}`, `नमस्ते ${s.display_name}`)} right={<PersonPicker base="student" id={s.student_id} />} />

      <Card className="bg-gradient-to-br from-brand-soft to-white">
        <div className="flex items-center gap-2 text-brand-dark">
          <Sparkles size={18} />
          <p className="text-lg font-semibold">{t(s.headline.text_en, s.headline.text_hi)}</p>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone="amber">
            <Flame size={12} /> {s.streak_weeks} {L("week streak (effort)", "सप्ताह की निरंतरता (प्रयास)")}
          </Badge>
          {s.milestones.map((m) => (
            <Badge key={m.id} tone="teal">
              {t(m.text_en, m.text_hi)}
            </Badge>
          ))}
        </div>
      </Card>

      <section aria-label="Subjects" className="grid gap-3 sm:grid-cols-3">
        {s.mastery_by_subject.map((m) => (
          <Card key={m.subject} className="p-4">
            <p className="font-medium text-ink">{subjectLabel(m.subject, L)}</p>
            <Sparkline values={m.trend} />
            <div className="mt-1 flex items-center justify-between gap-2">
              <Badge tone={BAND_TONE[bandOf(m.theta)]}>{L(...BAND_LABEL[bandOf(m.theta)])}</Badge>
              <span className="text-xs text-ink-soft">
                {m.trend.length ? `${Math.round(m.trend[m.trend.length - 1] * 100)}% ${L("right lately", "हाल में सही")}` : ""}{" "}
                {{ up: "↗", flat: "→", down: "↘" }[trendWord(m.trend)]}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-ink-mute">{L("Answers you got right, over time", "समय के साथ आपके सही उत्तर")}</p>
          </Card>
        ))}
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardTitle>{L("Your strengths", "आपकी ताक़त")}</CardTitle>
          <ul className="space-y-2 text-sm">
            {s.strengths.map((x) => (
              <li key={x.topic_id} className="rounded-xl bg-teal-soft px-3 py-2 text-[#0a7467]">
                {t(x.name_en, x.name_hi)}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardTitle>{L("Good topics to focus on", "ध्यान देने योग्य विषय")}</CardTitle>
          <ul className="space-y-2 text-sm">
            {s.focus_topics.map((x) => (
              <li key={x.topic_id} className="rounded-xl bg-calm-soft px-3 py-2 text-[#3f4f8c]">
                <p className="font-medium">{t(x.name_en, x.name_hi)}</p>
                <p className="text-xs">~{x.est_minutes} {L("min", "मिनट")}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <CardTitle right={<Badge tone="neutral">{checked.size}/{s.study_plan.length}</Badge>}>{L("This week's plan", "इस सप्ताह की योजना")}</CardTitle>
        <ul className="space-y-1">
          {s.study_plan.map((p, i) => (
            <li key={i}>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl p-2 hover:bg-bg">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[#1e4a8a]"
                  checked={checked.has(i)}
                  onChange={() =>
                    setChecked((c) => {
                      const n = new Set(c);
                      n.has(i) ? n.delete(i) : n.add(i);
                      return n;
                    })
                  }
                />
                <span className={`text-sm ${checked.has(i) ? "text-ink-mute line-through" : "text-ink"}`}>
                  <b>{p.day}</b> · {t(p.task_en, p.task_hi)} <span className="text-ink-mute">({p.minutes} {L("min", "मिनट")})</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardTitle right={<Origin origin="model" />}>{L("Your recent scores", "आपके हाल के अंक")}</CardTitle>
        <EChart option={trend} height={200} label="Score trend" />
      </Card>

      <Card>
        <CardTitle right={<Origin origin="assumption" />}>{L("Predicted percentile range", "अनुमानित पर्सेंटाइल सीमा")}</CardTitle>
        {pRange ? (
          <>
            <EChart option={fan(pRange)} height={240} label="Predicted percentile range over time" />
            <p className="text-[11px] text-ink-mute">
              {L("Only the last point is today's real range; earlier points illustrate how the range narrows as tests add up.", "केवल आख़िरी बिंदु आज की असली सीमा है; पहले के बिंदु दिखाते हैं कि टेस्ट बढ़ने पर सीमा कैसे सँकरी होती है।")}
            </p>
            <p className="mt-2 text-sm text-ink">
              {L("Likely between", "संभावित सीमा")} <b className="tabular-nums">{pRange.low}</b> {L("and", "से")} <b className="tabular-nums">{pRange.high}</b>
              {lang === "hi" ? " के बीच" : ""}
            </p>
            <div className="mt-3">
              <Note tone="amber">
                <b>{L("How to read it:", "कैसे पढ़ें:")}</b>{" "}
                {L("a likely range from our practice tests, mapped to the exam scale with an editable assumption table. It is not a promise or a rank. It narrows as you take more tests.", "हमारे अभ्यास टेस्ट से संभावित सीमा, जिसे संपादन-योग्य अनुमान तालिका से परीक्षा पैमाने पर रखा गया है। यह वादा या रैंक नहीं है। अधिक टेस्ट देने पर यह सँकरी होती है।")}
              </Note>
            </div>
          </>
        ) : (
          <p className="text-sm text-ink-soft">{L("Not enough data yet", "अभी पर्याप्त डेटा नहीं")}</p>
        )}
      </Card>

      <ReportGenerator studentId={s.student_id} />

      <Card className="border-teal/30 bg-teal-soft">
        <div className="flex items-start gap-3">
          <HeartHandshake className="mt-0.5 text-teal" />
          <div>
            <p className="font-semibold text-ink">{L("Talk to your counsellor", "अपने काउंसलर से बात करें")}</p>
            <p className="text-sm text-ink-soft">{t(s.support_contact.text_en, s.support_contact.text_hi)}</p>
            {!s.support_contact.counsellor_available && (
              <p className="mt-1 text-xs text-ink-mute">{L("Counsellor is not available right now; ask your teacher.", "काउंसलर अभी उपलब्ध नहीं; शिक्षक से कहें।")}</p>
            )}
          </div>
        </div>
      </Card>
      <Note tone="calm">{L("No ranking and no comparison with other students here. Your progress is measured against your own earlier work.", "यहाँ कोई रैंक या दूसरों से तुलना नहीं है। आपकी प्रगति आपके अपने पिछले काम से मापी जाती है।")}</Note>
    </div>
  );
}
