import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Sparkles, Sun, Moon, Users, HeartHandshake, Heart, Leaf, Star, Wind, Zap, ArrowRight, LucideIcon } from "lucide-react";
import { fetchServices } from "@/lib/sanity";

const ICON_MAP: Record<string, LucideIcon> = {
  Waves, Sparkles, Sun, Moon, Users, HeartHandshake, Heart, Leaf, Star, Wind, Zap,
};

const COLOR_MAP: Record<string, { color: string; bgColor: string }> = {
  blue:    { color: "text-blue-500",    bgColor: "bg-blue-500/10" },
  amber:   { color: "text-amber-500",   bgColor: "bg-amber-500/10" },
  purple:  { color: "text-purple-500",  bgColor: "bg-purple-500/10" },
  indigo:  { color: "text-indigo-500",  bgColor: "bg-indigo-500/10" },
  emerald: { color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  rose:    { color: "text-rose-500",    bgColor: "bg-rose-500/10" },
};

const FALLBACK_SERVICES = [
  { _id: "1", title: "Individual Pranic Healing", time: "60 min", price: "Starting at $120", description: "A comprehensive one-on-one energy session. We will scan your aura and chakras, cleanse congested energy, and revitalize your system to address specific physical or emotional ailments.", iconName: "Waves", colorTheme: "blue", order: 1 },
  { _id: "2", title: "Distance Healing Session", time: "45 min", price: "Starting at $90", description: "Receive powerful healing from the comfort of your home. Since the energy body is interconnected with the earth's energy field, distance healing is highly effective.", iconName: "Sun", colorTheme: "amber", order: 2 },
  { _id: "3", title: "Aura Scanning & Analysis", time: "30 min", price: "Starting at $65", description: "A preventative check-up for your energy body. We will assess your chakras for imbalances before they manifest as physical ailments, providing a detailed energy report.", iconName: "Sparkles", colorTheme: "purple", order: 3 },
  { _id: "4", title: "Chakra Balancing Intensive", time: "90 min", price: "Starting at $160", description: "A deep, focused session targeting major energy centers. Ideal for breaking through deep-seated emotional trauma, stress, and long-standing energy blockages.", iconName: "Moon", colorTheme: "indigo", order: 4 },
  { _id: "5", title: "Group Healing Circle", time: "60 min", price: "Starting at $40", description: "Experience the amplified power of group energy. A guided meditation followed by collective healing for general stress relief and well-being.", iconName: "Users", colorTheme: "emerald", order: 5 },
  { _id: "6", title: "Monthly Wellness Package", time: "4 Sessions", price: "Starting at $380", description: "Commit to your healing journey with weekly sessions. Consistent cleansing and energizing accelerates profound transformation and maintains optimal health.", iconName: "HeartHandshake", colorTheme: "rose", order: 6 },
];

export default function Services() {
  const [services, setServices] = useState(FALLBACK_SERVICES);

  useEffect(() => {
    fetchServices().then((data) => {
      if (data.length > 0) setServices(data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center w-full bg-background pb-24">
      {/* Header */}
      <section className="w-full py-20 pt-32 border-b bg-gradient-to-b from-secondary/50 to-secondary/10">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
            Work With Me
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-6">
            Sessions & Services
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground font-light">
            Choose the path that best supports your healing journey. All sessions are conducted with utmost care, reverence, and confidentiality.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = ICON_MAP[service.iconName] ?? Sparkles;
            const colors = COLOR_MAP[service.colorTheme] ?? COLOR_MAP.purple;
            return (
              <motion.div key={service._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="h-full flex flex-col shadow-sm hover:shadow-lg transition-shadow border-primary/10">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl ${colors.bgColor} ${colors.color} flex items-center justify-center mb-6`}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <CardTitle className="font-serif text-2xl text-foreground">{service.title}</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm font-medium text-primary">{service.time}</span>
                      <span className="text-sm text-muted-foreground border-l border-border pl-4">{service.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                  <CardFooter className="pt-6">
                    <Link href="/book" className="w-full">
                      <Button variant="outline" className="w-full group hover:bg-primary hover:text-primary-foreground transition-colors border-primary/20">
                        Book Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 bg-secondary/30 rounded-3xl border border-secondary/50 text-center max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl md:text-3xl font-medium mb-4">Not sure where to start?</h3>
          <p className="text-muted-foreground mb-8 text-lg">
            We recommend beginning with an Individual Pranic Healing session so we can assess your unique energy profile and tailor a plan specifically for you.
          </p>
          <Link href="/book">
            <Button size="lg" className="rounded-full shadow-md">Request a Consultation</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
