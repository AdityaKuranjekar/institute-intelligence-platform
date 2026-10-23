"use client";

import { Info } from "lucide-react";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...p }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-line bg-card p-5 shadow-soft", className)} {...p} />;
}

export function CardTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-3 flex items-start justify-between gap-3">
      <h3 className="text-[15px] font-semibold text-ink">{children}</h3>
      {right}
    </div>
  );
}

export function Button({
  className,
  variant = "primary",
  ...p
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "soft" }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50",
        variant === "primary" && "bg-brand text-white hover:bg-brand-dark",
        variant === "soft" && "bg-brand-soft text-brand-dark hover:bg-[#d8e6ff]",
        variant === "ghost" && "text-ink-soft hover:bg-brand-soft",
        className
      )}
      {...p}
    />
  );
}

const TONES = {
  neutral: "bg-[#eef1f6] text-ink-soft",
  brand: "bg-brand-soft text-brand-dark",
  teal: "bg-teal-soft text-[#0a7467]",
  amber: "bg-amber-soft text-[#9a6206]",
  calm: "bg-calm-soft text-[#3f4f8c]",
} as const;
export function Badge({ tone = "neutral", className, ...p }: HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof TONES }) {
  return (
    <span
      className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium", TONES[tone], className)}
      {...p}
    />
  );
}

const ORIGIN_TONE: Record<string, keyof typeof TONES> = {
  synthetic: "calm",
  public: "teal",
  model: "brand",
  assumption: "amber",
  real_photo: "teal",
};
/** Origin chip: synthetic / public / model / assumption. */
export function Origin({ origin, className }: { origin?: string; className?: string }) {
  if (!origin) return null;
  return (
    <Badge tone={ORIGIN_TONE[origin] ?? "neutral"} className={className} data-testid="origin-chip">
      {origin.replace("_", " ")}
    </Badge>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-[#e9edf4] motion-reduce:animate-none", className)} />;
}

export function PageSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true">
      <Skeleton className="h-10 w-1/3" />
      <div className="grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
      <Skeleton className="h-72" />
    </div>
  );
}

export function Unavailable({ what, detail }: { what: string; detail?: string | null }) {
  return (
    <Card className="mx-auto max-w-md text-center">
      <Info className="mx-auto mb-2 text-ink-mute" />
      <p className="font-medium text-ink">Data not available: {what}</p>
      <p className="mt-1 text-sm text-ink-soft">
        We could not load this view. Check that the artifact file exists in <code>ml/artifacts</code>.
      </p>
      {detail && <p className="mt-2 text-xs text-ink-mute">{detail}</p>}
    </Card>
  );
}

export function Note({ children, tone = "amber" }: { children: ReactNode; tone?: "amber" | "brand" | "calm" }) {
  const c = tone === "amber" ? "bg-amber-soft text-[#7a4e05]" : tone === "brand" ? "bg-brand-soft text-brand-dark" : "bg-calm-soft text-[#3f4f8c]";
  return (
    <div className={cn("flex gap-2 rounded-xl px-3 py-2 text-[13px] leading-snug", c)}>
      <Info size={15} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export function PageHead({ title, sub, right }: { title: ReactNode; sub?: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
        {sub && <p className="mt-1 text-sm text-ink-soft">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-ink-soft">
      <span className="sr-only sm:not-sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Stat({ label, value, sub, origin }: { label: string; value: ReactNode; sub?: ReactNode; origin?: string }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-ink-mute">{label}</p>
        <Origin origin={origin} />
      </div>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-ink">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink-soft">{sub}</p>}
    </Card>
  );
}
