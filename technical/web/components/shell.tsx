"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useApp } from "@/lib/app-context";
import { INSTITUTES } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Select } from "./ui";

const ROLES = [
  { href: "/owner", en: "Owner", hi: "मालिक" },
  { href: "/teacher", en: "Teacher", hi: "शिक्षक" },
  { href: "/student/_", en: "Student", hi: "विद्यार्थी", match: "/student" },
  { href: "/parent/_", en: "Parent", hi: "अभिभावक", match: "/parent" },
];
const NAV = [
  { href: "/capture", en: "Capture", hi: "डेटा जोड़ें" },
  { href: "/teacher", en: "Teacher", hi: "शिक्षक" },
  { href: "/student/_", en: "Student", hi: "विद्यार्थी", match: "/student" },
  { href: "/parent/_", en: "Parent", hi: "अभिभावक", match: "/parent" },
  { href: "/owner", en: "Owner", hi: "मालिक" },
  { href: "/data-card", en: "Data card", hi: "डेटा कार्ड" },
  { href: "/how-it-works", en: "How it works", hi: "यह कैसे काम करता है" },
];

export function Shell({ children }: { children: ReactNode }) {
  const { lang, setLang, institute, setInstitute, L } = useApp();
  const path = usePathname() ?? "";
  const active = (x: { href: string; match?: string }) => path.startsWith(x.match ?? x.href);

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-white focus:p-2">
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
          <Link href="/" className="flex items-center gap-2 font-semibold text-ink">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white">P</span>
            <span>Pragati</span>
          </Link>

          <div role="group" aria-label={L("Role", "भूमिका")} className="order-3 flex w-full gap-1 rounded-xl bg-bg p-1 sm:order-none sm:w-auto">
            {ROLES.map((r) => (
              <Link
                key={r.en}
                href={r.href}
                className={cn(
                  "flex-1 rounded-lg px-3 py-1.5 text-center text-sm font-medium transition-colors sm:flex-none",
                  active(r) ? "bg-white text-brand-dark shadow-soft" : "text-ink-soft hover:text-ink"
                )}
              >
                {L(r.en, r.hi)}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Select
              label={L("Institute", "संस्थान")}
              value={institute}
              onChange={setInstitute}
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
          </div>
        </div>
        <nav aria-label="Demo screens" className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2 text-sm">
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
