"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/lib/app-context";
import { useAuth } from "@/lib/auth";
import { useStudents } from "@/lib/names";
import { Select } from "./ui";

/** Student/parent chooser. Sorted by roll number only. */
export function PersonPicker({ base, id }: { base: "student" | "parent"; id: string }) {
  const { list } = useStudents();
  const { L } = useApp();
  const router = useRouter();
  const { session } = useAuth();
  // a student or parent only ever sees their own record, so there is nothing to pick
  if (session?.user.role === "student" || session?.user.role === "parent") return null;
  return (
    <Select
      label={base === "student" ? L("Student", "विद्यार्थी") : L("Child", "बच्चा")}
      value={id}
      onChange={(v) => router.replace(`/${base}/${v}`)}
      options={list.map((s) => ({ value: s.student_id, label: `${s.display_name} (${s.roll_no})` }))}
    />
  );
}
