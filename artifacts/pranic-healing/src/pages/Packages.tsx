import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, Sparkles, Star, Zap, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchPackages, fetchSiteSettings } from "@/lib/sanity";

/* ── Package data ─────────────────────────────────────────────── */
interface Package {
  id: string;
  badge?: string;
  badgeColor?: string;
  name: string;
  tagline: string;
  sessions: number;
  duration: string;
  priceNote: string;
  savingsNote?: string;
  bestFor: string;
  includes: string[];
  cta: string;
  highlighted: boolean;
}

const FALLBACK_PACKAGES: Package[] = [
  {
    id: "single",
    name: "Single Session",
    tagline: "Your first step into pranic healing",
    sessions: 1,
    duration: "60 min",
    priceNote: "Pricing coming soon",
    bestFor: "First-time clients who want to experience pranic healing before committing to a programme.",
    includes: [
      "Full 60-minute individual healing session",
      "Aura scanning at the start and close",
      "Post-session energy maintenance guidance",
      "Written session notes emailed to you",
    ],
    cta: "Book a Single Session",
    highlighted: false,
  },
  {
    id: "starter",
    badge: "Most Popular",
    badgeColor: "primary",
    name: "Starter Pack",
    tagline: "Three sessions — begin the shift",
    sessions: 3,
    duration: "3 × 60 min",
    priceNote: "Pricing coming soon",
    savingsNote: "Save vs. individual sessions",
    bestFor: "Clients dealing with a specific issue — physical pain, stress, grief — who want to see meaningful, lasting results.",
    includes: [
      "Three individual 60-minute sessions",
      "Full aura scan at each visit",
      "Personalised chakra balancing plan",
      "Post-session guidance after every session",
      "Priority scheduling for all three bookings",
      "Written progress notes emailed to you",
    ],
    cta: "Book the Starter Pack",
    highlighted: true,
  },
  {
    id: "journey",
    badge: "Best Value",
    badgeColor: "amber",
    name: "Deep Healing Journey",
    tagline: "Six sessions — sustained transformation",
    sessions: 6,
    duration: "6 × 60 min",
    priceNote: "Pricing coming soon",
    savingsNote: "Greatest saving per session",
    bestFor: "Clients committed to deep, sustained healing — chronic conditions, long-term stress patterns, or full energetic renewal.",
    includes: [
      "Six individual 60-minute sessions",
      "One 30-minute Aura Scanning & Analysis",
      "One 90-minute Chakra Balancing Intensive",
      "Personalised healing protocol across all sessions",
      "Priority scheduling and early access to new slots",
      "Detailed progress report after session 3 and 6",
      "Direct WhatsApp support between sessions",
      "Meditation and self-care resource library",
    ],
    cta: "Book the Deep Healing Journey",
    highlighted: false,
  },
  {
    id: "transformation",
    name: "Complete Transformation",
    tagline: "Ten sessions — a full energetic reset",
    sessions: 10,
    duration: "10 × 60 min",
    priceNote: "Pricing coming soon",
    savingsNote: "Maximum saving — best per-session rate",
    bestFor: "Clients seeking a complete energetic overhaul — long-standing physical ailments, deep emotional release, or profound spiritual growth.",
    includes: [
      "Ten individual 60-minute sessions",
      "Two 30-minute Aura Scanning & Analysis sessions",
      "Two 90-minute Chakra Balancing Intensives",
      "Full intake review and bespoke healing roadmap",
      "Highest-priority scheduling — your slots reserved first",
      "Detailed progress report after sessions 3, 6, and 10",
      "Unlimited WhatsApp support between sessions",
      "Personalised meditation audio recording",
      "Complimentary 15-min check-in call one month after completion",
    ],
    cta: "Book the Transformation",
    highlighted: false,
  },
];

function mapSanityToPackage(p: ReturnType<typeof Object.create>): Package {
  return {
    id: p.packageId || p._id,
    name: p.name,
    tagline: p.tagline,
    sessions: p.sessions,
    duration: p.duration,
    priceNote: p.price || "Pricing coming soon",
    savingsNote: p.savingsNote,
    bestFor: p.bestFor,
    includes: p.includes || [],
    highlighted: p.highlighted || false,
    badge: p.badge,
    badgeColor: p.badgeColor,
    cta: `Book ${p.name}`,
  };
}

