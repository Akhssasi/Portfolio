import type { TranslationMap } from "@/db/schema";

/**
 * Pick a locale-aware field from a database row.
 * Falls back to the base (English) column when no translation exists.
 */
export function tx(
  translations: TranslationMap | null | undefined,
  locale: string,
  key: string,
  fallback: string,
): string {
  if (locale !== "en" && translations) {
    const map = translations[locale as keyof TranslationMap];
    const value = map?.[key];
    if (value) return value;
  }
  return fallback;
}
