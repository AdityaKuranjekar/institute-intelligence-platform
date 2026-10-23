"use client";

import { Check, CheckCheck, FileText, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { PersonPicker } from "@/components/person-picker";
import { Badge, Card, CardTitle, Note, Origin, PageHead, PageSkeleton, Unavailable } from "@/components/ui";
import { useApp, useData } from "@/lib/app-context";
import { useStudents } from "@/lib/names";
import { cn } from "@/lib/utils";

const TYPE_LABEL: Record<string, [string, string]> = {
  monthly_report: ["Monthly report", "मासिक रिपोर्ट"],
  fee_reminder: ["Fee reminder", "फ़ीस सूचना"],
  meeting_invite: ["Meeting invite", "बैठक निमंत्रण"],
};

function Ticks({ status }: { status: string }) {
  if (status === "sent") return <Check size={14} className="text-ink-mute" aria-label="sent" />;
  return <CheckCheck size={14} className={status === "read" ? "text-brand" : "text-ink-mute"} aria-label={status} />;
}

const timeOf = (iso: string) => {
  const d = new Date(iso);
  return isNaN(+d) ? iso : d.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
};

export default function ParentPage({ params }: { params: { id: string } }) {
  const { L, lang, softLang, langTouched } = useApp();
  const pa = useData("parent");
  const rep = useData("reports");
  const { list, nameOf } = useStudents();
  const id = params.id === "_" ? list[0]?.student_id : params.id;
  const p = pa.data?.parents.find((x) => x.student_id === id);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (p && !langTouched && (p.language === "hi" || p.language === "en")) softLang(p.language);
    if (p) setPrefs({ ...p.notification_prefs } as unknown as Record<string, boolean>);
  }, [p, langTouched, softLang]);

  if (pa.loading) return <PageSkeleton />;
  if (!pa.data) return <Unavailable what="parent" detail={pa.error} />;
  if (!p || !id) return <Unavailable what="parent" detail="Pick a child above." />;

  const child = nameOf(p.student_id);
  const ms = p.monthly_summary;
  const report = rep.data?.reports.find((r) => r.student_id === p.student_id && r.language === lang) ?? rep.data?.reports.find((r) => r.student_id === p.student_id);
  const checksPassed = report ? report.checks.filter((c) => c.passed).length : 0;
  const pick = (m: { body_en?: string; body_hi?: string }) => (lang === "hi" ? m.body_hi ?? m.body_en : m.body_en ?? m.body_hi) ?? "";
  const tl = (k: string) => TYPE_LABEL[k]?.[lang === "hi" ? 1 : 0] ?? k;
  const faqText = (f: Record<string, unknown>, k: "q" | "a") => String(f[`${k}_${lang}`] ?? f[`${k}_en`] ?? "");

  return (
    <div className="space-y-5">
      <PageHead
        title={L(`${child}'s progress`, `${child} की प्रगति`)}
        sub={L(`For ${p.guardian_display} · month ${ms.month}`, `${p.guardian_display} के लिए · माह ${ms.month}`)}
        right={<PersonPicker base="parent" id={p.student_id} />}
      />
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* WhatsApp phone frame */}
        <div className="mx-auto w-full max-w-[360px]">
          <div className="rounded-[34px] border-[10px] border-[#17233b] bg-[#e7ded3] shadow-soft">
            <div className="flex items-center gap-2 rounded-t-[22px] bg-[#0b6e5f] px-4 py-3 text-white">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-sm font-semibold">P</span>
              <div className="leading-tight">
                <p className="text-sm font-medium">Pragati · {L("Institute", "संस्थान")}</p>
                <p className="text-[11px] opacity-80">{L("Business account", "बिज़नेस खाता")}</p>
              </div>
            </div>
            <div className="max-h-[560px] min-h-[420px] space-y-3 overflow-y-auto p-3" aria-label="WhatsApp messages">
              {p.whatsapp_messages.map((m) => (
                <div key={m.id} className="ml-0 mr-6 rounded-2xl rounded-tl-sm bg-white p-3 text-[13px] leading-relaxed text-ink shadow-sm">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#0b6e5f]">{tl(m.type)}</p>
                  <p className="whitespace-pre-line">{pick(m)}</p>
                  {Boolean((m as Record<string, unknown>).has_pdf) && (
                    <div className="mt-2 flex items-center gap-2 rounded-xl bg-bg px-3 py-2 text-xs">
                      <FileText size={16} className="text-brand" />
                      <span className="font-medium">Report_{ms.month}_{child}.pdf</span>
                    </div>
                  )}
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-ink-mute">
                    {timeOf(m.sent_at)} <Ticks status={m.status} />
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-b-[22px] bg-[#f0f0f0] px-4 py-2 text-[11px] text-ink-mute">{L("Messages are sent by the institute. Replies reach the front desk.", "संदेश संस्थान भेजता है। जवाब फ्रंट डेस्क तक पहुँचते हैं।")}</div>
          </div>
        </div>

        <div className="space-y-5">
          {lang === "hi" && rep.data && !rep.data.hi_reviewed && <Note>Hindi text pending native review · हिंदी पाठ की मूल-भाषी समीक्षा बाकी है</Note>}
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Card className="p-4">
              <p className="text-xs text-ink-mute">{L("Attendance", "उपस्थिति")}</p>
              <p className="text-2xl font-semibold tabular-nums">{ms.attendance_pct}%</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-ink-mute">{L("Tests taken", "दिए गए टेस्ट")}</p>
              <p className="text-2xl font-semibold tabular-nums">{ms.tests_taken}</p>
            </Card>
            <Card className="col-span-2 p-4 sm:col-span-1">
              <p className="text-xs text-ink-mute">{L("Recent marks", "हाल के अंक")}</p>
              <p className="text-lg font-semibold tabular-nums">{ms.marks_trend.join(" → ")}</p>
            </Card>
            <Card className="col-span-2 p-4 sm:col-span-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-ink-mute">{L("Strongest topic", "सबसे मज़बूत विषय")}</p>
                  <p className="text-sm font-medium text-[#0a7467]">{ms.strongest_topic ?? L("Not enough data yet", "अभी पर्याप्त डेटा नहीं")}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-mute">{L("Topic to practise", "अभ्यास का विषय")}</p>
                  <p className="text-sm font-medium text-[#3f4f8c]">{ms.focus_topic ?? L("Not enough data yet", "अभी पर्याप्त डेटा नहीं")}</p>
                </div>
              </div>
            </Card>
          </section>

          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <CardTitle>{L("Next fee due", "अगली फ़ीस")}</CardTitle>
              {ms.fee.amount_inr ? (
                <p className="text-sm">
                  ₹{ms.fee.amount_inr.toLocaleString("en-IN")} · {ms.fee.next_due_date} <Badge tone="teal">{ms.fee.status.replace(/_/g, " ")}</Badge>
                </p>
              ) : (
                <p className="text-sm text-ink-soft">{L("Nothing due", "कोई बकाया नहीं")}</p>
              )}
              <p className="mt-3 text-xs text-ink-mute">{L("Next meeting", "अगली बैठक")}</p>
              <p className="text-sm text-ink-soft">{ms.next_meeting ? String(ms.next_meeting) : L("None scheduled", "कोई तय नहीं")}</p>
            </Card>
            <Card>
              <CardTitle>{L("What you can do at home", "घर पर आप क्या कर सकते हैं")}</CardTitle>
              <ul className="list-disc space-y-1 pl-5 text-sm text-ink-soft">
                {ms.what_you_can_do.map((w, i) => (
                  <li key={i}>{lang === "hi" ? w.text_hi : w.text_en}</li>
                ))}
              </ul>
            </Card>
          </div>

          <Card>
            <CardTitle right={<Origin origin={rep.data?.origin ?? "model"} />}>{L("Report verification", "रिपोर्ट सत्यापन")}</CardTitle>
            {report ? (
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={report.verified ? "teal" : "amber"}>
                  <ShieldCheck size={12} /> {report.verified ? L(`${checksPassed} checks passed`, `${checksPassed} जाँच सफल`) : L("Not verified", "सत्यापित नहीं")}
                </Badge>
                <span className="text-xs text-ink-soft">{L("Every number in the message is checked against the school record.", "संदेश की हर संख्या स्कूल रिकॉर्ड से मिलाई जाती है।")}</span>
              </div>
            ) : (
              <p className="text-sm text-ink-soft">{L("Not enough data yet", "अभी पर्याप्त डेटा नहीं")}</p>
            )}
          </Card>

          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <CardTitle>{L("Notifications", "सूचनाएँ")}</CardTitle>
              <ul className="space-y-2 text-sm">
                {(["monthly_report", "fee_reminder", "meeting_invite"] as const).map((k) => (
                  <li key={k} className="flex items-center justify-between">
                    <label htmlFor={`pref-${k}`}>{tl(k)}</label>
                    <button
                      id={`pref-${k}`}
                      role="switch"
                      aria-checked={!!prefs[k]}
                      onClick={() => setPrefs((x) => ({ ...x, [k]: !x[k] }))}
                      className={cn("relative h-6 w-11 rounded-full transition-colors", prefs[k] ? "bg-brand" : "bg-[#cfd6e4]")}
                    >
                      <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", prefs[k] ? "left-[22px]" : "left-0.5")} />
                    </button>
                  </li>
                ))}
              </ul>
              {p.notification_prefs.quiet_hours && <p className="mt-2 text-xs text-ink-mute">{L("Quiet hours", "शांत समय")}: {p.notification_prefs.quiet_hours}</p>}
            </Card>
            <Card>
              <CardTitle>{L("Consent", "सहमति")}</CardTitle>
              <Badge tone={p.consent.verified ? "teal" : "amber"}>{p.consent.verified ? L("Verified", "सत्यापित") : L("Pending", "लंबित")}</Badge>
              <p className="mt-2 text-xs text-ink-soft">
                {p.consent.method.replace(/_/g, " ")} · {p.consent.date}
              </p>
              <p className="mt-2 text-xs text-ink-soft">{L("Questions or worries? You can talk to the institute counsellor any time.", "कोई सवाल या चिंता? आप कभी भी संस्थान के काउंसलर से बात कर सकते हैं।")}</p>
            </Card>
          </div>

          <Card>
            <CardTitle>FAQ</CardTitle>
            <ul className="space-y-3 text-sm">
              {p.faq.map((f, i) => (
                <li key={i}>
                  <p className="font-medium">{faqText(f, "q")}</p>
                  <p className="text-ink-soft">{faqText(f, "a")}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
