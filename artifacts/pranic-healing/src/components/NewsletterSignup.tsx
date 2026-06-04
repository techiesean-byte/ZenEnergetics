import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

interface NewsletterSignupProps {
  variant?: "banner" | "inline" | "footer";
}

export function NewsletterSignup({ variant = "banner" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { t } = useLanguage();

  function validate(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate(email)) {
      setErrorMsg(t.contact.email_placeholder);
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    setTimeout(() => { setStatus("success"); }, 1200);
  }

  if (variant === "footer") {
    return (
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-primary font-medium">
              <CheckCircle2 size={16} />
              <span>{t.newsletter.inline_success_title}.</span>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Input
                type="email"
                placeholder={t.newsletter.footer_placeholder}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-background/60 border-border text-sm"
                data-testid="input-footer-newsletter-email"
              />
              {errorMsg && <p className="text-xs text-destructive">{errorMsg}</p>}
              <Button type="submit" size="sm" disabled={status === "loading"} className="bg-primary text-primary-foreground hover:bg-primary/90 w-full" data-testid="button-footer-newsletter-submit">
                {status === "loading" ? <Loader2 size={14} className="animate-spin" /> : t.newsletter.footer_submit}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 size={36} className="text-primary" />
            <p className="font-serif text-xl font-light text-foreground">{t.newsletter.inline_success_title}{firstName ? `, ${firstName}` : ""}.</p>
            <p className="text-sm text-muted-foreground max-w-sm">{t.newsletter.inline_success_body}</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Input type="text" placeholder={t.newsletter.name_placeholder} value={firstName} onChange={e => setFirstName(e.target.value)} className="sm:w-40 bg-background border-border" data-testid="input-inline-newsletter-name" />
            <Input type="email" placeholder={t.newsletter.email_placeholder} value={email} onChange={e => { setEmail(e.target.value); setErrorMsg(""); }} className="flex-1 bg-background border-border" data-testid="input-inline-newsletter-email" />
            {errorMsg && <p className="text-xs text-destructive self-center">{errorMsg}</p>}
            <Button type="submit" disabled={status === "loading"} className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap" data-testid="button-inline-newsletter-submit">
              {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : t.newsletter.inline_submit}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    );
  }

  return (
    <section className="w-full py-20 bg-gradient-to-b from-secondary/20 to-accent/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div className="max-w-2xl mx-auto text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="flex flex-col items-center gap-4 py-8">
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-primary" />
                </div>
                <h3 className="font-serif text-3xl font-light text-foreground">
                  {t.newsletter.success_title}{firstName ? `, ${firstName}` : ""}.
                </h3>
                <p className="text-muted-foreground max-w-md">{t.newsletter.success_body}</p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles size={18} className="text-primary" />
                  <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">{t.newsletter.label}</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">{t.newsletter.headline}</h2>
                <p className="text-muted-foreground text-lg mb-2 leading-relaxed">{t.newsletter.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-8">{t.newsletter.privacy}</p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-3">
                  <Input type="text" placeholder={t.newsletter.name_placeholder} value={firstName} onChange={e => setFirstName(e.target.value)} className="sm:w-44 bg-background/80 border-border text-base py-5" data-testid="input-banner-newsletter-name" />
                  <Input type="email" placeholder={t.newsletter.email_placeholder} value={email} onChange={e => { setEmail(e.target.value); setErrorMsg(""); }} className="flex-1 bg-background/80 border-border text-base py-5" data-testid="input-banner-newsletter-email" />
                  <Button type="submit" size="lg" disabled={status === "loading"} className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap px-8" data-testid="button-banner-newsletter-submit">
                    {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : <><Mail size={16} className="mr-2" />{t.newsletter.submit}</>}
                  </Button>
                </form>
                {errorMsg && <p className="text-sm text-destructive mt-1">{errorMsg}</p>}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                  {[t.newsletter.benefit_1, t.newsletter.benefit_2, t.newsletter.benefit_3].map(b => (
                    <div key={b} className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-primary" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
