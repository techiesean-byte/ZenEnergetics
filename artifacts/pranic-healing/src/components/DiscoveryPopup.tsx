import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const DELAY_MS = 30_000;
const SESSION_KEY = "pranic-discovery-popup-dismissed";

export function DiscoveryPopup() {
  const [visible, setVisible] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  }

  function handleCta() {
    setBooked(true);
    sessionStorage.setItem(SESSION_KEY, "1");
    setTimeout(() => setVisible(false), 2800);
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed z-[70] inset-x-4 bottom-8 sm:inset-auto sm:bottom-10 sm:right-10 sm:left-auto sm:w-[420px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {booked ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card px-8 py-10 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center">
                    <CheckCircle2 size={28} className="text-primary" />
                  </div>
                  <p className="font-serif text-2xl font-light text-foreground">
                    You're on your way.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We'll see you on the booking page. Rosalyn will reach out within 24 hours to confirm your free call.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {/* Purple top strip */}
                  <div className="relative bg-gradient-to-br from-secondary via-secondary/80 to-primary/10 px-8 pt-8 pb-10">
                    {/* Close */}
                    <button
                      onClick={dismiss}
                      aria-label="Close"
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/40 hover:bg-background/70 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                    >
                      <X size={15} />
                    </button>

                    {/* Floating orb accent */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

                    <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
                      Complimentary — No Obligation
                    </p>
                    <h2 className="font-serif text-3xl font-light text-foreground leading-snug">
                      Book a Free<br />Discovery Call
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
                      Not sure if Pranic Healing is right for you? Let's talk — a no-pressure 20-minute call to answer your questions and explore how we can help.
                    </p>
                  </div>

                  {/* White content area */}
                  <div className="bg-card px-8 py-6">
                    {/* Perks */}
                    <ul className="space-y-2.5 mb-6">
                      {[
                        { icon: Clock, text: "20 minutes · completely free" },
                        { icon: Calendar, text: "Available in-person or via video call" },
                        { icon: CheckCircle2, text: "No commitment required — just a conversation" },
                      ].map(({ icon: Icon, text }) => (
                        <li key={text} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Icon size={15} className="text-primary flex-shrink-0 mt-0.5" />
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/book" className="flex-1" onClick={handleCta}>
                        <Button
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-5 font-medium"
                          data-testid="button-discovery-popup-cta"
                        >
                          Reserve My Spot <ArrowRight size={15} className="ml-2" />
                        </Button>
                      </Link>
                      <button
                        onClick={dismiss}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline flex-shrink-0"
                        data-testid="button-discovery-popup-dismiss"
                      >
                        Maybe later
                      </button>
                    </div>

                    {/* Social proof */}
                    <p className="text-center text-xs text-muted-foreground mt-4">
                      Joined by 1,500+ clients across 18 countries
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
