"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { fetchFile } from "./api";
import type { FileKey, FileType } from "./types";

export type Lang = "en" | "hi";
type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
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

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, langTouched, institute, setInstitute, L: (en, hi) => (lang === "hi" ? hi : en) }),
    [lang, setLang, langTouched, institute, setInstitute]
  );
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error("AppProvider missing");
  return c;
}

type State<T> = { data: T | null; error: string | null; loading: boolean };

/** Load + zod-validate one artifact file for the selected institute. */
export function useData<K extends FileKey>(file: K): State<FileType<K>> {
  const { institute } = useApp();
  const [state, setState] = useState<State<FileType<K>>>({ data: null, error: null, loading: true });
  useEffect(() => {
    let alive = true;
    setState({ data: null, error: null, loading: true });
    fetchFile(file, institute)
      .then((data) => alive && setState({ data, error: null, loading: false }))
      .catch((e: Error) => alive && setState({ data: null, error: e.message, loading: false }));
    return () => {
      alive = false;
    };
  }, [file, institute]);
  return state;
}
