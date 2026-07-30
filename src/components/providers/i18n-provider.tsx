"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "@/i18n/en.json";
import ar from "@/i18n/ar.json";
import ru from "@/i18n/ru.json";
import fr from "@/i18n/fr.json";

export type Locale = "en" | "ar" | "ru" | "fr";
export type Direction = "ltr" | "rtl";

export const LANGUAGES: { code: Locale; label: string; dir: Direction }[] = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "ru", label: "Русский", dir: "ltr" },
  { code: "fr", label: "Français", dir: "ltr" },
];

type Dictionary = typeof en;
const DICTIONARIES: Record<Locale, Dictionary> = { en, ar, ru, fr };
const STORAGE_KEY = "dpx-locale";

function lookup(dict: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      dict,
    );
}

interface I18nContextValue {
  locale: Locale;
  dir: Direction;
  setLocale: (locale: Locale) => void;
  /** Translate a leaf string. */
  t: (path: string) => string;
  /** Translate raw structured content (arrays / objects). */
  tr: <T>(path: string) => T;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const applyLocale = useCallback((next: Locale) => {
    const lang = LANGUAGES.find((l) => l.code === next) ?? LANGUAGES[0];
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
    document.documentElement.lang = next;
    document.documentElement.dir = lang.dir;
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && saved in DICTIONARIES) applyLocale(saved);
    } catch {
      /* storage unavailable */
    }
  }, [applyLocale]);

  const resolve = useCallback(
    (path: string): unknown =>
      lookup(DICTIONARIES[locale], path) ?? lookup(DICTIONARIES.en, path),
    [locale],
  );

  const t = useCallback(
    (path: string): string => {
      const value = resolve(path);
      return typeof value === "string" ? value : path;
    },
    [resolve],
  );

  const tr = useCallback(
    <T,>(path: string): T => (resolve(path) ?? path) as T,
    [resolve],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dir: LANGUAGES.find((l) => l.code === locale)?.dir ?? "ltr",
      setLocale: applyLocale,
      t,
      tr,
    }),
    [locale, applyLocale, t, tr],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
