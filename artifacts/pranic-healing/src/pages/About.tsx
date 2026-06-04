import { Link } from "wouter";
import { motion } from "framer-motion";
import { Award, BookOpen, Heart, Leaf, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import healerImg from "../assets/healer-portrait.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const credentials = [
  { icon: Award, label: "Certified Pranic Healer", detail: "Institute for Inner Studies — Level I, II & III" },
  { icon: Star, label: "Advanced Pranic Healing", detail: "Certified in color prana & advanced chakra work" },
  { icon: Heart, label: "Pranic Psychotherapy", detail: "Certified practitioner for emotional & trauma healing" },
  { icon: BookOpen, label: "Twin Hearts Meditation", detail: "Certified facilitator — group & individual sessions" },
  { icon: Leaf, label: "Pranic Crystal Healing", detail: "Certified in the use of crystals as energetic tools" },
  { icon: Award, label: "Over 12 Years in Practice", detail: "1,500+ individual clients across 18 countries" },
];

const values = [
  {
    title: "Every person is inherently whole.",
    body: "I do not heal anyone. What I do is create the conditions — the energetic space — in which your body remembers how to heal itself. That distinction matters deeply to me.",
  },
  {
    title: "Healing is not one-size-fits-all.",
    body: "Each session is tailored to what you bring into the room that day. No two clients are alike, and no two sessions are the same. I listen before I act.",
  },
  {
    title: "This work complements, never replaces, medicine.",
    body: "I hold enormous respect for conventional healthcare. My role is to work alongside your doctors and therapists, not in opposition to them.",
  },
  {
    title: "Your pace is the right pace.",
    body: "Some people feel dramatic shifts in one session. Others need months of gentle, consistent work. Both paths are equally valid. I will never pressure you toward a particular timeline.",
  },
];

const timeline = [
  { year: "2008", event: "First encounter with pranic healing during a period of burnout — a session changed everything." },
  { year: "2010", event: "Completed Level I and Level II certifications with the Institute for Inner Studies." },
  { year: "2012", event: "Opened a small private practice while completing Advanced and Psychotherapy certifications." },
  { year: "2015", event: "Began offering distance healing sessions, extending reach to clients across continents." },
  { year: "2018", event: "Became a certified Twin Hearts Meditation facilitator, adding group healing work." },
  { year: "2021", event: "Expanded to a full online platform, serving clients in 18 countries." },
  { year: "Today", event: "Continuing to practice, teach, and deepen — because a healer who stops learning stops healing." },
];

export default function About() {
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
              <p className="font-serif text-2xl font-light text-primary leading-none">12+</p>
              <p className="text-xs text-muted-foreground mt-0.5">Years of practice</p>
            </motion.div>
          </motion.div>

          {/* Intro text */}
          <motion.div variants={stagger} className="order-1 md:order-2 flex flex-col gap-5">
            <motion.p variants={fadeInUp} className="text-xs font-medium tracking-widest uppercase text-primary">
              Your Practitioner
            </motion.p>
            <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-6xl font-light text-foreground leading-tight">
              Sophia Marlowe
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-base font-medium tracking-wide">
              Certified Pranic Healer · Psychotherapy Practitioner · Twin Hearts Facilitator
            </motion.p>
            <Separator />
            <motion.p variants={fadeInUp} className="text-foreground/80 text-lg leading-relaxed">
              I came to pranic healing not through spiritual seeking, but through exhaustion. After years of pushing through a high-pressure career, my body simply stopped cooperating. A single session — arranged almost as a last resort — changed the trajectory of my life.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-foreground/75 leading-relaxed">
              That was sixteen years ago. Since then I have worked with more than 1,500 clients — from burned-out executives to grieving parents, from children with anxiety to cancer patients seeking support alongside their medical treatment. Each one has taught me something the training never could.
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
      <section className="py-16 bg-secondary/20">
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
            "I do not see clients as broken things to be fixed. I see them as complete human beings whose energy has become temporarily clouded. My work is simply to help clear the view."
          </p>
          <footer className="mt-5 text-sm text-muted-foreground font-medium tracking-wide">— Sophia Marlowe</footer>
        </motion.blockquote>
      </section>

      {/* Credentials */}
      <section className="py-16 bg-muted/40">
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
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-accent/10">
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
