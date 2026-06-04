import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { LANGUAGES } from "@/lib/i18n";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find(l => l.code === language)!;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative" data-testid="language-selector">
      <button
        onClick={() => setOpen(o => !o)}
        data-testid="button-language-toggle"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-background/60 hover:bg-background transition-colors text-sm text-foreground/80 hover:text-foreground"
        aria-label="Select language"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline font-medium">{current.code.toUpperCase()}</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-36 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
          >
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setOpen(false); }}
                data-testid={`button-lang-${lang.code}`}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-muted/60 ${
                  language === lang.code
                    ? "text-primary font-medium bg-primary/5"
                    : "text-foreground/80"
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
