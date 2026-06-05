import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Share2, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  senderName: string;
}

function makeCode(name: string): string {
  const slug = name.trim().toUpperCase().replace(/\s+/g, "").slice(0, 8) || "FRIEND";
  const rand = Math.floor(Math.random() * 900 + 100);
  return `${slug}${rand}`;
}

const BASE_URL = "https://pranichealing.co/book?ref=";

export function ReferralWidget({ senderName }: Props) {
  const code = useMemo(() => makeCode(senderName), [senderName]);
  const link = `${BASE_URL}${code}`;

  const firstName = senderName.split(" ")[0] || "a friend";

  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const whatsappText = encodeURIComponent(
    `${firstName} thought you might love this — Pranic Healing with Rosalyn Piza. Use my link for 25% off your first session: ${link}`
  );
  const emailSubject = encodeURIComponent("A gift for you — 25% off your first Pranic Healing session");
  const emailBody    = encodeURIComponent(
    `Hi,\n\nI recently booked a Pranic Healing session with Rosalyn Piza and wanted to share it with you.\n\nUse my personal link below and you'll receive 25% off your first session:\n\n${link}\n\nHope to see you there!\n${firstName}`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55 }}
      className="rounded-2xl border border-secondary/50 bg-gradient-to-br from-secondary/30 to-secondary/10 overflow-hidden shadow-sm"
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
          <Share2 size={18} />
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-0.5">Share the Healing</p>
          <h3 className="font-serif text-lg font-light text-foreground leading-snug">
            Know someone who could benefit?
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            Share your personal link — your friend receives{" "}
            <span className="font-semibold text-foreground">25% off their first session</span>, as a gift from you.
          </p>
        </div>
      </div>

      {/* Discount badge */}
      <div className="mx-6 mb-4">
        <div className="flex items-center gap-3 rounded-xl bg-primary/8 border border-primary/20 px-4 py-3">
          <div className="text-center flex-shrink-0">
            <p className="text-2xl font-bold text-primary leading-none">25%</p>
            <p className="text-[10px] font-medium text-primary/70 uppercase tracking-wide">off</p>
          </div>
          <div className="w-px h-8 bg-primary/20 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">First session discount</p>
            <p className="text-xs text-muted-foreground">Applied automatically when your friend uses your link</p>
          </div>
        </div>
      </div>

      {/* Referral link box */}
      <div className="px-6 mb-4 space-y-2">
        <p className="text-xs text-muted-foreground font-medium">Your personal referral link</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-mono text-muted-foreground truncate select-all">
            {link}
          </div>
          <button
            onClick={copyLink}
            data-testid="button-copy-referral"
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="flex items-center gap-1.5">
                  <Check size={14} /> Copied
                </motion.span>
              ) : (
                <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="flex items-center gap-1.5">
                  <Copy size={14} /> Copy
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground">
          Code: <span className="font-mono font-semibold text-foreground">{code}</span> — valid for 60 days, one use per friend.
        </p>
      </div>

      {/* Share shortcuts */}
      <div className="px-6 pb-6 space-y-2">
        <p className="text-xs text-muted-foreground font-medium">Or share directly via</p>
        <div className="flex gap-2">
          <a
            href={`https://wa.me/?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-share-whatsapp"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-medium text-foreground hover:bg-secondary/30 transition-colors"
          >
            <MessageCircle size={15} className="text-emerald-500" />
            WhatsApp
          </a>
          <a
            href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
            data-testid="button-share-email"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-medium text-foreground hover:bg-secondary/30 transition-colors"
          >
            <Mail size={15} className="text-primary" />
            Email
          </a>
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-medium text-foreground hover:bg-secondary/30 transition-colors"
          >
            <Copy size={15} className="text-muted-foreground" />
            Copy link
          </button>
        </div>
      </div>
    </motion.div>
  );
}
