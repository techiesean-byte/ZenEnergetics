import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, CheckCircle2, ChevronDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

/* ── Presence logic ──────────────────────────────────────────────
   Mon–Fri 09:00–18:00 in the healer's local timezone (America/Toronto).
   Falls back to system time if Intl is unavailable.
────────────────────────────────────────────────────────────────── */
const TIMEZONE = "America/Toronto";
const WORK_START = 9;   // 09:00
const WORK_END   = 18;  // 18:00
const WORK_DAYS  = [1, 2, 3, 4, 5]; // Mon–Fri

function getPresence(): { online: boolean; nextOnline: string } {
  try {
    const now   = new Date();
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: TIMEZONE,
      hour: "numeric",
      minute: "numeric",
      weekday: "short",
      hour12: false,
    }).formatToParts(now);

    const hour    = parseInt(parts.find(p => p.type === "hour")!.value);
    const minute  = parseInt(parts.find(p => p.type === "minute")!.value);
    const weekday = parts.find(p => p.type === "weekday")!.value; // "Mon", "Tue" …
    const dowMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const dow     = dowMap[weekday] ?? now.getDay();

    const isWorkDay  = WORK_DAYS.includes(dow);
    const isWorkHour = hour >= WORK_START && hour < WORK_END;
    const online     = isWorkDay && isWorkHour;

    // Build a human-readable "back at" string
    let nextOnline = "Monday at 9:00 AM";
    if (!online) {
      if (isWorkDay && hour < WORK_START) {
        nextOnline = "today at 9:00 AM";
      } else if (isWorkDay && hour >= WORK_END) {
        const tomorrow = WORK_DAYS.includes((dow + 1) % 7) ? "tomorrow" : "Monday";
        nextOnline = `${tomorrow} at 9:00 AM`;
      }
      // weekend: default "Monday" is fine
    }

    return { online, nextOnline };
  } catch {
    // Fallback — treat as always online if Intl fails
    return { online: true, nextOnline: "soon" };
  }
}

type Step = "closed" | "open" | "sending" | "done";

export function ContactWidget() {
  const [step, setStep]     = useState<Step>("closed");
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [unread, setUnread] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useLanguage();

  // Recompute presence every minute so it updates live
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(n => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);
  const { online, nextOnline } = useMemo(() => getPresence(), [tick]); // eslint-disable-line react-hooks/exhaustive-deps

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

  function handleOpen()  { setStep("open"); setUnread(false); }
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
            {/* ── Panel header ── */}
            <div className="bg-primary px-5 py-4 flex items-start justify-between">
              <div className="flex items-start gap-3">
                {/* Avatar with presence dot */}
                <div className="relative flex-shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center font-serif text-primary-foreground text-sm font-medium">
                    S
                  </div>
                  {/* Presence dot on avatar */}
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-primary ${
                    online ? "bg-emerald-400" : "bg-muted-foreground/60"
                  }`} />
                </div>

                <div>
                  <p className="text-primary-foreground font-serif text-base font-light leading-tight">
                    {t.contact.panel_title}
                  </p>
                  {/* Dynamic status line */}
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {online ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                        <p className="text-primary-foreground/80 text-xs">Online now · usually replies in minutes</p>
                      </>
                    ) : (
                      <>
                        <Clock size={10} className="text-primary-foreground/60 flex-shrink-0" />
                        <p className="text-primary-foreground/70 text-xs">
                          Away · back {nextOnline}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors mt-0.5 flex-shrink-0"
                data-testid="button-chat-close"
                aria-label={t.common.close}
              >
                <X size={18} />
              </button>
            </div>

            {/* Offline banner */}
            {!online && step !== "done" && (
              <div className="bg-amber-50 border-b border-amber-100 px-4 py-2.5 flex items-center gap-2">
                <Clock size={12} className="text-amber-600 flex-shrink-0" />
                <p className="text-xs text-amber-700 leading-snug">
                  Sophia is away but will reply as soon as possible — leave your message below.
                </p>
              </div>
            )}

            {/* ── Panel body ── */}
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
                      {t.contact.success_body}{" "}
                      <span className="text-foreground font-medium">{email}</span>{" "}
                      {t.contact.success_body2}
                    </p>
                    {!online && (
                      <p className="text-xs text-muted-foreground bg-secondary/40 rounded-lg px-3 py-2">
                        Sophia is currently away and will reply when she returns {nextOnline}.
                      </p>
                    )}
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
                        {online ? t.contact.form_label : "Leave a message"}
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
                            : <><Send size={14} className="mr-2" />{online ? t.contact.send : "Leave message"}</>
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

      {/* ── Trigger button ── */}
      <div className="relative">
        {/* Pulsing ring — online only, closed state */}
        {online && step === "closed" && (
          <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400/30 pointer-events-none" />
        )}

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
              <motion.div key="close"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <ChevronDown size={22} />
              </motion.div>
            ) : (
              <motion.div key="open"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <MessageCircle size={22} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread badge — shown only when there's a new message prompt */}
          <AnimatePresence>
            {unread && step === "closed" && (
              <motion.span
                key="dot"
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive border-2 border-card"
              />
            )}
          </AnimatePresence>

          {/* Presence dot on button */}
          <AnimatePresence>
            {step === "closed" && (
              <motion.span
                key="presence"
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-card ${
                  online ? "bg-emerald-400" : "bg-muted-foreground/60"
                }`}
              />
            )}
          </AnimatePresence>
        </motion.button>

        {/* "Sophia is online" / "Leave a message" label beside button — closed state only */}
        <AnimatePresence>
          {step === "closed" && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25, delay: 0.5 }}
              className="absolute left-16 bottom-3 whitespace-nowrap pointer-events-none"
            >
              <div className={`text-xs font-medium px-2.5 py-1 rounded-full shadow-sm border ${
                online
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-muted text-muted-foreground border-border"
              }`}>
                {online ? "Sophia is online" : "Leave a message"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
