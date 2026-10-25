"use client";

import { ArrowRight, Check, GraduationCap, HeartHandshake, LayoutGrid, Sparkles, Smartphone, Upload, Users, Building2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CountUp, IconTile, Ring } from "@/components/flair";
import { Card, PageSkeleton, Unavailable } from "@/components/ui";
import { useApp, useData } from "@/lib/app-context";
import { useBatches, useWeeklyActions } from "@/lib/views";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "data", href: "/add-data", icon: Upload, tone: "bg-tint-add", en: "Add data", hi: "डेटा जोड़ें", den: "Upload this week's test results or attendance.", dhi: "इस सप्ताह के टेस्ट परिणाम या उपस्थिति अपलोड करें।" },
  { id: "topics", href: "/weak-topics", icon: LayoutGrid, tone: "bg-tint-weak", en: "See weak topics", hi: "कमज़ोर विषय देखें", den: "Which topics need another class?", dhi: "किन विषयों को दोबारा पढ़ाना है?" },
  { id: "help", href: "/support", icon: HeartHandshake, tone: "bg-tint-support", en: "Help students", hi: "विद्यार्थियों की मदद करें", den: "This week's list, with a kind next step for each.", dhi: "इस सप्ताह की सूची, हर किसी के लिए एक सहयोगी कदम।" },
  { id: "parents", href: "/parents", icon: Smartphone, tone: "bg-tint-parent", en: "Update parents", hi: "अभिभावकों को बताएँ", den: "Send a clear, checked progress message.", dhi: "प्रगति का स्पष्ट, जाँचा हुआ संदेश भेजें।" },
  { id: "results", href: "/results", icon: Building2, tone: "bg-tint-results", en: "Check results", hi: "नतीजे देखें", den: "Are students staying? Is it worth it?", dhi: "क्या विद्यार्थी टिक रहे हैं? क्या यह फ़ायदेमंद है?" },
];

