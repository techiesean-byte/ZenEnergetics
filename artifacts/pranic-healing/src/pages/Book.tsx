import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, CreditCard, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Book() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
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
          <p className="text-muted-foreground text-lg leading-relaxed">
            Your session request has been received with gratitude. We will contact you within 24 hours to confirm your time and provide preparation details.
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
      <section className="w-full bg-muted/40 py-16 pt-28 border-b">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
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
            Schedule a session to cleanse, restore, and align your energy.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Form Section */}
          <div className="lg:col-span-3 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Session Details */}
              <Card className="shadow-sm border-primary/10">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Session Details</CardTitle>
                  <CardDescription>What kind of healing are you seeking?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input type="date" id="date" required className="bg-background" data-testid="input-date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select required>
                        <SelectTrigger id="time" data-testid="select-time">
                          <SelectValue placeholder="Select time of day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (1pm - 4pm)</SelectItem>
                          <SelectItem value="evening">Evening (5pm - 8pm)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Details */}
              <Card className="shadow-sm border-primary/10">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Jane Doe" required className="bg-background" data-testid="input-name" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input type="email" id="email" placeholder="jane@example.com" required className="bg-background" data-testid="input-email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input type="tel" id="phone" placeholder="(555) 123-4567" required className="bg-background" data-testid="input-phone" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Briefly describe what you'd like help with (optional)</Label>
                    <textarea 
                      id="notes" 
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Physical pain, emotional stress, general balancing..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Placeholder */}
              <Card className="shadow-sm border-primary/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-muted/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
                  <Lock className="w-10 h-10 text-muted-foreground mb-3" />
                  <h3 className="font-medium text-lg mb-1">Secure Payment</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Payment processing integration coming soon. You will not be charged to request a session today.
                  </p>
                </div>
                
                <CardHeader className="opacity-40">
                  <CardTitle className="font-serif text-2xl flex items-center gap-2">
                    <CreditCard size={24} /> Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 opacity-40 pointer-events-none">
                  <div className="space-y-2">
                    <Label>Card Number</Label>
                    <Input placeholder="0000 0000 0000 0000" disabled />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Expiry</Label>
                      <Input placeholder="MM/YY" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input placeholder="123" disabled />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-lg py-6 rounded-full shadow-lg" 
                disabled={isSubmitting}
                data-testid="button-submit-booking"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                  </>
                ) : (
                  "Request Session"
                )}
              </Button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 sticky top-24">
              <h3 className="font-serif text-2xl font-medium mb-6">What to Expect</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>A completely safe, no-touch healing method</span>
                </li>
                <li className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Confidential and professional environment</span>
                </li>
                <li className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Immediate sense of peace and lightness</span>
                </li>
                <li className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Customized guidance for post-session care</span>
                </li>
              </ul>
              
              <hr className="my-6 border-primary/10" />
              
              <div className="text-sm text-center text-muted-foreground">
                <p>Have questions before booking?</p>
                <p className="mt-1 font-medium text-foreground">Call us: (555) 867-5309</p>
                <p className="mt-1 font-medium text-foreground">Email: harmony@pranichealing.co</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
