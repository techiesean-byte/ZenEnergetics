import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { usePageMeta } from "@/lib/usePageMeta";
import { CheckCircle2, Sparkles, Star, Zap, ArrowRight, Phone } from "lucide-react";
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
  price: string;
  perSession: string;
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
    tagline: "Experience pranic healing for the first time",
    sessions: 1,
    duration: "1 hour",
    price: "$90",
    perSession: "$90 per session",
    bestFor: "First-time clients who want to experience pranic healing before committing to a package.",
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
    id: "bundle-3",
    badge: "Most Popular",
    badgeColor: "primary",
    name: "3 Session Bundle",
    tagline: "Begin the shift — three sessions deep",
    sessions: 3,
    duration: "3 × 1 hour",
    price: "$240",
    perSession: "$80 per session",
    savingsNote: "Save $30 vs. single sessions",
    bestFor: "Clients dealing with a specific issue — physical pain, stress, or grief — who want meaningful, lasting results.",
    includes: [
      "Three individual 60-minute sessions",
      "Full aura scan at each visit",
      "Personalised chakra balancing plan",
      "Post-session guidance after every session",
      "Priority scheduling for all three bookings",
      "Written progress notes emailed to you",
    ],
    cta: "Book 3 Sessions",
    highlighted: true,
  },
  {
    id: "bundle-5",
    badge: "Best Value",
    badgeColor: "amber",
    name: "5 Session Bundle",
    tagline: "Sustained healing over five sessions",
    sessions: 5,
    duration: "5 × 1 hour",
    price: "$375",
    perSession: "$75 per session",
    savingsNote: "Save $75 vs. single sessions",
    bestFor: "Clients ready to commit to a deeper healing arc — ideal for chronic conditions and long-term stress patterns.",
    includes: [
      "Five individual 60-minute sessions",
      "Full aura scan at each visit",
      "Personalised healing protocol",
      "Post-session guidance after every session",
      "Priority scheduling for all five bookings",
      "Detailed progress notes throughout",
    ],
    cta: "Book 5 Sessions",
    highlighted: false,
  },
  {
    id: "bundle-10",
    name: "10 Session Bundle",
    tagline: "Deep transformation over ten sessions",
    sessions: 10,
    duration: "10 × 1 hour",
    price: "$700",
    perSession: "$70 per session",
    savingsNote: "Save $200 vs. single sessions",
    bestFor: "Clients committed to significant energetic renewal — chronic ailments, deep emotional release, or full system reset.",
    includes: [
      "Ten individual 60-minute sessions",
      "Full aura scan at each visit",
      "Bespoke healing roadmap",
      "Post-session guidance after every session",
      "Highest-priority scheduling",
      "Detailed progress report at sessions 3, 6, and 10",
      "Direct WhatsApp support between sessions",
    ],
    cta: "Book 10 Sessions",
    highlighted: false,
  },
  {
    id: "bundle-20",
    name: "20 Session Bundle",
    tagline: "A complete energetic overhaul",
    sessions: 20,
    duration: "20 × 1 hour",
    price: "$1,000",
    perSession: "$50 per session",
    savingsNote: "Save $800 vs. single sessions",
    bestFor: "Clients seeking long-term, transformational healing. The most powerful path to sustained energetic wellbeing.",
    includes: [
      "Twenty individual 60-minute sessions",
      "Full aura scan at each visit",
      "Full intake review and bespoke healing roadmap",
      "Highest-priority scheduling — your slots reserved first",
      "Detailed progress reports throughout",
      "Unlimited WhatsApp support between sessions",
      "Personalised meditation audio recording",
      "Complimentary 15-min check-in call one month after completion",
    ],
    cta: "Book 20 Sessions",
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
    price: p.price || "",
    perSession: p.perSession || "",
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
  usePageMeta({ title: "Session Packages & Pricing", description: "Affordable Pranic Healing session packages with Rosalyn Piza in Paso Robles, CA. Single sessions from $90, multi-session packages up to $1,000 with savings. Free consultation available." });
  const [packages, setPackages] = useState<Package[]>(FALLBACK_PACKAGES);
  const [contactPhone, setContactPhone] = useState("(805) 234-1108");
  const [contactEmail, setContactEmail] = useState("info@zenenergetics.org");

  useEffect(() => {
    fetchPackages().then((data) => {
      if (data.length > 0) {
        const mapped = data.map(mapSanityToPackage).filter(p => p.price);
        if (mapped.length > 0) setPackages(mapped);
      }
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
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12 max-w-6xl w-full space-y-10">

        {/* Free consultation banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-primary/25 bg-primary/5 px-6 py-5"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Phone size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">Free Phone Consultation — 15 minutes</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Not sure which package is right for you? Book a free call with Rosalyn first.
              </p>
            </div>
          </div>
          <a href={`tel:${contactPhone.replace(/\D/g, "")}`}>
            <Button variant="outline" size="sm" className="rounded-xl whitespace-nowrap border-primary/40 text-primary hover:bg-primary/10">
              Call {contactPhone}
            </Button>
          </a>
        </motion.div>

        {/* Package grid — top row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {packages.slice(0, 3).map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Package grid — bottom row: 2 cards centred */}
        {packages.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-3xl mx-auto w-full">
            {packages.slice(3).map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i + 3} />
            ))}
          </div>
        )}

        {/* Pay online banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5"
        >
          <div>
            <p className="font-medium text-emerald-900 text-sm">Ready to pay for your sessions?</p>
            <p className="text-xs text-emerald-700 mt-0.5">
              Secure online payment powered by QuickBooks — no account needed.
            </p>
          </div>
          <a
            href="https://connect.intuit.com/portal/app/CommerceNetwork/view/scs-v1-991b376a01f64641bfb01b70d4860be0eb84e60157ed4d9dbb9de1d6274d0da62fbc5f9b892c41478415149026867475?locale=EN_US&cta=paylinkbuybutton"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap shadow-sm"
          >
            Pay Now
          </a>
        </motion.div>

        {/* Comparison note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-2xl bg-secondary/20 border border-secondary/40 px-8 py-8"
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
                title: "Why a bundle?",
                items: [
                  "Energy healing builds on itself — each session deepens the last",
                  "Bundles ensure continuity and lasting results",
                  "You receive better value and dedicated priority care",
                ],
              },
              {
                icon: <Sparkles size={22} className="text-primary" />,
                title: "Not sure which to choose?",
                items: [
                  "Book a single session first to experience the work",
                  "Or call Rosalyn for a free 15-minute consultation",
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
          className="text-center"
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
      transition={{ duration: 0.5, delay: index * 0.08 }}
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

        {/* Price */}
        <div className="mt-5 mb-1">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-4xl font-light text-foreground">{pkg.price}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{pkg.perSession}</p>
          {pkg.savingsNote && (
            <p className={`text-xs font-medium mt-1.5 ${isAmber ? "text-amber-600" : "text-primary"}`}>
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
