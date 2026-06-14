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
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">

      {/* Vertical tab */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(true)}
            className="bg-primary text-primary-foreground text-[11px] font-semibold tracking-widest uppercase px-2 py-4 rounded-l-lg shadow-lg hover:bg-primary/90 transition-colors cursor-pointer"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
            aria-label="Open feedback"
          >
            Feedback
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-72 bg-background border border-border/60 rounded-l-2xl shadow-2xl overflow-hidden"
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
    </div>
  );
}
