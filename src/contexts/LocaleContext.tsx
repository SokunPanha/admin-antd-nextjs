"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  localeVersion: number;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState("en");
  const [localeVersion, setLocaleVersion] = useState(0);

  useEffect(() => {
    // Get locale from localStorage on mount
    const savedLocale = localStorage.getItem("locale") || "en";
    setLocaleState(savedLocale);

    // Set initial locale cookie
    document.cookie = `locale=${savedLocale}; path=/; max-age=31536000`; // 1 year
  }, []);

  const setLocale = useCallback((newLocale: string) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);

    // Set locale cookie for API requests
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year

    // Increment version to trigger re-renders in components that depend on it
    setLocaleVersion((v) => v + 1);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, localeVersion }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
