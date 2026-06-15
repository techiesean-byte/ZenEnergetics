import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Award, BookOpen, Heart, Leaf, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import healerImg from "../assets/healer-photo.jpeg";
import { usePageMeta } from "@/lib/usePageMeta";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const credentials = [
  { icon: Award, label: "Certified Pranic Healer", detail: "Institute for Inner Studies — Pranic Healing practitioner" },
  { icon: Leaf, label: "Non-Dualism", detail: "Deep study of non-dual philosophy as a path to inner clarity" },
  { icon: Heart, label: "Energy & Spiritual Modalities", detail: "Years of personal exploration across multiple healing traditions" },
  { icon: BookOpen, label: "Twin Hearts Meditation", detail: "Facilitator of this heart-centred meditation practice" },
  { icon: Star, label: "Pranic Crystal Healing", detail: "Working with crystals as energetic tools in session" },
  { icon: Award, label: "Continuing Education", detail: "Ongoing deepening of practice alongside professional life" },
];

const values = [
  {
    title: "Relaxation is a gateway.",
    body: "Before anything else, I want you to feel safe enough to let go. Relaxation is not a side effect of the session — it is the entry point. From that place, deeper work becomes possible.",
  },
  {
    title: "Energetic balance shapes everything.",
    body: "The way we feel, think, and move through the world is inseparable from our energetic state. When that balance is restored, things that felt heavy begin to lighten on their own.",
  },
  {
    title: "Non-dualism informs everything I do.",
    body: "My study of non-dual philosophy has taught me that separation is the root of most suffering. In our sessions I hold that understanding — that you are already whole, not something to be fixed.",
  },
  {
    title: "Life outside the healing room matters.",
    body: "I am an engineer by profession and spend my weekends at a winery. I understand what it means to hold many roles at once. Healing does not ask you to change your life — it asks you to show up in it more fully.",
  },
];

const timeline = [
  { year: "Early on", event: "Began exploring various healing and spiritual modalities — driven by personal curiosity and a desire to understand energy and inner experience." },
  { year: "Discovery", event: "Encountered Pranic Healing and immediately recognised its grounded, systematic approach to working with the body's energy field." },
  { year: "Deepening", event: "Pursued formal Pranic Healing certification and began a parallel study of non-dualism, finding the two paths deeply complementary." },
  { year: "Integration", event: "Continued building practice alongside a full-time career as a Water Utility Engineer for the City of Paso Robles, Central California." },
  { year: "Community", event: "Began offering sessions on weekends and special events, including at DENO Winery — bringing healing into everyday spaces." },
  { year: "Today", event: "Offering Pranic Healing sessions to help others find relaxation, energetic balance, and a deeper connection with their inner landscape." },
];

const FALLBACK_BIO1 = "Through years of exploring various healing and spiritual modalities, Rosalyn discovered Pranic Healing and non-dualism. These practices have become the foundation of her personal and professional life.";
const FALLBACK_BIO2 = "Based in Paso Robles, Central California, Rosalyn works full-time as a Water Utility Engineer for the City. On weekends and special events, she also works at DENO Winery — weaving her passion for healing into every corner of her life.";
const FALLBACK_QUOTE = "I'm looking forward to offering Pranic Healing sessions to help others find relaxation, energetic balance, and explore a deeper connection with one self's inner landscape — just as these practices have transformed my own life.";