/* ── Component ───────────────────────────────────────────────── */
export default function Packages() {
  const [packages, setPackages] = useState<Package[]>(FALLBACK_PACKAGES);
  const [contactPhone, setContactPhone] = useState("(805) 555-0123");
  const [contactEmail, setContactEmail] = useState("rosalyn@zenenergetics.com");

  useEffect(() => {
    fetchPackages().then((data) => {
      if (data.length > 0) setPackages(data.map(mapSanityToPackage));
    });
    fetchSiteSettings().then((s) => {
      if (s?.contactPhone) setContactPhone(s.contactPhone);
      if (s?.contactEmail) setContactEmail(s.contactEmail);
    });
  }, []);

  return (
    <div className="flex flex-col items-center w-full bg-background pb-24">

      {/* Header */}
      <section className="w-full py-16 pt-28 border-b bg-gradient-to-b from-secondary/50 to-secondary/10">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
            Session Packages
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-5">
            Choose Your Healing Path
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground font-light leading-relaxed">
            Every journey is different. Whether you are taking your first step or committing to deep transformation, there is a package designed for where you are right now.
          </motion.p>

          {/* Pricing notice */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 mt-6 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-4 py-2 rounded-full">
            <Tag size={12} />
            Pricing will be added shortly — all packages are available to enquire about now.
          </motion.div>
        </div>
      </section>

      {/* Package grid */}
      <div className="container mx-auto px-4 md:px-6 py-16 max-w-6xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Comparison note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 rounded-2xl bg-secondary/20 border border-secondary/40 px-8 py-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: <Zap size={22} className="text-primary" />,
                title: "All sessions include",
                items: ["Full aura scan", "Chakra assessment", "Post-session guidance", "Written session notes"],
              },
              {
                icon: <Star size={22} className="text-amber-500" />,
                title: "Why a package?",
                items: [
                  "Energy healing builds on itself — each session deepens the last",
                  "Packages ensure continuity and lasting results",
                  "You receive better value and dedicated priority care",
                ],
              },
              {
                icon: <Sparkles size={22} className="text-primary" />,
                title: "Not sure which to choose?",
                items: [
                  "Book a single session first to experience the work",
                  "Or contact Rosalyn directly — she will recommend the right fit for your needs",
                ],
              },
            ].map(({ icon, title, items }) => (
              <div key={title} className="space-y-3">
                <div className="flex justify-center">{icon}</div>
                <h4 className="font-serif text-base font-medium text-foreground">{title}</h4>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground leading-snug">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
          className="mt-10 text-center"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Have questions before choosing? Rosalyn is happy to help you pick the right path.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href={`tel:${contactPhone.replace(/\D/g, "")}`}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {contactPhone}
            </a>
            <span className="text-border">·</span>
            <a href={`mailto:${contactEmail}`}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {contactEmail}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Package card ─────────────────────────────────────────────── */
function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const isAmber = pkg.badgeColor === "amber";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-2xl border overflow-hidden transition-shadow hover:shadow-lg ${
        pkg.highlighted
          ? "border-primary/40 shadow-md ring-2 ring-primary/15"
          : "border-border/60 shadow-sm"
      }`}
    >
      {/* Badge */}
      {pkg.badge && (
        <div className={`absolute top-0 inset-x-0 text-center py-1.5 text-[11px] font-semibold uppercase tracking-widest ${
          isAmber
            ? "bg-amber-400 text-amber-900"
            : "bg-primary text-primary-foreground"
        }`}>
          {pkg.badge}
        </div>
      )}

      {/* Card header */}
      <div className={`px-6 pt-${pkg.badge ? "10" : "6"} pb-5 ${
        pkg.highlighted ? "bg-primary/5" : "bg-secondary/10"
      }`}>
        {/* Session count pill */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
            pkg.highlighted
              ? "bg-primary/15 text-primary"
              : isAmber
              ? "bg-amber-100 text-amber-700"
              : "bg-secondary text-muted-foreground"
          }`}>
            {pkg.sessions === 1 ? "1 session" : `${pkg.sessions} sessions`}
            {" · "}
            {pkg.duration}
          </span>
        </div>

        <h3 className="font-serif text-xl font-medium text-foreground mb-1">{pkg.name}</h3>
        <p className="text-sm text-muted-foreground leading-snug">{pkg.tagline}</p>

        {/* Price placeholder */}
        <div className="mt-5 mb-1">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-light text-foreground/30">—</span>
            <span className="text-xs text-muted-foreground/60 italic">pricing coming soon</span>
          </div>
          {pkg.savingsNote && (
            <p className={`text-xs font-medium mt-1 ${isAmber ? "text-amber-600" : "text-primary"}`}>
              {pkg.savingsNote}
            </p>
          )}
        </div>
      </div>

      {/* Best for */}
      <div className="px-6 py-4 border-t border-border/40 bg-background/50">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">Best for</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{pkg.bestFor}</p>
      </div>

      {/* Includes */}
      <div className="px-6 py-5 flex-1 space-y-2.5 border-t border-border/40 bg-background">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">What's included</p>
        {pkg.includes.map((item) => (
          <div key={item} className="flex items-start gap-2.5">
            <CheckCircle2 size={14} className={`flex-shrink-0 mt-0.5 ${
              pkg.highlighted ? "text-primary" : "text-muted-foreground/60"
            }`} />
            <span className="text-sm text-foreground/80 leading-snug">{item}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 pb-6 pt-4 border-t border-border/40 bg-background">
        <Link href="/book">
          <Button
            className={`w-full rounded-xl ${
              pkg.highlighted
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                : "bg-secondary/60 text-foreground hover:bg-secondary/80 border border-border/60"
            }`}
            data-testid={`button-book-package-${pkg.id}`}
          >
            {pkg.cta}
            <ArrowRight size={14} className="ml-2" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
