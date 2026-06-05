import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, CreditCard, Lock, Loader2, CalendarDays, ClipboardList, ChevronLeft } from "lucide-react";
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

  function handleIntakeComplete(answers: IntakeAnswers) {
    setIntake(answers);
    setStep("slot");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); }, 1500);
  }

  /* ── Success screen ── */
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-full bg-background px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="font-serif text-3xl font-medium text-foreground">Request Received</h1>
          {selectedSlot && (
            <div className="bg-secondary/30 rounded-2xl px-6 py-4 border border-secondary/50 text-left">
              <p className="text-xs uppercase tracking-widest text-primary font-medium mb-1">Your slot</p>
              <p className="font-serif text-lg text-foreground">
                {DAY_NAMES[selectedSlot.date.getDay()]}, {MONTH_NAMES[selectedSlot.date.getMonth()]} {selectedSlot.date.getDate()}
              </p>
              <p className="text-muted-foreground text-sm">{selectedSlot.label}</p>
            </div>
          )}
          <p className="text-muted-foreground text-lg leading-relaxed">
            Your session request has been received with gratitude. Sophia will review your intake answers and confirm your time within 24 hours.
          </p>
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            Return Home
          </Button>
        </motion.div>
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
                          <Input id="name" placeholder="Jane Doe" required className="bg-background" data-testid="input-name" />
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
