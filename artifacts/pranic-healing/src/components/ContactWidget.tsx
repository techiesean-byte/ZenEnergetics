import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronDown, Clock, X, RotateCcw, ArrowLeft, Send, Loader2, CheckCircle2, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/* ── Presence ────────────────────────────────────────────────── */
const TIMEZONE  = "America/Toronto";
const WORK_START = 9;
const WORK_END   = 18;
const WORK_DAYS  = [1, 2, 3, 4, 5];

function getPresence(): { online: boolean; nextOnline: string } {
  try {
    const now   = new Date();
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: TIMEZONE, hour: "numeric", minute: "numeric",
      weekday: "short", hour12: false,
    }).formatToParts(now);

    const hour    = parseInt(parts.find(p => p.type === "hour")!.value);
    const weekday = parts.find(p => p.type === "weekday")!.value;
    const dowMap: Record<string, number> = { Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6 };
    const dow     = dowMap[weekday] ?? now.getDay();

    const online = WORK_DAYS.includes(dow) && hour >= WORK_START && hour < WORK_END;
    let nextOnline = "Monday at 9:00 AM";
    if (!online) {
      if (WORK_DAYS.includes(dow) && hour < WORK_START) nextOnline = "today at 9:00 AM";
      else if (WORK_DAYS.includes(dow) && hour >= WORK_END)
        nextOnline = `${WORK_DAYS.includes((dow+1)%7) ? "tomorrow" : "Monday"} at 9:00 AM`;
    }
    return { online, nextOnline };
  } catch {
    return { online: true, nextOnline: "soon" };
  }
}

/* ── FAQ data ────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "What is pranic healing?",
    a: "Pranic healing is a non-touch energy healing system that uses prana — or life force energy — to cleanse and revitalize the physical, emotional, and mental body. No physical contact is made during a session.",
  },
  {
    q: "How do I book a session?",
    a: "Click the 'Book Session' button at the top of the page to see available times and schedule your appointment directly.",
  },
  {
    q: "How much does a session cost?",
    a: "Pricing varies by session type and duration. Visit the Packages page for a full breakdown of what is included and current rates.",
  },
  {
    q: "Do you offer remote sessions?",
    a: "Yes! Remote pranic healing is just as effective as in-person work. Sessions are conducted at a scheduled time while you relax comfortably at home.",
  },
  {
    q: "What happens during a session?",
    a: "You remain fully clothed and simply relax. Rosalyn scans your energy field, removes congested or depleted energy, and replenishes your aura. Most clients feel deeply calm during and after.",
  },
  {
    q: "How many sessions will I need?",
    a: "This varies by person and condition. Some clients notice a significant shift after one session; others benefit from a short series. Rosalyn will advise you after your first visit.",
  },
  {
    q: "Is pranic healing safe?",
    a: "Pranic healing is completely safe and non-invasive. It is designed to complement — never replace — conventional medical care.",
  },
  {
    q: "Where are you located?",
    a: "Rosalyn is based in Paso Robles, CA and also works with clients worldwide via remote sessions.",
  },
];

/* ── Types ───────────────────────────────────────────────────── */
type PanelState = "closed" | "open";

interface Message {
  role: "bot" | "user";
  text: string;
}

const GREETING = "Hi! I am here to answer your questions about pranic healing and working with Rosalyn. What would you like to know?";

