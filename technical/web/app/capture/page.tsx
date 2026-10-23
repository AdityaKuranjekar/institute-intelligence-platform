"use client";

import { Camera, FileSpreadsheet } from "lucide-react";
import { useRef, useState } from "react";
import { Badge, Button, Card, CardTitle, Note, PageHead, PageSkeleton, Origin } from "@/components/ui";
import { useApp, useData } from "@/lib/app-context";

type Stage = "idle" | "reading" | "cleaning" | "checking" | "done";
const STAGES: Stage[] = ["reading", "cleaning", "checking", "done"];

export default function CapturePage() {
  const { L } = useApp();
  const dc = useData("datacard");
  const ma = useData("mastery");
  const [file, setFile] = useState<{ name: string; kind: "csv" | "photo" } | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [drag, setDrag] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const start = (f: File | null | undefined) => {
    if (!f) return;
    timers.current.forEach(clearTimeout);
    setFile({ name: f.name, kind: /\.(png|jpe?g|heic)$/i.test(f.name) ? "photo" : "csv" });
    setStage("reading");
    timers.current = [setTimeout(() => setStage("cleaning"), 900), setTimeout(() => setStage("checking"), 1800), setTimeout(() => setStage("done"), 2700)];
  };

  if (dc.loading || ma.loading) return <PageSkeleton />;
  const clean = dc.data?.cleaning;
  const flags = ma.data?.wrong_key_flags ?? [];
  const labels: Record<Stage, [string, string]> = {
    idle: ["Waiting for a file", "फ़ाइल का इंतज़ार"],
    reading: ["Reading rows", "पंक्तियाँ पढ़ी जा रही हैं"],
    cleaning: ["Cleaning names", "नाम साफ़ हो रहे हैं"],
    checking: ["Checking answer keys", "उत्तर-कुंजी जाँची जा रही है"],
    done: ["Done", "पूरा हुआ"],
  };

  return (
    <div className="space-y-6">
      <PageHead title={L("Capture data", "डेटा जोड़ें")} sub={L("Drop a spreadsheet or a photo of an OMR sheet. This is a simulation of the quality report.", "स्प्रेडशीट या OMR शीट की फ़ोटो डालें। यह गुणवत्ता रिपोर्ट का अनुकरण है।")} />
      <div className="grid gap-4 md:grid-cols-2">
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            start(e.dataTransfer.files[0]);
          }}
          className={`flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${drag ? "border-brand bg-brand-soft" : "border-line bg-white"}`}
        >
          <FileSpreadsheet className="text-brand" />
          <span className="font-medium">{L("CSV / Excel file", "CSV / Excel फ़ाइल")}</span>
          <span className="text-sm text-ink-soft">{L("Drag and drop, or click to choose", "खींचकर छोड़ें, या चुनने के लिए क्लिक करें")}</span>
          <input type="file" accept=".csv,.xlsx,.xls" className="sr-only" onChange={(e) => start(e.target.files?.[0])} />
        </label>
        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-line bg-white p-8 text-center">
          <Camera className="text-teal" />
          <span className="font-medium">{L("OMR sheet photo", "OMR शीट की फ़ोटो")}</span>
          <span className="text-sm text-ink-soft">{L("Upload an image (not read for real in this demo)", "छवि अपलोड करें (इस डेमो में असल में पढ़ी नहीं जाती)")}</span>
          <input type="file" accept="image/*" className="sr-only" onChange={(e) => start(e.target.files?.[0])} />
        </label>
      </div>

      {file && (
        <Card>
          <CardTitle right={<Badge tone="calm">{L("Simulated", "अनुकरण")}</Badge>}>{file.name}</CardTitle>
          <ol className="mb-4 flex flex-wrap gap-2" aria-label="Progress">
            {STAGES.map((s) => (
              <li key={s}>
                <Badge tone={STAGES.indexOf(s) <= STAGES.indexOf(stage) ? "brand" : "neutral"}>{L(...labels[s])}</Badge>
              </li>
            ))}
          </ol>
          {stage === "done" && (
            <div className="space-y-4">
              <Note tone="calm">{L("Counts are not shown because no real file is processed in this demo.", "इस डेमो में कोई असली फ़ाइल प्रोसेस नहीं होती, इसलिए गिनतियाँ नहीं दिखाई गईं।")}</Note>
              <div>
                <p className="mb-2 text-sm font-medium">{L("Names cleaned: before and after", "नाम सफ़ाई: पहले और बाद में")}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(clean?.examples ?? []).map((e, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl border border-line px-3 py-2 text-sm">
                      <code className="text-ink-soft line-through">{e.raw}</code>
                      <span>→</span>
                      <code className="font-medium text-[#0a7467]">{e.clean}</code>
                    </div>
                  ))}
                </div>
                {clean?.note && <p className="mt-2 text-xs text-ink-soft">{clean.note}</p>}
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">{L("Answer keys flagged", "चिह्नित उत्तर-कुंजियाँ")}</p>
                {flags.length === 0 ? (
                  <p className="text-sm text-ink-soft">{L("No suspicious answer keys found.", "कोई संदिग्ध उत्तर-कुंजी नहीं मिली।")}</p>
                ) : (
                  <ul className="space-y-1 text-sm">
                    {flags.map((f, i) => (
                      <li key={i} className="rounded-xl bg-amber-soft px-3 py-2 text-[#7a4e05]">
                        {Object.entries(f).map(([k, v]) => `${k}: ${String(v)}`).join(" · ")}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Origin origin="synthetic" />
                <Button variant="ghost" onClick={() => { setFile(null); setStage("idle"); }}>{L("Start over", "फिर से शुरू करें")}</Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
