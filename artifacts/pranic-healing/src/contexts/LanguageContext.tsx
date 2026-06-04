import { createContext, useContext, useState, ReactNode } from "react";
import { Language, translations, Translations } from "@/lib/i18n";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("pranic-lang");
    return (saved as Language) || "en";
  });

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    localStorage.setItem("pranic-lang", lang);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
