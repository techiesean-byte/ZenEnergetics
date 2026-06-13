import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* ── Types ──────────────────────────────────────────────────────── */
export interface IntakeAnswers {
  /* Client information */
  name: string;
  age: string;
  phone: string;
  cityState: string;
  email: string;
  occupation: string;

  /* History of present illness */
  chiefComplaint: string;
  onsetDate: string;
  labFindings: string;
  otherRelevant: string;
  complementaryModalities: "yes" | "no" | "";
  complementaryModsExplain: string;
  infectiousIllness: "yes" | "no" | "";
  infectiousIllnessExplain: string;

  /* Medications */
  meds: string[];

  /* Medical / social history */
  generalHealth: "poor" | "good" | "excellent" | "";
  diet: "regular" | "vegetarian" | "vegan" | "other" | "";
  dietOther: string;
  exercise: "yes" | "no" | "";
  exerciseDetail: string;
  hypertension: "yes" | "no" | "";
  gastrointestinal: "yes" | "no" | "";
  stressAnxiety: "yes" | "no" | "";
  pregnant: "yes" | "no" | "unknown" | "";
  cancer: "yes" | "no" | "";
  cancerDetail: string;
  historyExplain: string;
  additionalNotes: string;

  /* Disclaimer */
  disclaimerSigned: boolean;
  signaturePrint: string;

  /* kept for backward compatibility with Book.tsx slot/referral logic */
  concern: string;
  sessionType: string;
}

const EMPTY: IntakeAnswers = {
  name: "", age: "", phone: "", cityState: "", email: "", occupation: "",
  chiefComplaint: "", onsetDate: "", labFindings: "", otherRelevant: "",
  complementaryModalities: "", complementaryModsExplain: "",
  infectiousIllness: "", infectiousIllnessExplain: "",
  meds: ["", "", "", "", "", ""],
  generalHealth: "", diet: "", dietOther: "", exercise: "", exerciseDetail: "",
  hypertension: "", gastrointestinal: "", stressAnxiety: "",
  pregnant: "", cancer: "", cancerDetail: "",
  historyExplain: "", additionalNotes: "",
  disclaimerSigned: false, signaturePrint: "",
  concern: "", sessionType: "",
};

/* ── Small helpers ───────────────────────────────────────────────── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-primary/20 pb-2 mb-5">
      <p className="text-xs font-semibold tracking-widest uppercase text-primary">{children}</p>
    </div>
  );
}

function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-sm font-medium text-foreground">
        {label}{required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}

type YesNo = "yes" | "no" | "";
type YesNoUnknown = "yes" | "no" | "unknown" | "";

function YesNoToggle({ value, onChange, includeUnknown }: {
  value: YesNo | YesNoUnknown;
  onChange: (v: "yes" | "no" | "unknown") => void;
  includeUnknown?: boolean;
}) {
  const opts: { v: "yes" | "no" | "unknown"; label: string }[] = [
    { v: "yes", label: "Yes" },
    { v: "no", label: "No" },
    ...(includeUnknown ? [{ v: "unknown" as const, label: "Unknown" }] : []),
  ];
  return (
    <div className="flex gap-2 flex-wrap">
      {opts.map(({ v, label }) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
            value === v
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border bg-background text-foreground hover:border-primary/50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

const inputCls = "rounded-xl border border-border bg-background px-4 py-2.5 text-sm shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-colors placeholder:text-muted-foreground/60";
const textareaCls = inputCls + " resize-none";

/* ── Main component ──────────────────────────────────────────────── */
interface Props {
  onComplete: (answers: IntakeAnswers) => void;
}

