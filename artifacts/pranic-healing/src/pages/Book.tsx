import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, CreditCard, Lock, Loader2, CalendarDays, ClipboardList, ChevronLeft, Mail, MapPin, Phone, Clock3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AvailabilityWidget, SelectedSlot } from "@/components/AvailabilityWidget";
import { IntakeQuestionnaire, IntakeAnswers } from "@/components/IntakeQuestionnaire";

const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function toInputDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

type BookStep = "intake" | "slot" | "details";

const STEP_META: Record<BookStep, { num: number; label: string; hint: string }> = {
  intake:  { num: 1, label: "About You",          hint: "A few questions to prepare your session" },
  slot:    { num: 2, label: "Choose a Time",       hint: "Pick an available date and time slot" },
  details: { num: 3, label: "Your Details",        hint: "Complete your booking request" },
};
const STEPS: BookStep[] = ["intake", "slot", "details"];

export default function Book() {
  const [step, setStep] = useState<BookStep>("intake");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [intake, setIntake] = useState<IntakeAnswers | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [submittedName, setSubmittedName] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  function handleIntakeComplete(answers: IntakeAnswers) {
    setIntake(answers);
    setStep("slot");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmittedName(nameRef.current?.value ?? "");
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); }, 1500);
  }

  const firstName = submittedName.split(" ")[0] || "there";

  /* ── Success screen ── */
  if (isSubmitted) {
    const slotDayFull  = selectedSlot ? DAY_NAMES[selectedSlot.date.getDay()] : "";
    const slotMonthFull = selectedSlot ? MONTH_NAMES[selectedSlot.date.getMonth()] : "";
    const slotDateNum  = selectedSlot ? selectedSlot.date.getDate() : "";
    const slotYear     = selectedSlot ? selectedSlot.date.getFullYear() : "";

    return (
      <div className="w-full bg-background pb-24">
        <section className="w-full py-16 pt-28 border-b bg-gradient-to-b from-secondary/50 to-secondary/10 text-center">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary mb-5">
              <CheckCircle2 size={42} />
            </div>
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">All done</p>
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-3">
              Request Received
            </h1>
            <p className="text-muted-foreground text-lg font-light max-w-md mx-auto">
              Sophia will review your intake and send a confirmation to your inbox within 24 hours.
            </p>
          </motion.div>
        </section>

        <div className="container mx-auto px-4 md:px-6 py-12 max-w-2xl">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mb-4"
          >
            <Mail size={15} className="text-primary" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Preview of your confirmation email
            </p>
          </motion.div>

          {/* Email preview shell */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="rounded-2xl border border-border shadow-lg overflow-hidden bg-white"
          >
            {/* Email client chrome bar */}
            <div className="bg-muted/60 border-b border-border px-5 py-3 flex items-center gap-4">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400/70" />
                <span className="w-3 h-3 rounded-full bg-amber-400/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
              </div>
              <div className="flex-1 bg-background rounded-md px-3 py-1 text-xs text-muted-foreground border border-border truncate">
                harmony@pranichealing.co
              </div>
            </div>

            {/* Email meta header */}
            <div className="px-6 pt-5 pb-4 border-b border-border/60 space-y-1 bg-muted/20">
              <div className="flex items-baseline gap-3 text-sm">
                <span className="text-muted-foreground w-14 flex-shrink-0 text-xs uppercase tracking-wide">From</span>
                <span className="font-medium text-foreground">Pranic Healing — Sophia Laurent</span>
                <span className="text-muted-foreground text-xs ml-auto flex-shrink-0">&lt;harmony@pranichealing.co&gt;</span>
              </div>
              <div className="flex items-baseline gap-3 text-sm">
                <span className="text-muted-foreground w-14 flex-shrink-0 text-xs uppercase tracking-wide">Subject</span>
                <span className="font-medium text-foreground">Your Pranic Healing session request — we have received it</span>
              </div>
            </div>

            {/* Email body */}
            <div className="bg-[#f9f8ff]">

              {/* Brand header strip */}
              <div className="bg-gradient-to-r from-[#6b4fbb] to-[#9b7de0] px-8 py-8 text-white text-center">
                <p className="font-serif text-2xl font-light tracking-wide mb-0.5">Pranic Healing</p>
                <p className="text-white/70 text-xs tracking-widest uppercase">with Sophia Laurent</p>
              </div>

              {/* Body content */}
              <div className="px-8 py-8 space-y-6 text-[15px] leading-relaxed text-gray-700">

                <p>Dear <strong className="text-gray-900">{firstName}</strong>,</p>

                <p>
                  Thank you for reaching out. Your session request has been received with gratitude, and I look forward to supporting your healing journey.
                </p>

                {/* Session details card */}
                {selectedSlot && (
                  <div className="rounded-xl border border-purple-100 bg-white overflow-hidden shadow-sm">
                    <div className="bg-purple-50 px-5 py-3 border-b border-purple-100">
                      <p className="text-xs font-semibold uppercase tracking-widest text-purple-600">Session Request Details</p>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <CalendarDays size={15} className="text-purple-500 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                          <p className="font-semibold text-gray-900 text-sm">
                            {slotDayFull}, {slotMonthFull} {slotDateNum}, {slotYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock3 size={15} className="text-purple-500 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Time</p>
                          <p className="font-semibold text-gray-900 text-sm">{selectedSlot.label}</p>
                        </div>
                      </div>
                      {intake?.concern && (
                        <div className="flex items-start gap-3">
                          <Sparkles size={15} className="text-purple-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Primary concern</p>
                            <p className="font-semibold text-gray-900 text-sm">{intake.concern}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Next steps */}
                <div>
                  <p className="font-semibold text-gray-900 mb-3">What happens next</p>
                  <ol className="space-y-2.5">
                    {[
                      { step: "1", text: "I will review your intake answers and confirm your appointment by email within 24 hours." },
                      { step: "2", text: "You will receive a preparation guide — simple things to do the morning of your session." },
                      { step: "3", text: "Arrive (or connect remotely) a few minutes early, in comfortable clothing, well hydrated." },
                    ].map(({ step: n, text }) => (
                      <li key={n} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {n}
                        </span>
                        <span className="text-sm text-gray-600">{text}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Preparation tips */}
                <div className="rounded-xl bg-purple-50 border border-purple-100 px-5 py-4 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-2">Before your session</p>
                  {[
                    "Avoid eating a heavy meal within 1 hour of your session.",
                    "Wear loose, comfortable clothing in natural fabrics if possible.",
                    "Find a quiet space where you will not be disturbed for the duration.",
                    "Set a gentle intention — even simply 'I am open to healing' is enough.",
                  ].map((tip) => (
                    <div key={tip} className="flex items-start gap-2.5">
                      <CheckCircle2 size={13} className="text-purple-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600">{tip}</p>
                    </div>
                  ))}
                </div>

                <p>
                  If you have any questions in the meantime, please do not hesitate to reach out. I am here to help.
                </p>

                <p className="text-gray-900">
                  With light and gratitude,<br />
                  <strong>Sophia Laurent</strong><br />
                  <span className="text-gray-500 text-sm">Certified Pranic Healer</span>
                </p>
              </div>

              {/* Email footer */}
              <div className="border-t border-purple-100 bg-purple-50/50 px-8 py-5 text-center space-y-3">
                <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5"><Phone size={11} /> (555) 867-5309</span>
                  <span className="flex items-center gap-1.5"><Mail size={11} /> harmony@pranichealing.co</span>
                  <span className="flex items-center gap-1.5"><MapPin size={11} /> Montreal, QC</span>
                </div>
                <p className="text-[10px] text-gray-400">
                  You received this because you submitted a session request on pranichealing.co.<br />
                  <span className="underline cursor-pointer">Unsubscribe</span> · <span className="underline cursor-pointer">Privacy policy</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-muted-foreground mb-4">
              A real confirmation will land in your inbox once Sophia reviews your request.
            </p>
            <Button variant="outline" onClick={() => window.location.href = "/"}>
              Return Home
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentMeta = STEP_META[step];
  const currentIdx  = STEPS.indexOf(step);

  return (
    <div className="flex flex-col items-center w-full bg-background pb-24">

      {/* ── Page header ── */}
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
            Three simple steps — a short intake, a time slot, your details. Done.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-10 max-w-5xl w-full">

        {/* ── Step progress bar ── */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-0 max-w-sm mx-auto">
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

        {/* ── Step label ── */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
            {currentMeta.num}
          </div>
          <div>
            <h2 className="font-serif text-xl font-light text-foreground leading-tight">{currentMeta.label}</h2>
            <p className="text-xs text-muted-foreground">{currentMeta.hint}</p>
          </div>
          {step === "intake" && <ClipboardList size={18} className="text-primary ml-auto flex-shrink-0" />}
          {step === "slot"   && <CalendarDays  size={18} className="text-primary ml-auto flex-shrink-0" />}
        </div>

        {/* ── Back link ── */}
        {step !== "intake" && (
          <button
            onClick={() => setStep(step === "details" ? "slot" : "intake")}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft size={14} /> Back to {step === "details" ? "choose a time" : "intake questions"}
          </button>
        )}

        {/* ── Step panels ── */}
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

          {/* Step 2 — Slot */}
          {step === "slot" && (
            <motion.div key="slot"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}>
              <div className="max-w-2xl mx-auto space-y-6">
                <AvailabilityWidget selected={selectedSlot} onSelect={setSelectedSlot} />
                <Button
                  size="lg"
                  className="w-full rounded-xl py-5"
                  disabled={!selectedSlot}
                  onClick={() => selectedSlot && setStep("details")}
                  data-testid="button-slot-continue"
                >
                  {selectedSlot
                    ? <>Continue to Your Details <ChevronLeft size={15} className="ml-2 rotate-180" /></>
                    : "Select a slot to continue"}
                </Button>
                {!selectedSlot && (
                  <p className="text-center text-xs text-muted-foreground">
                    Tap any open or amber slot above to reserve it.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3 — Details */}
          {step === "details" && (
            <motion.div key="details"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                {/* Form */}
                <div className="lg:col-span-3 space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Session + pre-filled slot */}
                    <Card className="shadow-sm border-secondary/30">
                      <CardHeader>
                        <CardTitle className="font-serif text-xl">Session Details</CardTitle>
                        <CardDescription>Confirm your selected time and service type.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="service">Service Type</Label>
                          <Select required defaultValue={
                            intake?.sessionType?.toLowerCase().includes("distance") ? "distance" : undefined
                          }>
                            <SelectTrigger id="service" data-testid="select-service">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="individual">Individual Pranic Healing (60 min)</SelectItem>
                              <SelectItem value="distance">Distance Healing Session (45 min)</SelectItem>
                              <SelectItem value="aura">Aura Scanning & Analysis (30 min)</SelectItem>
                              <SelectItem value="chakra">Chakra Balancing Intensive (90 min)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input type="date" id="date" required className="bg-background" data-testid="input-date"
                              value={selectedSlot ? toInputDate(selectedSlot.date) : ""} readOnly onChange={() => {}} />
                            {selectedSlot && (
                              <p className="text-xs text-primary">
                                {DAY_NAMES[selectedSlot.date.getDay()]}, {MONTH_NAMES[selectedSlot.date.getMonth()]} {selectedSlot.date.getDate()}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <Input id="time" required className="bg-background" data-testid="input-time"
                              value={selectedSlot ? selectedSlot.label : ""} readOnly placeholder="—" />
                            {selectedSlot && <p className="text-xs text-primary">{selectedSlot.label} — confirmed open</p>}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Personal details */}
                    <Card className="shadow-sm border-secondary/30">
                      <CardHeader>
                        <CardTitle className="font-serif text-xl">Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" ref={nameRef} placeholder="Jane Doe" required className="bg-background" data-testid="input-name" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input type="email" id="email" placeholder="jane@example.com" required className="bg-background" data-testid="input-email" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input type="tel" id="phone" placeholder="(555) 123-4567" className="bg-background" data-testid="input-phone" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Payment placeholder */}
                    <Card className="shadow-sm border-secondary/30 relative overflow-hidden">
                      <div className="absolute inset-0 bg-muted/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
                        <Lock className="w-9 h-9 text-muted-foreground mb-3" />
                        <h3 className="font-medium text-lg mb-1">Secure Payment</h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          Payment processing coming soon. No charge to request a session today.
                        </p>
                      </div>
                      <CardHeader className="opacity-40">
                        <CardTitle className="font-serif text-xl flex items-center gap-2">
                          <CreditCard size={20} /> Payment Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-5 opacity-40 pointer-events-none">
                        <div className="space-y-2">
                          <Label>Card Number</Label><Input placeholder="0000 0000 0000 0000" disabled />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-2"><Label>Expiry</Label><Input placeholder="MM/YY" disabled /></div>
                          <div className="space-y-2"><Label>CVV</Label><Input placeholder="123" disabled /></div>
                        </div>
                      </CardContent>
                    </Card>

                    <Button type="submit" size="lg"
                      className="w-full text-lg py-6 rounded-full shadow-lg"
                      disabled={isSubmitting} data-testid="button-submit-booking">
                      {isSubmitting
                        ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Processing...</>
                        : "Request Session"}
                    </Button>
                  </form>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-secondary/20 rounded-2xl p-7 border border-secondary/40 sticky top-24 space-y-5">

                    {/* Slot summary */}
                    {selectedSlot && (
                      <div className="bg-primary/8 border border-primary/20 rounded-xl px-4 py-4">
                        <p className="text-xs uppercase tracking-widest text-primary font-medium mb-1">Your slot</p>
                        <p className="font-serif text-base text-foreground">
                          {DAY_NAMES[selectedSlot.date.getDay()]},{" "}
                          {MONTH_NAMES[selectedSlot.date.getMonth()]} {selectedSlot.date.getDate()}
                        </p>
                        <p className="text-sm text-muted-foreground">{selectedSlot.label}</p>
                      </div>
                    )}

                    {/* Intake summary */}
                    {intake && (
                      <div className="bg-secondary/30 border border-secondary/40 rounded-xl px-4 py-4 space-y-2">
                        <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">Intake summary</p>
                        {[
                          { label: "Concern",      value: intake.concern },
                          { label: "Duration",     value: intake.duration },
                          { label: "Session type", value: intake.sessionType },
                        ].map(({ label, value }) => (
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
                    <div className="text-sm text-center text-muted-foreground">
                      <p>Questions before booking?</p>
                      <p className="mt-1 font-medium text-foreground">(555) 867-5309</p>
                      <p className="mt-0.5 font-medium text-foreground">harmony@pranichealing.co</p>
                    </div>
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
