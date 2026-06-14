import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("loading");
    setTimeout(() => { setStatus("success"); }, 1000);
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => { setStatus("idle"); setMessage(""); }, 400);
  }

  return (
    <>
      {/* Vertical tab — independently fixed, never moves */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="tab"
            initial={{ opacity: 0, x: 56 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 56 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(true)}
            aria-label="Open feedback"
            className="fixed right-0 z-50 bg-primary text-primary-foreground text-[11px] font-semibold tracking-widest uppercase px-2 py-4 rounded-l-lg shadow-lg hover:bg-primary/90 transition-colors cursor-pointer"
            style={{
              top: "50%",
              transform: "translateY(-50%) rotate(180deg)",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            Feedback
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel — independently fixed, slides in from the right */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: 320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 z-50 w-72 bg-background border border-border/60 rounded-l-2xl shadow-2xl overflow-hidden"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/40 bg-secondary/20">
              <div>
                <p className="font-medium text-sm text-foreground">Share your thoughts</p>
                <p className="text-xs text-muted-foreground mt-0.5">We read every message</p>
              </div>
              <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-5">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-3 py-4 text-center">
                    <CheckCircle2 size={32} className="text-primary" />
                    <p className="font-serif text-lg font-light text-foreground">Thank you.</p>
                    <p className="text-xs text-muted-foreground">Your feedback means a lot to Rosalyn.</p>
                    <Button size="sm" variant="outline" onClick={handleClose} className="mt-2 rounded-lg">
                      Close
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="What's on your mind? A question, suggestion, or how you found us..."
                      rows={4}
                      className="w-full text-sm px-3 py-2.5 rounded-lg border border-border bg-background outline-none focus:ring-1 focus:ring-primary transition-colors resize-none placeholder:text-muted-foreground/60"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="w-full rounded-lg"
                      disabled={!message.trim() || status === "loading"}
                    >
                      {status === "loading"
                        ? <Loader2 size={14} className="animate-spin" />
                        : "Send Feedback"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