export function ContactWidget() {
  const [panel, setPanel]   = useState<PanelState>("closed");
  const [unread, setUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: GREETING }]);
  const [answered, setAnswered] = useState(false);
  const [view, setView] = useState<"faq" | "contact" | "sent">("faq");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [contactErrors, setContactErrors] = useState<{ firstName?: string; email?: string }>({});
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(n => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);
  const { online, nextOnline } = useMemo(() => getPresence(), [tick]); // eslint-disable-line

  useEffect(() => {
    if (panel === "open") {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
    }
  }, [messages, panel]);

  function handleOpen()  { setPanel("open"); setUnread(false); }
  function handleClose() { setPanel("closed"); }

  function handleQuestion(faq: typeof FAQS[0]) {
    setMessages(prev => [
      ...prev,
      { role: "user", text: faq.q },
    ]);
    setAnswered(false);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", text: faq.a }]);
      setAnswered(true);
    }, 600);
  }

  function handleReset() {
    setMessages([{ role: "bot", text: GREETING }]);
    setAnswered(false);
  }

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof contactErrors = {};
    if (!firstName.trim()) errs.firstName = "First name is required";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Valid email is required";
    setContactErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSending(true);
    setTimeout(() => { setSending(false); setView("sent"); }, 1400);
  }

  function handleBackToFaq() {
    setView("faq");
    setFirstName(""); setEmail(""); setContactErrors({});
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      style={{ touchAction: "none" }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      {/* ── Panel ── */}
      <AnimatePresence>
        {panel === "open" && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-80 rounded-2xl border border-border bg-card shadow-xl overflow-hidden flex flex-col"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="bg-primary px-5 py-4 flex items-start justify-between flex-shrink-0">
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center font-serif text-primary-foreground text-sm font-medium">
                    R
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-primary ${
                    online ? "bg-emerald-400" : "bg-muted-foreground/60"
                  }`} />
                </div>
                <div>
                  <p className="text-primary-foreground font-serif text-base font-light leading-tight">
                    {t.contact.panel_title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {online ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                        <p className="text-primary-foreground/80 text-xs">Online now</p>
                      </>
                    ) : (
                      <>
                        <Clock size={10} className="text-primary-foreground/60 flex-shrink-0" />
                        <p className="text-primary-foreground/70 text-xs">Away · back {nextOnline}</p>
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

            {/* Chat thread */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center font-serif text-primary text-xs font-medium flex-shrink-0 mr-2 mt-0.5">
                        R
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        msg.role === "bot"
                          ? "bg-secondary/60 text-foreground rounded-tl-sm"
                          : "bg-primary text-primary-foreground rounded-tr-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Bottom panel — FAQ questions, contact form, or sent confirmation */}
            <div className="flex-shrink-0 border-t border-border px-4 py-3 bg-background/60">
              <AnimatePresence mode="wait">

                {/* ── Sent confirmation ── */}
                {view === "sent" && (
                  <motion.div key="sent"
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    className="flex flex-col items-center text-center gap-2 py-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-primary" />
                    </div>
                    <p className="font-serif text-base font-light text-foreground">Message sent, {firstName}!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Rosalyn will get back to you at <span className="font-medium text-foreground">{email}</span> as soon as possible.
                    </p>
                    <button
                      onClick={handleBackToFaq}
                      className="mt-1 flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <RotateCcw size={11} /> Back to questions
                    </button>
                  </motion.div>
                )}

                {/* ── Contact form ── */}
                {view === "contact" && (
                  <motion.div key="contact"
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  >
                    <button
                      onClick={handleBackToFaq}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mb-3"
                    >
                      <ArrowLeft size={11} /> Back to questions
                    </button>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                      Send Rosalyn a message
                    </p>
                    <form onSubmit={handleContactSubmit} className="flex flex-col gap-2">
                      <div>
                        <input
                          type="text"
                          placeholder="First name"
                          value={firstName}
                          onChange={e => { setFirstName(e.target.value); setContactErrors(v => ({ ...v, firstName: undefined })); }}
                          className={`w-full text-sm px-3 py-2 rounded-lg border bg-background outline-none focus:ring-1 focus:ring-primary transition-colors ${contactErrors.firstName ? "border-destructive" : "border-border"}`}
                          data-testid="input-contact-firstname"
                        />
                        {contactErrors.firstName && <p className="text-xs text-destructive mt-1">{contactErrors.firstName}</p>}
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={e => { setEmail(e.target.value); setContactErrors(v => ({ ...v, email: undefined })); }}
                          className={`w-full text-sm px-3 py-2 rounded-lg border bg-background outline-none focus:ring-1 focus:ring-primary transition-colors ${contactErrors.email ? "border-destructive" : "border-border"}`}
                          data-testid="input-contact-email"
                        />
                        {contactErrors.email && <p className="text-xs text-destructive mt-1">{contactErrors.email}</p>}
                      </div>
                      <button
                        type="submit"
                        disabled={sending}
                        className="mt-1 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-medium py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70"
                        data-testid="button-contact-submit"
                      >
                        {sending
                          ? <Loader2 size={14} className="animate-spin" />
                          : <><Send size={13} /> Send message</>
                        }
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* ── FAQ quick replies ── */}
                {view === "faq" && (
                  <motion.div key="faq"
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    className="flex flex-col gap-2"
                  >
                    <p className="text-xs text-muted-foreground mb-0.5">
                      {answered ? "Ask another question" : "Common questions"}
                    </p>
                    <div className="flex flex-col gap-1.5 max-h-44 overflow-y-auto">
                      {FAQS.map(faq => (
                        <button
                          key={faq.q}
                          onClick={() => handleQuestion(faq)}
                          className="text-left text-xs px-3 py-2 rounded-lg border border-border bg-muted/50 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all duration-150"
                        >
                          {faq.q}
                        </button>
                      ))}
                    </div>

                    {/* Contact Rosalyn button */}
                    <button
                      onClick={() => setView("contact")}
                      className="mt-1 w-full flex items-center justify-center gap-1.5 text-xs font-medium text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 py-2 rounded-lg transition-colors"
                      data-testid="button-contact-rosalyn"
                    >
                      <Mail size={12} /> Contact Rosalyn
                    </button>

                    {messages.length > 1 && (
                      <button
                        onClick={handleReset}
                        className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                        data-testid="button-chat-reset"
                      >
                        <RotateCcw size={11} /> Start over
                      </button>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger button ── */}
      <div className="relative">
        {online && panel === "closed" && (
          <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400/30 pointer-events-none" />
        )}
        <motion.button
          onClick={panel === "closed" ? handleOpen : handleClose}
          data-testid="button-chat-toggle"
          aria-label={t.contact.panel_title}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-7 h-7 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {panel !== "closed" ? (
              <motion.div key="close"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <ChevronDown size={11} />
              </motion.div>
            ) : (
              <motion.div key="open"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <MessageCircle size={11} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {unread && panel === "closed" && (
              <motion.span
                key="dot"
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-destructive border border-card"
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {panel === "closed" && (
              <motion.span
                key="presence"
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-card ${
                  online ? "bg-emerald-400" : "bg-muted-foreground/60"
                }`}
              />
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}
