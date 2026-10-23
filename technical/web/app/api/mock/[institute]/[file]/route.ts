import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import { findArtifact } from "@/lib/server-data";

export const dynamic = "force-dynamic";

// institute = "global" for moat / scaling / models / metrics.
export async function GET(_req: Request, { params }: { params: { institute: string; file: string } }) {
  const ok = /^[a-z0-9_]+$/;
  if (!ok.test(params.institute) || !ok.test(params.file)) {
    return NextResponse.json({ error: "bad name" }, { status: 400 });
  }
  const p = await findArtifact(params.institute === "global" ? null : params.institute, params.file);
  if (!p) return NextResponse.json({ error: "not found" }, { status: 404 });
  const text = await fs.readFile(p, "utf8");
  return new NextResponse(text, { headers: { "content-type": "application/json" } });
}