export function IntakeQuestionnaire({ onComplete }: Props) {
  const [form, setForm] = useState<IntakeAnswers>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof IntakeAnswers>(key: K, value: IntakeAnswers[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }
  function setMed(i: number, value: string) {
    setForm(prev => {
      const meds = [...prev.meds];
      meds[i] = value;
      return { ...prev, meds };
    });
  }

  const required: (keyof IntakeAnswers)[] = [
    "name", "phone", "email", "chiefComplaint",
    "complementaryModalities", "infectiousIllness",
    "generalHealth", "diet", "exercise",
    "hypertension", "gastrointestinal", "stressAnxiety", "pregnant", "cancer",
    "disclaimerSigned", "signaturePrint",
  ];

  function isValid() {
    return required.every(k => {
      const v = form[k];
      if (typeof v === "boolean") return v === true;
      return v !== "" && v !== null && v !== undefined;
    });
  }

  function handleContinue() {
    setSubmitted(true);
    if (!isValid()) {
      const el = document.getElementById("intake-error");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    // derive backward-compat fields
    const derived: IntakeAnswers = {
      ...form,
      concern: form.chiefComplaint.slice(0, 80),
      sessionType: "",
    };
    onComplete(derived);
  }

  function err(key: keyof IntakeAnswers) {
    if (!submitted) return false;
    const v = form[key];
    if (typeof v === "boolean") return !v;
    return v === "" || v === null || v === undefined;
  }

  const ring = (key: keyof IntakeAnswers) =>
    err(key) ? "border-destructive focus:ring-destructive/30 bg-destructive/5" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary/50 to-secondary/20 rounded-2xl px-6 py-5 border border-secondary/40">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck size={15} className="text-primary" />
          <p className="text-xs font-medium tracking-widest uppercase text-primary">Confidential</p>
        </div>
        <h2 className="font-serif text-xl font-light text-foreground mb-1">Pranic Healing Intake Form</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your information is strictly confidential and used only to prepare your healing session.
          Fields marked <span className="text-destructive font-medium">*</span> are required.
        </p>
      </div>

      {/* ── Section 1: Client Information ── */}
      <div className="space-y-4">
        <SectionHeading>Client Information</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name" required>
            <input
              value={form.name} onChange={e => set("name", e.target.value)}
              placeholder="Jane Doe" className={`${inputCls} ${ring("name")}`}
              data-testid="intake-name"
            />
          </Field>
          <Field label="Age">
            <input
              type="number" min={1} max={120}
              value={form.age} onChange={e => set("age", e.target.value)}
              placeholder="35" className={inputCls}
            />
          </Field>
          <Field label="Phone Number" required>
            <input
              type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
              placeholder="(805) 555-0123" className={`${inputCls} ${ring("phone")}`}
              data-testid="intake-phone"
            />
          </Field>
          <Field label="City & State">
            <input
              value={form.cityState} onChange={e => set("cityState", e.target.value)}
              placeholder="Paso Robles, CA" className={inputCls}
            />
          </Field>
          <Field label="Email Address" required>
            <input
              type="email" value={form.email} onChange={e => set("email", e.target.value)}
              placeholder="jane@example.com" className={`${inputCls} ${ring("email")}`}
              data-testid="intake-email"
            />
          </Field>
          <Field label="Occupation">
            <input
              value={form.occupation} onChange={e => set("occupation", e.target.value)}
              placeholder="e.g. Teacher" className={inputCls}
            />
          </Field>
        </div>
      </div>

      {/* ── Section 2: History of Present Illness ── */}
      <div className="space-y-4">
        <SectionHeading>History of Present Illness</SectionHeading>

        <Field label="Reason for Visit / Chief Complaint" required hint="Describe the primary concern that brings you here today.">
          <textarea
            rows={3} value={form.chiefComplaint} onChange={e => set("chiefComplaint", e.target.value)}
            placeholder="e.g. Persistent lower back pain for the past two years…"
            className={`${textareaCls} ${ring("chiefComplaint")}`}
            data-testid="intake-chief-complaint"
          />
        </Field>

        <Field label="Date of Injury or Onset of Symptoms">
          <input
            type="date" value={form.onsetDate} onChange={e => set("onsetDate", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Pertinent Lab / X-ray / Other Findings" hint="List any recent test results that may be relevant.">
          <input
            value={form.labFindings} onChange={e => set("labFindings", e.target.value)}
            placeholder="e.g. MRI showed L4-L5 disc bulge" className={inputCls}
          />
        </Field>

        <Field label="Other Relevant Information">
          <input
            value={form.otherRelevant} onChange={e => set("otherRelevant", e.target.value)}
            placeholder="Any additional context…" className={inputCls}
          />
        </Field>

        <Field
          label="Are you currently practicing or receiving any complementary or alternative modalities?"
          required
        >
          <YesNoToggle value={form.complementaryModalities} onChange={v => set("complementaryModalities", v as "yes" | "no")} />
          {err("complementaryModalities") && (
            <p className="text-xs text-destructive mt-1">Please select Yes or No.</p>
          )}
          {form.complementaryModalities === "yes" && (
            <input
              value={form.complementaryModsExplain} onChange={e => set("complementaryModsExplain", e.target.value)}
              placeholder="Please explain…" className={`${inputCls} mt-2`}
            />
          )}
        </Field>

        <Field label="Have you recently been diagnosed with any infectious illness?" required>
          <YesNoToggle value={form.infectiousIllness} onChange={v => set("infectiousIllness", v as "yes" | "no")} />
          {err("infectiousIllness") && (
            <p className="text-xs text-destructive mt-1">Please select Yes or No.</p>
          )}
          {form.infectiousIllness === "yes" && (
            <input
              value={form.infectiousIllnessExplain} onChange={e => set("infectiousIllnessExplain", e.target.value)}
              placeholder="Please explain…" className={`${inputCls} mt-2`}
            />
          )}
        </Field>
      </div>

      {/* ── Section 3: Medications & Supplements ── */}
      <div className="space-y-4">
        <SectionHeading>Medications and Supplements</SectionHeading>
        <p className="text-xs text-muted-foreground -mt-2">List up to six current medications or supplements.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {form.meds.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground w-4 flex-shrink-0">{i + 1}</span>
              <input
                value={m} onChange={e => setMed(i, e.target.value)}
                placeholder={`Medication or supplement ${i + 1}`}
                className={inputCls}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 4: Medical / Social History ── */}
      <div className="space-y-5">
        <SectionHeading>Medical, Surgical and Social History</SectionHeading>

        <Field label="Overall General Health" required>
          <div className="flex gap-2 flex-wrap">
            {(["poor", "good", "excellent"] as const).map(v => (
              <button key={v} type="button" onClick={() => set("generalHealth", v)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium capitalize transition-colors ${
                  form.generalHealth === v
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border bg-background hover:border-primary/50"
                }`}
              >{v}</button>
            ))}
          </div>
          {err("generalHealth") && <p className="text-xs text-destructive mt-1">Please select one.</p>}
        </Field>

        <Field label="Diet" required>
          <div className="flex gap-2 flex-wrap">
            {(["regular", "vegetarian", "vegan", "other"] as const).map(v => (
              <button key={v} type="button" onClick={() => set("diet", v)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium capitalize transition-colors ${
                  form.diet === v
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border bg-background hover:border-primary/50"
                }`}
              >{v}</button>
            ))}
          </div>
          {err("diet") && <p className="text-xs text-destructive mt-1">Please select one.</p>}
          {form.diet === "other" && (
            <input
              value={form.dietOther} onChange={e => set("dietOther", e.target.value)}
              placeholder="Please describe…" className={`${inputCls} mt-2`}
            />
          )}
        </Field>

        <Field label="Do you exercise regularly?" required>
          <YesNoToggle value={form.exercise} onChange={v => set("exercise", v as "yes" | "no")} />
          {err("exercise") && <p className="text-xs text-destructive mt-1">Please select Yes or No.</p>}
          {form.exercise === "yes" && (
            <input
              value={form.exerciseDetail} onChange={e => set("exerciseDetail", e.target.value)}
              placeholder="Type and frequency (e.g. Walking 30 min, 3× per week)" className={`${inputCls} mt-2`}
            />
          )}
        </Field>

        {/* Yes/No health conditions */}
        {([
          { key: "hypertension" as const,     label: "Hypertension" },
          { key: "gastrointestinal" as const, label: "Gastrointestinal issues (abdominal pain, vomiting, diarrhea)" },
          { key: "stressAnxiety" as const,    label: "Stress, anxiety, depression, or psychiatric conditions" },
        ]).map(({ key, label }) => (
          <Field key={key} label={label} required>
            <YesNoToggle value={form[key] as YesNo} onChange={v => set(key, v as "yes" | "no")} />
            {err(key) && <p className="text-xs text-destructive mt-1">Please select Yes or No.</p>}
          </Field>
        ))}

        <Field label="Are you pregnant?" required>
          <YesNoToggle value={form.pregnant} onChange={v => set("pregnant", v)} includeUnknown />
          {err("pregnant") && <p className="text-xs text-destructive mt-1">Please select an option.</p>}
        </Field>

        <Field label="Cancer" required>
          <YesNoToggle value={form.cancer} onChange={v => set("cancer", v as "yes" | "no")} />
          {err("cancer") && <p className="text-xs text-destructive mt-1">Please select Yes or No.</p>}
          {form.cancer === "yes" && (
            <input
              value={form.cancerDetail} onChange={e => set("cancerDetail", e.target.value)}
              placeholder="Type / location…" className={`${inputCls} mt-2`}
            />
          )}
        </Field>

        <Field label="If you answered Yes to any of the above, please explain" hint="You may leave this blank if you answered No to all.">
          <textarea
            rows={3} value={form.historyExplain} onChange={e => set("historyExplain", e.target.value)}
            placeholder="Additional details…" className={textareaCls}
          />
        </Field>

        <Field label="Additional Notes" hint="Any other relevant medical conditions or context you'd like to share.">
          <textarea
            rows={3} value={form.additionalNotes} onChange={e => set("additionalNotes", e.target.value)}
            placeholder="e.g. History of migraines, currently seeing a chiropractor…" className={textareaCls}
          />
        </Field>
      </div>

      {/* ── Section 5: Disclaimer ── */}
      <div className="space-y-4">
        <SectionHeading>Disclaimer and Consent</SectionHeading>
        <div className="bg-muted/40 rounded-xl border border-border px-5 py-4 text-xs text-muted-foreground leading-relaxed space-y-3">
          <p>
            I understand that Pranic Healing is not meant to replace conventional medicine but rather to complement it.
            If symptoms persist, a medical professional is to be consulted immediately.
          </p>
          <p>
            I hereby release the person(s) providing Pranic Healing and the Pranic Healing organization from any liability
            as a result of the services I received.
          </p>
          <p>
            The protected health information provided will be dealt with sensitively, in strict confidence, and may be
            disclosed or used for therapy and treatment purposes only with my consent.
          </p>
        </div>

        <label className={`flex items-start gap-3 cursor-pointer rounded-xl border p-4 transition-colors ${
          form.disclaimerSigned ? "border-primary/40 bg-primary/5" : err("disclaimerSigned") ? "border-destructive/50 bg-destructive/5" : "border-border"
        }`}>
          <input
            type="checkbox"
            checked={form.disclaimerSigned}
            onChange={e => set("disclaimerSigned", e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-primary flex-shrink-0"
            data-testid="intake-disclaimer"
          />
          <span className="text-sm text-foreground">
            I have read and agree to the disclaimer above.
            <span className="ml-1 text-destructive">*</span>
          </span>
        </label>
        {err("disclaimerSigned") && (
          <p className="text-xs text-destructive">You must agree to the disclaimer to continue.</p>
        )}

        <Field label="Print Name (Signature)" required>
          <input
            value={form.signaturePrint} onChange={e => set("signaturePrint", e.target.value)}
            placeholder="Type your full name as your signature"
            className={`${inputCls} ${ring("signaturePrint")}`}
            data-testid="intake-signature"
          />
        </Field>
      </div>

      {/* Validation summary */}
      {submitted && !isValid() && (
        <motion.div
          id="intake-error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          Please complete all required fields before continuing.
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
          Your information is confidential and used only to prepare your session.
        </p>
      </div>
    </motion.div>
  );
}
