import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Leaf, Sparkles, Heart } from "lucide-react";

import heroImg from "../assets/hero.png";
import whatIs1Img from "../assets/what-is-1.png";
import whatIs2Img from "../assets/what-is-2.png";

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
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Floating Light Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"
          animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none"
          animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-foreground mb-6 drop-shadow-sm">
              Discover the Healing Power <br className="hidden md:block"/> Within You
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
      <section className="w-full py-24 bg-card">
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pathways Section */}
      <section className="w-full py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-5xl font-medium mb-6">Your Healing Journey</h2>
            <p className="text-lg text-muted-foreground">
              Choose the path that calls to you. We offer personalized sessions, educational resources, and a community dedicated to wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <Heart size={24} />
                  </div>
                  <CardTitle className="font-serif text-2xl">Healing Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Experience deep restoration through one-on-one Pranic Healing. Available in-person or remotely.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/services" className="text-primary font-medium inline-flex items-center hover:underline" data-testid="link-path-services">
                    View Services <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4 text-accent-foreground">
                    <Leaf size={24} />
                  </div>
                  <CardTitle className="font-serif text-2xl">Learn & Grow</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Understand the anatomy of the energy body, the chakras, and how to maintain energetic hygiene.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/faq" className="text-accent-foreground font-medium inline-flex items-center hover:underline" data-testid="link-path-faq">
                    Read FAQ <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mb-4">
                    <Sparkles size={24} />
                  </div>
                  <CardTitle className="font-serif text-2xl">Video Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Guided meditations and educational videos to help you align your energy from the comfort of home.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/videos" className="text-secondary-foreground font-medium inline-flex items-center hover:underline" data-testid="link-path-videos">
                    Watch Now <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Banner */}
      <section className="w-full h-80 relative overflow-hidden">
        <img src={whatIs2Img} alt="Serene healing session" className="w-full h-full object-cover object-center opacity-80" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="font-serif text-3xl md:text-5xl text-primary-foreground drop-shadow-md text-center px-4 max-w-4xl leading-tight">
            "The body is a living entity that possesses the innate ability to heal itself."
          </h2>
        </div>
      </section>
    </div>
  );
}
