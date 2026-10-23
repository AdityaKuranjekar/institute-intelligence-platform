import { GLOBAL_FILES, SCHEMAS, type FileKey, type FileType } from "./types";

// Swap to the FastAPI later by changing only this base URL (and the path shape in urlFor).
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api/mock";

export function urlFor(file: FileKey, institute: string) {
  return `${API_BASE}/${GLOBAL_FILES.includes(file) ? "global" : institute}/${file}`;
}
export const figureUrl = (path: string) => `${API_BASE}/figures/${path.split("/").pop()}`;

export async function fetchFile<K extends FileKey>(file: K, institute: string): Promise<FileType<K>> {
  const res = await fetch(urlFor(file, institute), { cache: "no-store" });
  if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
  const json = await res.json();
  const parsed = SCHEMAS[file].safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    throw new Error(`${file}: ${first.path.join(".")} ${first.message}`);
  }
  return parsed.data as FileType<K>;
}
