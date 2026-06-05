import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, CreditCard, Lock, Loader2, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AvailabilityWidget, SelectedSlot } from "@/components/AvailabilityWidget";

const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function toInputDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function Book() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-full bg-background px-4">
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
            Your session request has been received with gratitude. We will confirm your time within 24 hours and send preparation details.
          </p>
          <Button variant="outline" className="mt-8" onClick={() => window.location.href = "/"}>
            Return Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full bg-background pb-24">

      {/* Header */}
      <section className="w-full py-16 pt-28 border-b bg-gradient-to-b from-secondary/50 to-secondary/10">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-medium tracking-widest uppercase text-primary mb-3"
          >
            Reserve Your Session
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-4"
          >
            Begin Your Healing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground font-light"
          >
            Choose a time that works for you, then complete your details below.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl w-full">

        {/* ── Step 1: Pick a slot ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
              1
            </div>
            <div>
              <h2 className="font-serif text-xl font-light text-foreground">Choose a date & time</h2>
              <p className="text-xs text-muted-foreground">Select an open slot from the calendar below</p>
            </div>
            <CalendarDays size={18} className="text-primary ml-auto flex-shrink-0" />
          </div>
          <AvailabilityWidget selected={selectedSlot} onSelect={setSelectedSlot} />
        </motion.div>

        {/* ── Step 2: Fill in details ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 transition-colors ${
              selectedSlot ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              2
            </div>
            <div>
              <h2 className="font-serif text-xl font-light text-foreground">Your details</h2>
              <p className="text-xs text-muted-foreground">Tell us a little about yourself and what you're seeking</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Form */}
            <div className="lg:col-span-3 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Service + pre-filled slot */}
                <Card className="shadow-sm border-secondary/30">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">Session Details</CardTitle>
                    <CardDescription>What kind of healing are you seeking?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Type</Label>
                      <Select required>
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

                    {/* Date + time — pre-filled from slot picker */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          type="date"
                          id="date"
                          required
                          className="bg-background"
                          data-testid="input-date"
                          value={selectedSlot ? toInputDate(selectedSlot.date) : ""}
                          onChange={() => {}}
                          readOnly={!!selectedSlot}
                        />
                        {selectedSlot && (
                          <p className="text-xs text-primary">
                            {DAY_NAMES[selectedSlot.date.getDay()]}, {MONTH_NAMES[selectedSlot.date.getMonth()]} {selectedSlot.date.getDate()}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          required
                          className="bg-background"
                          data-testid="input-time"
                          value={selectedSlot ? selectedSlot.label : ""}
                          readOnly
                          placeholder="Select a slot above"
                        />
                        {selectedSlot && (
                          <p className="text-xs text-primary">{selectedSlot.label} — confirmed open</p>
                        )}
                      </div>
                    </div>

                    {!selectedSlot && (
                      <div className="rounded-xl bg-secondary/30 border border-secondary/40 px-4 py-3 text-sm text-muted-foreground flex items-center gap-2">
                        <CalendarDays size={15} className="text-primary flex-shrink-0" />
                        Please select a date and time in the calendar above.
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Personal Details */}
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
                    <div className="space-y-2">
                      <Label htmlFor="notes">What would you like help with? (optional)</Label>
                      <textarea
                        id="notes"
                        className="flex min-h-[90px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                        placeholder="Physical pain, emotional stress, general balancing..."
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Placeholder */}
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
                      <Label>Card Number</Label>
                      <Input placeholder="0000 0000 0000 0000" disabled />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2"><Label>Expiry</Label><Input placeholder="MM/YY" disabled /></div>
                      <div className="space-y-2"><Label>CVV</Label><Input placeholder="123" disabled /></div>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg py-6 rounded-full shadow-lg"
                  disabled={isSubmitting || !selectedSlot}
                  data-testid="button-submit-booking"
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Processing...</>
                  ) : !selectedSlot ? (
                    "Select a time slot to continue"
                  ) : (
                    "Request Session"
                  )}
                </Button>
                {!selectedSlot && (
                  <p className="text-center text-xs text-muted-foreground -mt-2">Choose an open slot in the calendar above to enable booking.</p>
                )}
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-secondary/20 rounded-2xl p-7 border border-secondary/40 sticky top-24">
                <h3 className="font-serif text-xl font-medium mb-5">What to Expect</h3>
                <ul className="space-y-4 text-muted-foreground text-sm">
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

                <hr className="my-5 border-secondary/40" />

                {/* Slot summary in sidebar */}
                <AnimatePresence>
                  {selectedSlot && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-5"
                    >
                      <div className="bg-primary/8 border border-primary/20 rounded-xl p-4 mb-5">
                        <p className="text-xs uppercase tracking-widest text-primary font-medium mb-1">Booked slot</p>
                        <p className="font-serif text-base text-foreground">
                          {DAY_NAMES[selectedSlot.date.getDay()]},{" "}
                          {MONTH_NAMES[selectedSlot.date.getMonth()]} {selectedSlot.date.getDate()}
                        </p>
                        <p className="text-sm text-muted-foreground">{selectedSlot.label}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-sm text-center text-muted-foreground">
                  <p>Questions before booking?</p>
                  <p className="mt-1 font-medium text-foreground">(555) 867-5309</p>
                  <p className="mt-0.5 font-medium text-foreground">harmony@pranichealing.co</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
