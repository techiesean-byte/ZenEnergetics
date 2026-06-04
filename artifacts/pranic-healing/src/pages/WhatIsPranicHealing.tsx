import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import whatIs1Img from "../assets/what-is-1.png";
import whatIs2Img from "../assets/what-is-2.png";
import heroImg from "../assets/hero.png";

export default function WhatIsPranicHealing() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col items-center w-full bg-background pb-24">
      {/* Header Section */}
      <section className="w-full bg-muted/50 py-20 pt-32">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-foreground mb-6"
          >
            The Science & Art of Energy Healing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted-foreground font-light max-w-2xl mx-auto"
          >
            Discover how Pranic Healing utilizes the life force to accelerate the body's natural ability to heal itself.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 mt-16 max-w-5xl">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-24"
        >
          {/* Section 1 */}
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary">What is Prana?</h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Prana is a Sanskrit word that means "life force." In China, it is called chi; in Japan, ki; in the Old Testament, the breath of life. It is the vital energy that keeps the body alive and healthy.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                The healer projects prana or life energy or the "breath of life" to the patient, thereby healing the patient. This is through the process of transferring this vital energy from the healer to the recipient.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-square">
              <img src={whatIs1Img} alt="Prana flowing energy" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <Separator className="bg-border/50" />

          {/* Section 2 */}
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-xl aspect-square">
              <img src={whatIs2Img} alt="Aura and Chakras" className="w-full h-full object-cover" />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary">The Energy Body & Chakras</h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                The physical body is actually composed of two parts: the visible physical body, and the invisible energy body called the bioplasmic body or aura. The visible physical body is that part of the human body that we see, touch, and are most acquainted with. The bioplasmic body is that invisible luminous energy body which interpenetrates the visible physical body.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Chakras are energy centers or whirling energy centers which control and energize the major and minor vital organs of the visible physical body. When the energy body is sick, the physical body becomes sick.
              </p>
            </div>
          </motion.div>

          <Separator className="bg-border/50" />

          {/* Master Choa Kok Sui */}
          <motion.div variants={fadeInUp} className="bg-card/50 p-8 md:p-12 rounded-3xl border border-primary/10 shadow-lg text-center">
            <Info className="w-12 h-12 mx-auto text-primary mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">Origins & Master Choa Kok Sui</h2>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto mb-8">
              Modern Pranic Healing was developed by Grand Master Choa Kok Sui. Through extensive research and synthesis, he demystified the ancient art of healing, transforming it into a scientific, systematic, and easy-to-learn system. His approach ensures that healing is not just for the gifted few, but a skill anyone can learn and apply.
            </p>
            <div className="text-xl font-serif text-primary italic">
              "Life energy or prana is all around us. It is pervasive; we are actually in an ocean of life energy."
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div variants={fadeInUp} className="space-y-12">
            <div className="text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4 text-primary">What can Pranic Healing help with?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Pranic healing addresses the energetic root of ailments, offering relief and support for a wide range of conditions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Physical Ailments", desc: "Reduces pain, accelerates healing from injuries, supports recovery from chronic illnesses by increasing the rate of physical healing." },
                { title: "Emotional & Psychological", desc: "Helps alleviate stress, anxiety, depression, trauma, and phobias by cleansing the emotional energy centers." },
                { title: "Preventative Wellness", desc: "Maintains a strong aura and balanced chakras to prevent physical diseases from manifesting." },
                { title: "Relationship Harmony", desc: "Heals energetic cords between individuals, promoting forgiveness and peace in relationships." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-card rounded-2xl border shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-accent-foreground flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="text-center py-12">
            <h2 className="font-serif text-3xl font-medium mb-6">Ready to experience the healing energy?</h2>
            <Link href="/book" data-testid="link-what-is-book">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-xl">
                Schedule a Session <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