export default function HomePage() {
  const { L, institute } = useApp();
  const owner = useData("owner");
  const batches = useBatches();
  const weekly = useWeeklyActions();
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    try {
      setDone(JSON.parse(localStorage.getItem(`pragati.flow.${institute}`) ?? "[]"));
    } catch {}
  }, [institute]);
  const toggle = (id: string) =>
    setDone((d) => {
      const n = d.includes(id) ? d.filter((x) => x !== id) : [...d, id];
      try {
        localStorage.setItem(`pragati.flow.${institute}`, JSON.stringify(n));
      } catch {}
      return n;
    });

  if (owner.loading && batches.loading) return <PageSkeleton />;
  const next = STEPS.find((s) => !done.includes(s.id)) ?? STEPS[STEPS.length - 1];
  const months = owner.data?.retention.monthly ?? [];
  const first = months[0];
  const dropped = months.reduce((a, m) => a + m.dropped, 0);
  const retained = first ? 1 - dropped / first.enrolled : null;
  const students = (batches.data ?? []).reduce((a, b) => a + (b.students ?? 0), 0);
  const roi = owner.data?.roi;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-[#5c7cfa] p-6 text-white shadow-lift sm:p-8">
        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" aria-hidden />
        <div className="absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-white/10" aria-hidden />
        <p className="flex items-center gap-2 text-sm font-medium text-white/85"><Sparkles size={16} /> {L("Your week at a glance", "आपका सप्ताह एक नज़र में")}</p>
        <h2 className="mt-1 max-w-xl text-2xl font-semibold leading-snug sm:text-3xl">
          {weekly.data !== null ? L(`${weekly.data} students could use a hand this week.`, `इस सप्ताह ${weekly.data} विद्यार्थियों को मदद चाहिए।`) : L("Let's plan this week.", "चलिए इस सप्ताह की योजना बनाएँ।")}
        </h2>
        <Link
          href={next.href}
          data-testid="primary-cta"
          className="mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-white px-5 py-3 text-base font-semibold text-brand-dark shadow-soft transition-transform hover:-translate-y-0.5"
        >
          {L(`Next: ${next.en}`, `अगला: ${next.hi}`)} <ArrowRight size={18} />
        </Link>
      </section>

      <section aria-label={L("Headline numbers", "मुख्य संख्याएँ")} className="grid grid-cols-2 gap-3 lg:grid-cols-4" data-testid="headline-numbers">
        <Card className="card-lift flex items-center gap-3 p-4">
          <IconTile icon={Users} tone="sky" size={44} />
          <div>
            <p className="text-sm text-ink-soft">{L("Students", "विद्यार्थी")}</p>
            <p className="text-2xl font-semibold text-ink"><CountUp value={students} /></p>
          </div>
        </Card>
        <Card className="card-lift flex items-center gap-3 p-4">
          {retained !== null ? (
            <Ring value={retained} size={52} stroke={7} color="#0ca678"><span className="text-xs font-semibold text-teal-ink">{Math.round(retained * 100)}%</span></Ring>
          ) : (
            <IconTile icon={TrendingUp} tone="teal" size={44} />
          )}
          <div>
            <p className="text-sm text-ink-soft">{L("Still with us", "अब भी साथ")}</p>
            <p className="text-sm font-medium text-ink">{retained !== null ? L(`${dropped} left in ${months.length} months`, `${months.length} माह में ${dropped} गए`) : L("Not enough data yet", "अभी पर्याप्त डेटा नहीं")}</p>
          </div>
        </Card>
        <Card className="card-lift flex items-center gap-3 p-4">
          <IconTile icon={HeartHandshake} tone="amber" size={44} />
          <div>
            <p className="text-sm text-ink-soft">{L("To help this week", "इस सप्ताह मदद")}</p>
            <p className="text-2xl font-semibold text-ink">{weekly.data !== null ? <CountUp value={weekly.data} /> : "—"}</p>
          </div>
        </Card>
        <Card className="card-lift flex items-center gap-3 p-4">
          <IconTile icon={TrendingUp} tone="calm" size={44} />
          <div>
            <p className="text-sm text-ink-soft">{L("Estimated return", "अनुमानित रिटर्न")}</p>
            <p className="text-lg font-semibold text-ink">{roi ? `${roi.ratio_low}–${roi.ratio_high}×` : "—"}</p>
            <p className="text-xs text-ink-mute">{L("a range, not a promise", "एक सीमा, वादा नहीं")}</p>
          </div>
        </Card>
      </section>
      {owner.error && !owner.data && <Unavailable what="results" detail={owner.error} status={owner.status} onRetry={owner.reload} />}

      <section aria-label={L("Weekly steps", "साप्ताहिक कदम")}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">{L("Your week in 5 steps", "5 कदमों में आपका सप्ताह")}</h2>
          <span className="text-sm text-ink-soft">{done.length}/5 {L("done", "पूरे")}</span>
        </div>
        <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-3" data-testid="flow">
          {STEPS.map((s, i) => {
            const isDone = done.includes(s.id);
            const isNext = next.id === s.id && !isDone;
            return (
              <li key={s.id} className={cn("relative rounded-2xl border p-4 shadow-soft transition-shadow", s.tone, isNext ? "border-brand ring-2 ring-brand/30" : "border-line")} data-step={s.id} data-next={isNext}>
                {isNext && <span className="absolute -top-2.5 left-4 rounded-full bg-brand px-2.5 py-0.5 text-xs font-semibold text-white">{L("Start here", "यहाँ से शुरू करें")}</span>}
                <div className="flex items-start gap-3">
                  <IconTile icon={s.icon} tone="brand" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink">{i + 1}. {L(s.en, s.hi)}</p>
                    <p className="text-sm text-ink-soft">{L(s.den, s.dhi)}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <Link href={s.href} className="inline-flex min-h-[44px] items-center gap-1 rounded-xl bg-white px-4 text-[15px] font-medium text-brand-dark shadow-soft hover:bg-brand-soft">
                    {L("Open", "खोलें")} <ArrowRight size={16} />
                  </Link>
                  <button
                    onClick={() => toggle(s.id)}
                    aria-pressed={isDone}
                    className={cn("inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-sm font-medium", isDone ? "bg-teal text-white" : "bg-white/70 text-ink-soft hover:bg-white")}
                  >
                    <Check size={16} /> {isDone ? L("Done", "हो गया") : L("Mark done", "पूरा करें")}
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <Link href="/students" className="card-lift flex items-center gap-3 rounded-2xl border border-line bg-tint-student p-4 shadow-soft">
          <IconTile icon={GraduationCap} tone="sky" />
          <span><span className="block font-semibold text-ink">{L("A student's view", "विद्यार्थी का दृश्य")}</span><span className="text-sm text-ink-soft">{L("What each student sees: progress and a small plan.", "हर विद्यार्थी क्या देखता है: प्रगति और छोटी योजना।")}</span></span>
        </Link>
        <Link href="/parents" className="card-lift flex items-center gap-3 rounded-2xl border border-line bg-tint-parent p-4 shadow-soft">
          <IconTile icon={Smartphone} tone="amber" />
          <span><span className="block font-semibold text-ink">{L("A parent's view", "अभिभावक का दृश्य")}</span><span className="text-sm text-ink-soft">{L("The WhatsApp message and what to do at home.", "WhatsApp संदेश और घर पर क्या करें।")}</span></span>
        </Link>
      </section>
    </div>
  );
}