export default function About() {
  usePageMeta({ title: "About Rosalyn Piza", description: "Meet Rosalyn Piza, certified Pranic Healer and founder of Zen Energetics in Paso Robles, CA. Dedicated to helping others through energy healing, non-dualism, and compassionate holistic care." });
  const [bio1, setBio1] = useState(FALLBACK_BIO1);
  const [bio2, setBio2] = useState(FALLBACK_BIO2);
  const [quote, setQuote] = useState(FALLBACK_QUOTE);

  useEffect(() => {
    import("@/lib/sanity").then(({ fetchAboutBio }) => {
      fetchAboutBio().then((data) => {
        if (data?.bio1) setBio1(data.bio1);
        if (data?.bio2) setBio2(data.bio2);
        if (data?.quote) setQuote(data.quote);
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* Hero — split layout */}
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <motion.div
          className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          {/* Portrait */}
          <motion.div variants={fadeInUp} className="relative order-2 md:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={healerImg}
                alt="Pranic healer portrait"
                className="w-full h-[520px] object-cover object-top"
                data-testid="img-healer-portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </div>
            {/* Floating credential badge */}
            <motion.div
              className="absolute -bottom-5 -right-5 bg-card border border-border rounded-xl px-5 py-4 shadow-md"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <p className="font-serif text-lg font-light text-primary leading-none">Paso Robles</p>
              <p className="text-xs text-muted-foreground mt-0.5">Central California</p>
            </motion.div>
          </motion.div>

          {/* Intro text */}
          <motion.div variants={stagger} className="order-1 md:order-2 flex flex-col gap-5">
            <motion.p variants={fadeInUp} className="text-xs font-medium tracking-widest uppercase text-primary">
              Your Practitioner
            </motion.p>
            <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-6xl font-light text-foreground leading-tight">
              Rosalyn Piza
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-base font-medium tracking-wide">
              Pranic Healer · Non-Dualism
            </motion.p>
            <Separator />
            <motion.p variants={fadeInUp} className="text-foreground/80 text-lg leading-relaxed">
              {bio1}
            </motion.p>
            <motion.p variants={fadeInUp} className="text-foreground/75 leading-relaxed">
              {bio2}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-2">
              <Link href="/book" data-testid="link-about-cta-book">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">
                  Book a Session <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
              <Link href="/services" data-testid="link-about-cta-services">
                <Button variant="outline" className="px-6">View Services</Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy */}
      <section className="py-16 bg-gradient-to-b from-secondary/40 to-secondary/10">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeInUp} className="text-xs font-medium tracking-widest uppercase text-primary mb-3 text-center">
              Healing Philosophy
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl font-light text-foreground text-center mb-12">
              What I believe
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-card border border-border rounded-2xl p-7"
                  data-testid={`card-value-${i}`}
                >
                  <h3 className="font-serif text-xl font-light text-foreground mb-3 leading-snug">
                    {v.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="py-16 container mx-auto px-4 md:px-6 max-w-3xl text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pl-0 border-l-0"
        >
          <p className="font-serif text-2xl md:text-3xl font-light italic text-foreground/70 leading-relaxed">
            "{quote}"
          </p>
          <footer className="mt-5 text-sm text-muted-foreground font-medium tracking-wide">— Rosalyn Piza</footer>
        </motion.blockquote>
      </section>

      {/* Credentials */}
      <section className="py-16 bg-secondary/25">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeInUp} className="text-xs font-medium tracking-widest uppercase text-primary mb-3 text-center">
              Training & Credentials
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl font-light text-foreground text-center mb-12">
              Certifications
            </motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {credentials.map((c, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-start gap-4 bg-card border border-border rounded-xl p-5"
                  data-testid={`card-credential-${i}`}
                >
                  <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <c.icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{c.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{c.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="py-16 container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p variants={fadeInUp} className="text-xs font-medium tracking-widest uppercase text-primary mb-3 text-center">
            The Journey
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl font-light text-foreground text-center mb-12">
            How I got here
          </motion.h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-border" />
            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex gap-6 items-start"
                  data-testid={`timeline-item-${i}`}
                >
                  <div className="w-14 flex-shrink-0 text-right">
                    <span className="font-serif text-sm font-medium text-primary">{item.year}</span>
                  </div>
                  <div className="relative flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-background shadow" />
                  </div>
                  <p className="text-foreground/75 text-sm leading-relaxed pt-0.5">{item.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-secondary/40 to-secondary/10">
        <motion.div
          className="container mx-auto px-4 md:px-6 text-center max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-light text-foreground mb-4">
            Ready to take the first step?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            A first session is simply a conversation — in energy, and in words. There is nothing to prepare, nothing to prove. Just arrive, and we will begin from wherever you are.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book" data-testid="link-about-bottom-book">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10">
                Book a Session
              </Button>
            </Link>
            <Link href="/faq" data-testid="link-about-bottom-faq">
              <Button size="lg" variant="outline" className="px-10">
                Read the FAQ
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
