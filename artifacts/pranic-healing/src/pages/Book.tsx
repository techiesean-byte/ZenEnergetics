import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, CalendarDays, ClipboardList, ChevronLeft } from "lucide-react";
import { IntakeQuestionnaire, IntakeAnswers } from "@/components/IntakeQuestionnaire";

type BookStep = "intake" | "schedule";

const STEP_META: Record<BookStep, { num: number; label: string; hint: string }> = {
  intake:   { num: 1, label: "About You",         hint: "A few questions to prepare your session" },
  schedule: { num: 2, label: "Choose a Time",      hint: "Pick a date and time that works for you" },
};
const STEPS: BookStep[] = ["intake", "schedule"];

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement | null;
        prefill?: { name?: string; email?: string };
      }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/rosalyngoodvibes/new-meeting";

export default function Book() {
  const [step, setStep]     = useState<BookStep>("intake");
  const [intake, setIntake] = useState<IntakeAnswers | null>(null);

  /* Load Calendly script and init the widget once we reach step 2 */
  useEffect(() => {
    if (step !== "schedule") return;

    function initWidget() {
      window.Calendly?.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: document.getElementById("calendly-container"),
        prefill: {
          name:  intake?.name  ?? "",
          email: intake?.email ?? "",
        },
      });
    }

    const existing = document.getElementById("calendly-script");
    if (existing) {
      // Script already present — init immediately (or wait a tick if still loading)
      if (window.Calendly) {
        initWidget();
      } else {
        existing.addEventListener("load", initWidget, { once: true });
      }
    } else {
      const s = document.createElement("script");
      s.id  = "calendly-script";
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      s.onload = initWidget;
      document.head.appendChild(s);
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleIntakeComplete(answers: IntakeAnswers) {
    setIntake(answers);
    setStep("schedule");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const currentIdx = STEPS.indexOf(step);

  return (
    <div className="flex flex-col items-center w-full bg-background pb-24">

      {/* Page header */}
      <section className="w-full py-16 pt-28 border-b bg-gradient-to-b from-secondary/50 to-secondary/10">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
            Reserve Your Session
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-4">
            Begin Your Healing
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground font-light">
            Two simple steps — a short intake, then pick your time. Done.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-10 max-w-5xl w-full">

        {/* Step progress */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-0 max-w-xs mx-auto">
            {STEPS.map((s, i) => {
              const meta   = STEP_META[s];
              const done   = currentIdx > i;
              const active = s === step;
              return (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1 min-w-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                      done    ? "bg-primary text-primary-foreground"
                      : active ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      :         "bg-muted text-muted-foreground"
                    }`}>
                      {done ? <CheckCircle2 size={15} /> : meta.num}
                    </div>
                    <span className={`text-[10px] font-medium whitespace-nowrap ${active ? "text-primary" : "text-muted-foreground"}`}>
                      {meta.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-px flex-1 mx-2 mb-4 transition-colors ${done ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
            {STEP_META[step].num}
          </div>
          <div>
            <h2 className="font-serif text-xl font-light text-foreground leading-tight">{STEP_META[step].label}</h2>
            <p className="text-xs text-muted-foreground">{STEP_META[step].hint}</p>
          </div>
          {step === "intake"   && <ClipboardList size={18} className="text-primary ml-auto flex-shrink-0" />}
          {step === "schedule" && <CalendarDays  size={18} className="text-primary ml-auto flex-shrink-0" />}
        </div>

        {/* Back link */}
        {step !== "intake" && (
          <button
            onClick={() => setStep("intake")}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft size={14} /> Back to intake questions
          </button>
        )}

        {/* Step panels */}
        <AnimatePresence mode="wait">

          {/* Step 1 — Intake */}
          {step === "intake" && (
            <motion.div key="intake"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}>
              <div className="max-w-2xl mx-auto">
                <IntakeQuestionnaire onComplete={handleIntakeComplete} />
              </div>
            </motion.div>
          )}

          {/* Step 2 — Calendly */}
          {step === "schedule" && (
            <motion.div key="schedule"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                {/* Calendly widget */}
                <div className="lg:col-span-3">
                  <div
                    id="calendly-container"
                    className="rounded-2xl overflow-hidden border border-border/40 shadow-sm"
                    style={{ minWidth: "320px", height: "700px" }}
                  />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-2">
                  <div className="bg-secondary/20 rounded-2xl p-7 border border-secondary/40 sticky top-24 space-y-5">

                    {/* Intake summary */}
                    {intake && (
                      <div className="bg-secondary/30 border border-secondary/40 rounded-xl px-4 py-4 space-y-2">
                        <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">Your intake</p>
                        {[
                          { label: "Name",         value: intake.name },
                          { label: "Concern",      value: intake.concern },
                          { label: "Session type", value: intake.sessionType },
                        ].filter(r => r.value).map(({ label, value }) => (
                          <div key={label}>
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
                            <p className="text-xs text-foreground leading-snug">{value}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <h3 className="font-serif text-lg font-medium">What to Expect</h3>
                    <ul className="space-y-3 text-muted-foreground text-sm">
                      {[
                        "A completely safe, no-touch healing method",
                        "Confidential and professional environment",
                        "Immediate sense of peace and lightness",
                        "Customised guidance for post-session care",
                      ].map((item) => (
                        <li key={item} className="flex gap-3">
                          <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <hr className="border-secondary/40" />
                    <p className="text-xs text-muted-foreground text-center">
                      You will receive a confirmation email from Calendly once your booking is complete.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
