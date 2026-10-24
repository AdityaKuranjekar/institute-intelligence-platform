"use client";

import { useMemo } from "react";
import { useData } from "./app-context";
import type { Student } from "./types";

/** student_id -> student (from student.json). Missing ids fall back to a short code. */
export function useStudents() {
  const { data, loading, error } = useData("student");
  const map = useMemo(() => new Map<string, Student>((data?.students ?? []).map((s) => [s.student_id, s])), [data]);
  // Always sorted by roll number, never by performance.
  const list = useMemo(() => [...(data?.students ?? [])].sort((a, b) => a.roll_no.localeCompare(b.roll_no)), [data]);
  const nameOf = (id: string) => map.get(id)?.display_name ?? `Student ${id.slice(0, 4)}`;
  const rollOf = (id: string) => map.get(id)?.roll_no ?? id.slice(0, 6);
  return { map, list, nameOf, rollOf, loading, error };
}

export const subjectLabel = (s: string, L: (en: string, hi: string) => string) => {
  const k = s.toLowerCase();
  const m: Record<string, [string, string]> = {
    physics: ["Physics", "भौतिकी"],
    chemistry: ["Chemistry", "रसायन"],
    mathematics: ["Mathematics", "गणित"],
    biology: ["Biology", "जीव विज्ञान"],
    botany: ["Botany", "वनस्पति विज्ञान"],
    zoology: ["Zoology", "जंतु विज्ञान"],
  };
  const x = m[k];
  return x ? L(x[0], x[1]) : s;
};
