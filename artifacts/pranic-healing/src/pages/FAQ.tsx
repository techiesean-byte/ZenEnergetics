import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What exactly is prana?",
    answer: "Prana is the Sanskrit word for 'life force'. It is the invisible energy that keeps the body alive and healthy. In other traditions, it is known as Chi (Chinese), Ki (Japanese), or Mana (Polynesian). We absorb prana primarily from the air, the sun, and the ground."
  },
  {
    question: "Is pranic healing a religion?",
    answer: "No. Pranic Healing is a secular, universal energy healing system based on natural laws. It is not affiliated with any religion or sect. People from all backgrounds, beliefs, and traditions practice and receive Pranic Healing."
  },
  {
    question: "Can pranic healing replace medical treatment?",
    answer: "Absolutely not. Pranic Healing is not intended to replace orthodox medicine, but rather to complement it. If an ailment is severe or symptoms persist, please consult a medical doctor. Pranic Healing works alongside medical treatments to accelerate the recovery process."
  },
  {
    question: "How long does a session take?",
    answer: "A typical session lasts between 45 to 60 minutes. The duration depends on the specific condition being treated, the age of the client, and how responsive their energy body is to the healing process."
  },
  {
    question: "What happens during a pranic healing session?",
    answer: "During a session, you simply relax in a comfortable chair or lie down. The healer does not touch your physical body. They will scan your energy field (aura) to identify imbalances, cleanse the congested energy, and then energize the areas with fresh prana. You remain fully clothed throughout the process."
  },
  {
    question: "Can I receive pranic healing remotely?",
    answer: "Yes. In energy healing, there is no separation in time or space. The energy body is interconnected with the earth's energy field. Distance healing is highly effective and allows you to receive healing from the comfort of your home."
  },
  {
    question: "How many sessions will I need?",
    answer: "This varies greatly depending on the condition. Simple ailments might improve significantly after just 1 or 2 sessions. Chronic or severe conditions may require treatments 2-3 times a week for several weeks or months. Your healer will discuss a tailored plan with you."
  },
  {
    question: "What conditions can pranic healing help with?",
    answer: "Pranic healing is applied to a wide range of physical conditions (respiratory, gastrointestinal, muscular, skeletal issues) as well as psychological conditions (stress, tension, anxiety, depression, phobias, traumas, and addictions)."
  },
  {
    question: "Is there scientific evidence for pranic healing?",
    answer: "Yes. Numerous studies have been conducted on the efficacy of Pranic Healing, demonstrating positive changes in cellular structure, stress markers, and recovery times. Grand Master Choa Kok Sui himself was a chemical engineer and designed the system with scientific rigor and observation."
  },
  {
    question: "How is pranic healing different from Reiki?",
    answer: "Both use life energy, but Pranic Healing employs a specific 'cleansing' process before energizing. Cleansing removes the diseased energy first, which allows the new energy to flow freely and prevents the body from rejecting it. Pranic Healing also uses specific colors of prana for different ailments, making it highly targeted."
  },
  {
    question: "Can children and pets receive pranic healing?",
    answer: "Yes, both children and animals respond exceptionally well to Pranic Healing. Their energy bodies are usually less cluttered with emotional stress than adults, allowing the healing energy to act quickly and effectively."
  },
  {
    question: "What should I expect to feel during a session?",
    answer: "Experiences vary. Some people feel warmth, a gentle tingling, or a cool breeze. Others feel a profound sense of peace and lightness, while some may feel sleepy or fall asleep during the session. It is also completely normal to not feel any physical sensations; the energy is still working."
  }
];

export default function FAQ() {
  return (
    <div className="flex flex-col items-center w-full bg-background pb-24">
      {/* Header */}
      <section className="w-full bg-muted/30 py-20 pt-32 border-b">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <HelpCircle className="w-12 h-12 mx-auto text-primary mb-6 opacity-80" />
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-6"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground font-light"
          >
            Find answers to common questions about energy healing, what to expect, and how the process works.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card rounded-2xl shadow-sm border p-6 md:p-8"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-primary/10">
                <AccordionTrigger className="text-left font-medium text-lg py-5 hover:text-primary transition-colors" data-testid={`faq-trigger-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Story Sidebar / Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-primary/5 rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We understand that energy healing can seem unfamiliar at first. If you have specific concerns about your condition or how a session would work for you, we are here to help.
          </p>
          <Link href="/book" data-testid="link-faq-book">
            <Button size="lg" className="rounded-full">
              Schedule a Consultation <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
