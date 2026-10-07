import { en } from "./en";
import { ru } from "./ru";
import { uz } from "./uz";
import type { Dictionary, Locale } from "./types";

export type { Dictionary, Locale };

export const LOCALES: Locale[] = ["ru", "uz", "en"];

export const LOCALE_LABEL: Record<Locale, string> = {
  ru: "RU",
  uz: "UZ",
  en: "EN",
};

export const dictionaries: Record<Locale, Dictionary> = {
  ru,
  uz,
  en,
};

export const DEFAULT_LOCALE: Locale = "ru";

const STORAGE_KEY = "bayhan-locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "ru" || value === "uz" || value === "en";
}

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(stored) ? stored : DEFAULT_LOCALE;
}

export function storeLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, locale);
}
