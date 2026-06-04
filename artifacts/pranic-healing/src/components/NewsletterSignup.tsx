import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsletterSignupProps {
  variant?: "banner" | "inline" | "footer";
}

export function NewsletterSignup({ variant = "banner" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function validate(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  }

  if (variant === "footer") {
    return (
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-primary font-medium"
            >
              <CheckCircle2 size={16} />
              <span>You're on the list. Welcome.</span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-background/60 border-border text-sm"
                data-testid="input-footer-newsletter-email"
              />
              {errorMsg && <p className="text-xs text-destructive">{errorMsg}</p>}
              <Button
                type="submit"
                size="sm"
                disabled={status === "loading"}
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                data-testid="button-footer-newsletter-submit"
              >
                {status === "loading" ? <Loader2 size={14} className="animate-spin" /> : "Subscribe"}
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
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 py-6 text-center"
          >
            <CheckCircle2 size={36} className="text-primary" />
            <p className="font-serif text-xl font-light text-foreground">
              Welcome to the circle, {firstName || "friend"}.
            </p>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your first article is on its way. Check your inbox — and your spam folder, just in case.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="sm:w-40 bg-background border-border"
              data-testid="input-inline-newsletter-name"
            />
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrorMsg(""); }}
              className="flex-1 bg-background border-border"
              data-testid="input-inline-newsletter-email"
            />
            {errorMsg && <p className="text-xs text-destructive self-center">{errorMsg}</p>}
            <Button
              type="submit"
              disabled={status === "loading"}
              className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
              data-testid="button-inline-newsletter-submit"
            >
              {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : "Join the Circle"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    );
  }

  return (
    <section className="w-full py-20 bg-gradient-to-b from-secondary/20 to-accent/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4 py-8"
              >
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-primary" />
                </div>
                <h3 className="font-serif text-3xl font-light text-foreground">
                  Welcome to the circle, {firstName || "friend"}.
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Your first article is already on its way. We are glad you are here. 
                  Expect gentle wisdom in your inbox — nothing more, nothing less.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles size={18} className="text-primary" />
                  <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                    Free Newsletter
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
                  Healing wisdom, delivered gently.
                </h2>
                <p className="text-muted-foreground text-lg mb-2 leading-relaxed">
                  Join our circle and receive thoughtful articles on energy healing, chakra care, 
                  and practical wellness — delivered once a week, never cluttering your inbox.
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  No spam. Unsubscribe any time. Your privacy is sacred to us.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-3">
                  <Input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="sm:w-44 bg-background/80 border-border text-base py-5"
                    data-testid="input-banner-newsletter-name"
                  />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrorMsg(""); }}
                    className="flex-1 bg-background/80 border-border text-base py-5"
                    data-testid="input-banner-newsletter-email"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading"}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap px-8"
                    data-testid="button-banner-newsletter-submit"
                  >
                    {status === "loading"
                      ? <Loader2 size={18} className="animate-spin" />
                      : <><Mail size={16} className="mr-2" /> Join Free</>
                    }
                  </Button>
                </form>

                {errorMsg && (
                  <p className="text-sm text-destructive mt-1">{errorMsg}</p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-primary" />
                    <span>Weekly articles</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-primary" />
                    <span>Healing meditations</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-primary" />
                    <span>Exclusive session offers</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
