import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

type Step = "closed" | "open" | "sending" | "done";

export function ContactWidget() {
  const [step, setStep] = useState<Step>("closed");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [unread, setUnread] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useLanguage();

  const QUICK_QUESTIONS = [
    t.contact.quick_q1,
    t.contact.quick_q2,
    t.contact.quick_q3,
    t.contact.quick_q4,
  ];

  useEffect(() => {
    if (step === "open" && textareaRef.current && message) {
      textareaRef.current.focus();
    }
  }, [step, message]);

  function validate() {
    const e: typeof errors = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t.newsletter.email_placeholder;
    if (!message.trim()) e.message = t.contact.message_placeholder;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleOpen() { setStep("open"); setUnread(false); }
  function handleClose() { setStep("closed"); }
  function handleQuick(q: string) { setMessage(q); setTimeout(() => textareaRef.current?.focus(), 50); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStep("sending");
    setTimeout(() => setStep("done"), 1400);
  }

  function handleReset() {
    setName(""); setEmail(""); setMessage(""); setErrors({});
    setStep("open");
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      <AnimatePresence>
        {(step === "open" || step === "sending" || step === "done") && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-80 rounded-2xl border border-border bg-card shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary px-5 py-4 flex items-start justify-between">
              <div>
                <p className="text-primary-foreground font-serif text-lg font-light leading-tight">
                  {t.contact.panel_title}
                </p>
                <p className="text-primary-foreground/75 text-xs mt-0.5">
                  {t.contact.panel_subtitle}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors mt-0.5"
                data-testid="button-chat-close"
                aria-label={t.common.close}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <AnimatePresence mode="wait">
                {step === "done" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center gap-3 py-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
                      <CheckCircle2 size={24} className="text-primary" />
                    </div>
                    <p className="font-serif text-lg font-light text-foreground">
                      {t.contact.success_title}{name ? `, ${name.split(" ")[0]}` : ""}.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t.contact.success_body} <span className="text-foreground font-medium">{email}</span> {t.contact.success_body2}
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-2 text-xs text-primary hover:underline"
                      data-testid="button-chat-send-another"
                    >
                      {t.contact.send_another}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                      {t.contact.quick_label}
                    </p>
                    <div className="flex flex-col gap-1.5 mb-4">
                      {QUICK_QUESTIONS.map(q => (
                        <button
                          key={q}
                          onClick={() => handleQuick(q)}
                          data-testid={`button-quick-question-${q.slice(0, 20).toLowerCase().replace(/\s+/g, "-")}`}
                          className={`text-left text-xs px-3 py-2 rounded-lg border transition-all duration-150 ${
                            message === q
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-muted/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4">
                      <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                        {t.contact.form_label}
                      </p>
                      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <Input
                          placeholder={t.contact.name_placeholder}
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="text-sm bg-background"
                          data-testid="input-chat-name"
                        />
                        <div>
                          <Input
                            placeholder={t.contact.email_placeholder}
                            type="email"
                            value={email}
                            onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: undefined })); }}
                            className={`text-sm bg-background ${errors.email ? "border-destructive" : ""}`}
                            data-testid="input-chat-email"
                          />
                          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <Textarea
                            ref={textareaRef}
                            placeholder={t.contact.message_placeholder}
                            value={message}
                            onChange={e => { setMessage(e.target.value); setErrors(v => ({ ...v, message: undefined })); }}
                            rows={3}
                            className={`text-sm bg-background resize-none ${errors.message ? "border-destructive" : ""}`}
                            data-testid="input-chat-message"
                          />
                          {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                        </div>
                        <Button
                          type="submit"
                          disabled={step === "sending"}
                          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                          data-testid="button-chat-submit"
                        >
                          {step === "sending"
                            ? <Loader2 size={15} className="animate-spin" />
                            : <><Send size={14} className="mr-2" />{t.contact.send}</>
                          }
                        </Button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={step === "closed" ? handleOpen : handleClose}
        data-testid="button-chat-toggle"
        aria-label={t.contact.panel_title}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {step !== "closed" ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <ChevronDown size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {unread && step === "closed" && (
            <motion.span
              key="dot"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive border-2 border-card"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
