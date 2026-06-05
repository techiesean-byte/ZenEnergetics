import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

/* ── Question config ─────────────────────────────────────────────── */
export interface IntakeAnswers {
  concern: string;
  duration: string;
  priorHealing: string;
  sessionType: string;
  referral: string;
  freeform: string;
}

const QUESTIONS: {
  id: keyof Omit<IntakeAnswers, "freeform">;
  label: string;
  hint: string;
  options: string[];
}[] = [
  {
    id: "concern",
    label: "What is your primary concern?",
    hint: "Choose the one that feels most pressing right now.",
    options: [
      "Physical pain or discomfort",
      "Emotional stress or overwhelm",
      "Anxiety or fear",
      "Grief or loss",
      "Chronic fatigue or low energy",
      "Relationship difficulties",
      "Spiritual growth or seeking",
      "General wellness and prevention",
    ],
  },
  {
    id: "duration",
    label: "How long have you been experiencing this?",
    hint: "An approximate timeframe helps us prepare the right approach.",
    options: [
      "Less than 1 month",
      "1 to 6 months",
      "6 months to 2 years",
      "More than 2 years",
      "It comes and goes",
      "I'm not sure",
    ],
  },
  {
    id: "priorHealing",
    label: "Have you received energy healing before?",
    hint: "This helps us set the right expectations for your session.",
    options: [
      "No — this is my first time",
      "Yes — Pranic Healing specifically",
      "Yes — Reiki or another modality",
      "Yes — multiple different modalities",
      "I've tried self-practice (meditation, breathwork, etc.)",
    ],
  },
  {
    id: "sessionType",
    label: "What type of session are you considering?",
    hint: "In-person and distance healing are equally effective.",
    options: [
      "In-person session",
      "Distance / remote session",
      "Either works for me",
      "I'd like a recommendation",
    ],
  },
  {
    id: "referral",
    label: "How did you hear about us?",
    hint: "We're grateful for every path that led you here.",
    options: [
      "Search engine (Google, Bing, etc.)",
      "Social media",
      "Friend or family referral",
      "Existing or former client",
      "Online article or blog",
      "Other",
    ],
  },
];

const MAX_CHARS = 1000;

/* ── Component ──────────────────────────────────────────────────── */
interface Props {
  onComplete: (answers: IntakeAnswers) => void;
}

export function IntakeQuestionnaire({ onComplete }: Props) {
  const [answers, setAnswers] = useState<IntakeAnswers>({
    concern: "",
    duration: "",
    priorHealing: "",
    sessionType: "",
    referral: "",
    freeform: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof IntakeAnswers, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const mandatoryKeys: (keyof Omit<IntakeAnswers, "freeform">)[] = [
    "concern", "duration", "priorHealing", "sessionType", "referral",
  ];

  const isComplete = mandatoryKeys.every((k) => answers[k] !== "");

  function set(key: keyof IntakeAnswers, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  function handleContinue() {
    setSubmitted(true);
    if (!isComplete) return;
    onComplete(answers);
  }

  function showError(key: keyof Omit<IntakeAnswers, "freeform">) {
    return (submitted || touched[key]) && answers[key] === "";
  }

  const charsLeft = MAX_CHARS - answers.freeform.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-6"
    >
      {/* Intro */}
      <div className="bg-gradient-to-r from-secondary/50 to-secondary/20 rounded-2xl px-6 py-5 border border-secondary/40">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-1">Before we begin</p>
        <h2 className="font-serif text-xl font-light text-foreground mb-1">
          A few questions to prepare your session
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your answers help Sophia understand your needs before you arrive, so every minute of your session is focused on you.
          Questions 1–5 are required; question 6 is optional.
        </p>
      </div>

      {/* Mandatory dropdowns */}
      {QUESTIONS.map((q, i) => {
        const error = showError(q.id);
        return (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="space-y-1.5"
          >
            <div className="flex items-start justify-between gap-2">
              <Label htmlFor={q.id} className="text-sm font-medium text-foreground leading-snug">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold mr-2 flex-shrink-0 align-middle">
                  {i + 1}
                </span>
                {q.label}
                <span className="ml-1.5 text-destructive">*</span>
              </Label>
            </div>
            {q.hint && (
              <p className="text-xs text-muted-foreground pl-7">{q.hint}</p>
            )}
            <div className="relative pl-7">
              <select
                id={q.id}
                value={answers[q.id]}
                onChange={(e) => set(q.id, e.target.value)}
                data-testid={`select-intake-${q.id}`}
                className={`
                  w-full appearance-none rounded-xl border bg-background px-4 py-3 pr-10 text-sm shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors
                  ${error
                    ? "border-destructive focus:ring-destructive/30 bg-destructive/5"
                    : answers[q.id]
                    ? "border-primary/40 bg-primary/5"
                    : "border-border"
                  }
                `}
              >
                <option value="" disabled>Select an answer…</option>
                {q.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-xs text-destructive pl-7"
              >
                Please select an answer to continue.
              </motion.p>
            )}
          </motion.div>
        );
      })}

      {/* Optional free-form field */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: QUESTIONS.length * 0.06 }}
        className="space-y-1.5"
      >
        <Label htmlFor="freeform" className="text-sm font-medium text-foreground">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-muted text-muted-foreground text-[10px] font-semibold mr-2 flex-shrink-0 align-middle">
            6
          </span>
          Is there anything else you'd like Sophia to know?
          <span className="ml-2 text-xs font-normal text-muted-foreground">(optional)</span>
        </Label>
        <p className="text-xs text-muted-foreground pl-7">
          Share any context, past experiences, or specific intentions for your session.
        </p>
        <div className="relative pl-7">
          <textarea
            id="freeform"
            value={answers.freeform}
            maxLength={MAX_CHARS}
            rows={5}
            data-testid="textarea-intake-freeform"
            onChange={(e) => set("freeform", e.target.value)}
            placeholder="e.g. I've been dealing with lower back pain since a car accident two years ago. I've tried physio but the tension keeps returning…"
            className={`
              w-full rounded-xl border border-border bg-background px-4 py-3 text-sm shadow-sm resize-none
              placeholder:text-muted-foreground/60
              focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-colors
              ${answers.freeform.length > 0 ? "border-primary/30" : ""}
            `}
          />
          {/* Character counter */}
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] text-muted-foreground">
              {answers.freeform.length > 0
                ? `${answers.freeform.length} character${answers.freeform.length === 1 ? "" : "s"} entered`
                : "Up to 1,000 characters"}
            </span>
            <span className={`text-[10px] font-medium tabular-nums ${
              charsLeft < 100 ? "text-amber-600" : charsLeft < 50 ? "text-destructive" : "text-muted-foreground"
            }`}>
              {charsLeft} remaining
            </span>
          </div>
        </div>
      </motion.div>

      {/* Validation summary */}
      {submitted && !isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          Please answer all 5 required questions before continuing.
        </motion.div>
      )}

      {/* CTA */}
      <div className="pt-2">
        <Button
          onClick={handleContinue}
          size="lg"
          className="w-full rounded-xl py-5 font-medium"
          data-testid="button-intake-continue"
        >
          Continue to Choose a Time <ArrowRight size={16} className="ml-2" />
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-3">
          Your answers are confidential and used only to prepare your session.
        </p>
      </div>
    </motion.div>
  );
}
