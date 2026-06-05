import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Leaf, Sparkles, Heart, Star } from "lucide-react";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { AmbientPlayer } from "@/components/AmbientPlayer";
import { DiscoveryPopup } from "@/components/DiscoveryPopup";
import { AuraSlider } from "@/components/AuraSlider";
import { ScrollBookCTA } from "@/components/ScrollBookCTA";

import heroImg from "../assets/hero.png";
import whatIs1Img from "../assets/what-is-1.png";
import whatIs2Img from "../assets/what-is-2.png";
import healerPhoto from "../assets/healer-photo.jpeg";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Glowing healing energy hands"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
        </div>

        {/* Purple floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-secondary/50 rounded-full blur-[110px] pointer-events-none"
          animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[130px] pointer-events-none"
          animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-56 h-56 bg-secondary/40 rounded-full blur-[90px] pointer-events-none"
          animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-foreground mb-6 drop-shadow-sm">
              Discover the Healing Power <br className="hidden md:block" /> Within You
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
              Pranic Healing is a gentle, no-touch energy healing system that guides you from exhaustion to radiant wellbeing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/book" data-testid="link-hero-book">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-primary/25 transition-all">
                  Book a Session
                </Button>
              </Link>
              <Link href="/what-is-pranic-healing" data-testid="link-hero-learn-more">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-background/80 transition-all">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="w-full py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6 text-primary">What is Pranic Healing?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Prana is the Sanskrit word for life force. It is the invisible energy that keeps the body alive and healthy. In Pranic Healing, we cleanse the energetic body of congested, diseased energy, and replace it with fresh prana to accelerate the body's natural healing process.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Whether you are seeking relief from physical pain, emotional trauma, or simply desiring a deeper sense of peace and alignment, Pranic Healing offers a gentle yet powerful path forward.
              </p>
              <Link href="/what-is-pranic-healing" className="inline-flex items-center text-primary font-medium hover:underline" data-testid="link-intro-read-more">
                Explore the science and philosophy <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img src={whatIs1Img} alt="Ethereal spiritual wellness aura" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Before & After Aura Slider */}
      <AuraSlider />

      {/* Pathways Section */}
      <section className="w-full py-24 bg-muted/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">Begin Today</p>
            <h2 className="font-serif text-3xl md:text-5xl font-medium mb-6">Your Healing Journey</h2>
            <p className="text-lg text-muted-foreground">
              Choose the path that calls to you. We offer personalized sessions, educational resources, and a community dedicated to wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                color: "bg-primary/10 text-primary",
                title: "Healing Sessions",
                body: "Experience deep restoration through one-on-one Pranic Healing. Available in-person or remotely.",
                link: "/services",
                label: "View Services",
                delay: 0.1,
              },
              {
                icon: Leaf,
                color: "bg-secondary text-secondary-foreground",
                title: "Learn & Grow",
                body: "Understand the anatomy of the energy body, the chakras, and how to maintain energetic hygiene.",
                link: "/faq",
                label: "Read FAQ",
                delay: 0.2,
              },
              {
                icon: Sparkles,
                color: "bg-secondary/60 text-secondary-foreground",
                title: "Video Library",
                body: "Guided meditations and educational videos to help you align your energy from the comfort of home.",
                link: "/videos",
                label: "Watch Now",
                delay: 0.3,
              },
            ].map(({ icon: Icon, color, title, body, link, label, delay }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay }}
              >
                <Card className="h-full border border-secondary/40 shadow-md hover:shadow-xl transition-shadow bg-card/70 backdrop-blur-sm">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${color}`}>
                      <Icon size={24} />
                    </div>
                    <CardTitle className="font-serif text-2xl">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{body}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={link} className="text-primary font-medium inline-flex items-center hover:underline" data-testid={`link-path-${label.toLowerCase().replace(/\s/g, "-")}`}>
                      {label} <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Healer */}
      <section className="w-full py-24 bg-gradient-to-br from-secondary/30 via-background to-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center max-w-5xl mx-auto">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-secondary/40">
                <img
                  src={healerPhoto}
                  alt="Sophia Marlowe — Pranic Healer"
                  className="w-full h-[480px] object-cover object-top"
                  data-testid="img-healer-home"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-5 -right-5 bg-card border border-secondary/50 rounded-xl px-5 py-4 shadow-lg"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={11} className="text-primary fill-primary" />)}
                </div>
                <p className="text-xs text-muted-foreground">1,500+ clients · 18 countries</p>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-5"
            >
              <p className="text-xs font-medium tracking-widest uppercase text-primary">Your Practitioner</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight">
                Sophia Marlowe
              </h2>
              <p className="text-sm text-muted-foreground font-medium tracking-wide">
                Certified Pranic Healer · Psychotherapy Practitioner · Twin Hearts Facilitator
              </p>
              <p className="text-foreground/80 leading-relaxed text-lg">
                I came to pranic healing not through spiritual seeking, but through exhaustion. A single session, arranged almost as a last resort, changed the trajectory of my life — and has since guided over 1,500 others toward their own.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With more than 12 years in practice and clients spanning 18 countries, I bring certified expertise and deep compassion to every session — whether in-person or at a distance.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/about" data-testid="link-home-about">
                  <Button variant="outline" className="border-secondary/60 hover:bg-secondary/30">
                    Read My Story <ArrowRight size={14} className="ml-2" />
                  </Button>
                </Link>
                <Link href="/book" data-testid="link-home-book-healer">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Book a Session
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Banner */}
      <section className="w-full h-80 relative overflow-hidden">
        <img src={whatIs2Img} alt="Serene healing session" className="w-full h-full object-cover object-center opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 via-primary/20 to-secondary/40 mix-blend-multiply" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="font-serif text-3xl md:text-5xl text-white drop-shadow-lg text-center px-4 max-w-4xl leading-tight">
            "The body is a living entity that possesses the innate ability to heal itself."
          </h2>
        </div>
      </section>

      <NewsletterSignup variant="banner" />

      {/* Ambient Music Player — auto-plays on scroll */}
      <AmbientPlayer />

      {/* Discovery Call popup — appears after 30 seconds */}
      <DiscoveryPopup />

      {/* Sticky Book CTA — slides up after scrolling past hero */}
      <ScrollBookCTA />
    </div>
  );
}
