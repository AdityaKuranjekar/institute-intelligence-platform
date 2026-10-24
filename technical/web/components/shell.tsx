"use client";

import { BookOpen, Building2, Database, GraduationCap, LayoutGrid, LogOut, ShieldCheck, Smartphone, Upload, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useApp } from "@/lib/app-context";
import { ROLE_HOME, useAuth } from "@/lib/auth";
import type { Role } from "@/lib/http";
import { INSTITUTES } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Select } from "./ui";

const ROLES: { role: Role; en: string; hi: string }[] = [
  { role: "owner", en: "Owner", hi: "मालिक" },
  { role: "teacher", en: "Teacher", hi: "शिक्षक" },
  { role: "mentor", en: "Mentor", hi: "मेंटर" },
  { role: "student", en: "Student", hi: "विद्यार्थी" },
  { role: "parent", en: "Parent", hi: "अभिभावक" },
];
const ALL_NAV = [
  { href: "/capture", en: "Capture", hi: "डेटा जोड़ें", icon: Upload },
  { href: "/teacher", en: "Teacher", hi: "शिक्षक", icon: LayoutGrid },
  { href: "/student/_", en: "Student", hi: "विद्यार्थी", icon: GraduationCap, match: "/student" },
  { href: "/parent/_", en: "Parent", hi: "अभिभावक", icon: Smartphone, match: "/parent" },
  { href: "/owner", en: "Owner", hi: "मालिक", icon: Building2 },
  { href: "/privacy", en: "Consent & privacy", hi: "सहमति और गोपनीयता", icon: ShieldCheck },
  { href: "/data-card", en: "Data card", hi: "डेटा कार्ड", icon: Database },
  { href: "/how-it-works", en: "How it works", hi: "यह कैसे काम करता है", icon: BookOpen },
];

const NAV_BY_ROLE: Record<Role, string[]> = {
  owner: ["Capture", "Teacher", "Owner", "Consent & privacy", "Data card", "How it works"],
  teacher: ["Capture", "Teacher", "Consent & privacy", "Data card", "How it works"],
  mentor: ["Teacher", "How it works"],
  student: ["Student", "How it works"],
  parent: ["Parent", "How it works"],
};

export function Shell({ children }: { children: ReactNode }) {
  const { lang, setLang, institute, setInstitute, L } = useApp();
  const { session, ready, login, logout } = useAuth();
  const router = useRouter();
  const path = usePathname() ?? "";
  if (path === "/login") return <>{children}</>;
  if (!ready || !session) return <div className="grid min-h-screen place-items-center text-sm text-ink-mute" aria-busy="true">{L("Loading…", "लोड हो रहा है…")}</div>;
  const role = session.user.role;
  const NAV = ALL_NAV.filter((n) => NAV_BY_ROLE[role].includes(n.en));
  const switchRole = async (r: Role) => {
    if (r === role) return;
    try {
      await login(r, institute);
      router.push(ROLE_HOME[r]);
    } catch {}
  };
  const active = (x: { href: string; match?: string }) => path.startsWith(x.match ?? x.href);
  const inst = INSTITUTES.find((i) => i.id === institute)?.label ?? institute;

  return (
    <div className="min-h-screen lg:pl-60">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-white focus:p-2">
        Skip to content
      </a>

      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-line bg-white lg:flex">
        <Link href="/" className="flex items-center gap-2.5 px-5 py-5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand font-semibold text-white">P</span>
          <span>
            <span className="block font-semibold leading-tight text-ink">Pragati</span>
            <span className="block text-[11px] leading-tight text-ink-mute">{inst}</span>
          </span>
        </Link>
        <nav aria-label="Screens" className="flex-1 space-y-1 px-3">
          {NAV.map((n) => (
            <Link
              key={n.en}
              href={n.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                active(n) ? "bg-brand-soft font-medium text-brand-dark" : "text-ink-soft hover:bg-bg"
              )}
            >
              <n.icon size={17} /> {L(n.en, n.hi)}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 text-[11px] leading-snug text-ink-mute">
          <Users size={13} className="mb-1" />
          {L("Synthetic data · illustrative screens", "कृत्रिम डेटा · उदाहरण स्क्रीन")}
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
          <Link href="/" className="flex items-center gap-2 font-semibold text-ink lg:hidden">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white">P</span>
          </Link>
          <div role="group" aria-label={L("Signed in as (demo role switch)", "इस रूप में साइन इन (डेमो भूमिका बदलें)")} className="order-3 flex w-full gap-1 rounded-xl bg-bg p-1 sm:order-none sm:w-auto">
            {ROLES.map((r) => (
              <button
                key={r.role}
                onClick={() => switchRole(r.role)}
                aria-pressed={role === r.role}
                className={cn(
                  "flex-1 rounded-lg px-3 py-1.5 text-center text-sm font-medium transition-colors sm:flex-none",
                  role === r.role ? "bg-white text-brand-dark shadow-soft" : "text-ink-soft hover:text-ink"
                )}
              >
                {L(r.en, r.hi)}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Select
              label={L("Institute", "संस्थान")}
              value={institute}
              onChange={(v) => {
                setInstitute(v);
                void login(role, v);
              }}
              options={INSTITUTES.map((i) => ({ value: i.id, label: i.label }))}
            />
            <div role="group" aria-label="Language" className="flex rounded-xl border border-line p-0.5 text-sm">
              {(["en", "hi"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={cn("rounded-lg px-2.5 py-1 font-medium", lang === l ? "bg-brand text-white" : "text-ink-soft")}
                >
                  {l === "en" ? "EN" : "हिं"}
                </button>
              ))}
            </div>
            <button onClick={logout} aria-label={L("Sign out", "साइन आउट")} title={L("Sign out", "साइन आउट")} className="grid h-9 w-9 place-items-center rounded-xl border border-line text-ink-soft hover:bg-bg">
              <LogOut size={16} />
            </button>
          </div>
        </div>
        <nav aria-label="Demo screens" className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2 text-sm lg:hidden">
          {NAV.map((n) => (
            <Link
              key={n.en}
              href={n.href}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1 transition-colors",
                active(n) ? "bg-brand-soft font-medium text-brand-dark" : "text-ink-soft hover:bg-bg"
              )}
            >
              {L(n.en, n.hi)}
            </Link>
          ))}
        </nav>
      </header>
      <main id="main" className="mx-auto max-w-7xl px-4 py-6">
        {children}
      </main>
      <footer className="mx-auto max-w-7xl px-4 pb-8 text-xs text-ink-mute">
        {L(
          "All student data shown is synthetic. Percentiles and ROI are assumptions until a real pilot.",
          "यहाँ दिखाया गया सारा विद्यार्थी डेटा कृत्रिम है। पर्सेंटाइल और ROI असली पायलट तक अनुमान हैं।"
        )}
      </footer>
    </div>
  );
}
