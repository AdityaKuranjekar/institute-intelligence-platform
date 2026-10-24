"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { fetchFile } from "./api";
import { ApiError } from "./http";
import type { FileKey, FileType } from "./types";

export type Lang = "en" | "hi";
type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** set language without remembering it (used for per-person defaults) */
  softLang: (l: Lang) => void;
  langTouched: boolean;
  institute: string;
  setInstitute: (i: string) => void;
  /** pick the English or Hindi variant */
  L: (en: string, hi: string) => string;
};
const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [langTouched, setTouched] = useState(false);
  const [institute, setInstituteState] = useState("patna_jee");

  useEffect(() => {
    try {
      const l = localStorage.getItem("pragati.lang");
      if (l === "en" || l === "hi") {
        setLangState(l);
        setTouched(true);
      }
      const i = localStorage.getItem("pragati.institute");
      if (i) setInstituteState(i);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    setTouched(true);
    try {
      localStorage.setItem("pragati.lang", l);
    } catch {}
  }, []);
  const setInstitute = useCallback((i: string) => {
    setInstituteState(i);
    try {
      localStorage.setItem("pragati.institute", i);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const softLang = useCallback((l: Lang) => setLangState(l), []);
  const value = useMemo<Ctx>(
    () => ({ lang, setLang, softLang, langTouched, institute, setInstitute, L: (en, hi) => (lang === "hi" ? hi : en) }),
    [lang, setLang, softLang, langTouched, institute, setInstitute]
  );
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error("AppProvider missing");
  return c;
}

type State<T> = { data: T | null; error: string | null; status: number | null; loading: boolean };
type Loaded<T> = State<T> & { refreshing: boolean; reload: () => void; mutate: (d: T) => void };

/** Load + zod-validate one artifact file for the selected institute. */
export function useData<K extends FileKey>(file: K): Loaded<FileType<K>> {
  const { institute } = useApp();
  const [state, setState] = useState<State<FileType<K>>>({ data: null, error: null, status: null, loading: true });
  const [tick, setTick] = useState(0);
  const lastKey = useRef("");
  useEffect(() => {
    let alive = true;
    // keep showing the old data while a manual reload runs
    const key = `${file}|${institute}`;
    const same = lastKey.current === key;
    lastKey.current = key;
    setState((s) => (same ? { ...s, loading: true } : { data: null, error: null, status: null, loading: true }));
    fetchFile(file, institute)
      .then((data) => alive && setState({ data, error: null, status: 200, loading: false }))
      .catch((e: Error) => alive && setState({ data: null, error: e.message, status: e instanceof ApiError ? e.status : 0, loading: false }));
    return () => {
      alive = false;
    };
  }, [file, institute, tick]);
  const reload = useCallback(() => setTick((t) => t + 1), []);
  const mutate = useCallback((d: FileType<K>) => setState({ data: d, error: null, status: 200, loading: false }), []);
  return { ...state, loading: state.loading && state.data === null, refreshing: state.loading && state.data !== null, reload, mutate };
}
