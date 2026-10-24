"use client";

import { Building2, GraduationCap, HeartHandshake, LayoutGrid, Smartphone } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button, Card, Note, Select } from "@/components/ui";
import { useApp } from "@/lib/app-context";
import { ROLE_HOME, useAuth } from "@/lib/auth";
import { ApiError, API_BASE, type Role } from "@/lib/http";
import { INSTITUTES } from "@/lib/types";
import { cn } from "@/lib/utils";

const ROLES: { role: Role; en: string; hi: string; den: string; dhi: string; icon: typeof Building2 }[] = [
  { role: "owner", en: "Owner", hi: "मालिक", den: "Whole institute, consent and settings", dhi: "पूरा संस्थान, सहमति और सेटिंग", icon: Building2 },
  { role: "teacher", en: "Teacher", hi: "शिक्षक", den: "Batches, tests, upload data", dhi: "बैच, टेस्ट, डेटा अपलोड", icon: LayoutGrid },
  { role: "mentor", en: "Mentor", hi: "मेंटर", den: "This week's support list", dhi: "इस सप्ताह की सहयोग सूची", icon: HeartHandshake },
  { role: "student", en: "Student", hi: "विद्यार्थी", den: "My own progress only", dhi: "सिर्फ़ मेरी प्रगति", icon: GraduationCap },
  { role: "parent", en: "Parent", hi: "अभिभावक", den: "My child's report", dhi: "मेरे बच्चे की रिपोर्ट", icon: Smartphone },
];

function LoginForm() {
  const { L, lang, setLang, institute, setInstitute } = useApp();
  const { login } = useAuth();
  const router = useRouter();
  const q = useSearchParams();
  const [role, setRole] = useState<Role>("teacher");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async () => {
    setBusy(true);
    setErr(null);
    try {
      const s = await login(role, institute);
      setInstitute(s.user.institute_id);
      const next = q.get("next");
      router.replace(next && next.startsWith("/") && !next.startsWith("/login") ? next : ROLE_HOME[s.user.role]);
    } catch (e) {
      const a = e as ApiError;
      setErr(
        a.status === 0
          ? L(`Cannot reach the server at ${API_BASE}. Is it running?`, `सर्वर (${API_BASE}) तक नहीं पहुँच सके। क्या वह चल रहा है?`)
          : a.status === 403
          ? L("This role is not allowed for that institute.", "इस संस्थान के लिए यह भूमिका अनुमत नहीं है।")
          : a.message
      );
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-lg font-semibold text-white">P</span>
          <div>
            <h1 className="text-xl font-semibold leading-tight text-ink">Pragati</h1>
            <p className="text-xs text-ink-mute">{L("Institute intelligence · demo sign-in", "संस्थान इंटेलिजेंस · डेमो साइन-इन")}</p>
          </div>
        </div>
        <div role="group" aria-label="Language" className="flex rounded-xl border border-line p-0.5 text-sm">
          {(["en", "hi"] as const).map((l) => (
            <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={cn("rounded-lg px-2.5 py-1 font-medium", lang === l ? "bg-brand text-white" : "text-ink-soft")}>
              {l === "en" ? "EN" : "हिं"}
            </button>
          ))}
        </div>
      </div>

      <Card>
        {q.get("expired") && (
          <div className="mb-4" role="status">
            <Note>{L("Your session ended. Please sign in again.", "आपका सत्र समाप्त हो गया। कृपया फिर साइन इन करें।")}</Note>
          </div>
        )}
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-ink">{L("Sign in as", "इस रूप में साइन इन करें")}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {ROLES.map((r) => (
              <label
                key={r.role}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-brand",
                  role === r.role ? "border-brand bg-brand-soft" : "border-line bg-white hover:bg-bg"
                )}
              >
                <input type="radio" name="role" value={r.role} checked={role === r.role} onChange={() => setRole(r.role)} className="sr-only" />
                <r.icon size={18} className="mt-0.5 text-brand" />
                <span>
                  <span className="block text-sm font-medium text-ink">{L(r.en, r.hi)}</span>
                  <span className="block text-xs text-ink-soft">{L(r.den, r.dhi)}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <Select label={L("Institute", "संस्थान")} value={institute} onChange={setInstitute} options={INSTITUTES.map((i) => ({ value: i.id, label: i.label }))} />
          <Button onClick={submit} disabled={busy} data-testid="login-submit">
            {busy ? L("Signing in…", "साइन इन हो रहा है…") : L("Sign in", "साइन इन")}
          </Button>
        </div>
        {err && (
          <p role="alert" className="mt-3 rounded-xl bg-amber-soft px-3 py-2 text-sm text-[#7a4e05]">
            {err}
          </p>
        )}
        <p className="mt-4 text-xs text-ink-mute">
          {L(
            "Demo accounts with seeded synthetic data. No password or OTP in this prototype; the server still checks your role on every request.",
            "कृत्रिम डेटा वाले डेमो खाते। इस प्रोटोटाइप में पासवर्ड या OTP नहीं है; सर्वर फिर भी हर अनुरोध पर आपकी भूमिका जाँचता है।"
          )}
        </p>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
