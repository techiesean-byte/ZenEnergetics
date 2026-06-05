import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Jenkins",
    city: "Seattle, WA",
    story: "I had been suffering from chronic migraines for years. After just three sessions, the intensity and frequency reduced dramatically. The gentle approach made me feel so safe and cared for.",
    condition: "Chronic Migraines",
    initials: "SJ"
  },
  {
    name: "Michael Chen",
    city: "San Francisco, CA",
    story: "The distance healing sessions were a revelation. I was going through a period of intense grief and anxiety, and I could literally feel the heavy weight lifting off my chest during our sessions.",
    condition: "Anxiety & Grief",
    initials: "MC"
  },
  {
    name: "Elena Rodriguez",
    city: "Austin, TX",
    story: "I sought pranic healing to help with my recovery post-surgery. My doctor was amazed at how quickly my incision healed and how high my energy levels were compared to normal recovery times.",
    condition: "Post-Surgery Recovery",
    initials: "ER"
  },
  {
    name: "David Thompson",
    city: "Portland, OR",
    story: "I was skeptical at first, but the chakra balancing intensive changed my life. I finally found the clarity and emotional stability I had been seeking through years of talk therapy alone.",
    condition: "Emotional Imbalance",
    initials: "DT"
  },
  {
    name: "Aisha Patel",
    city: "Chicago, IL",
    story: "My daughter was having severe sleep issues and nightmares. After two gentle sessions, she began sleeping through the night peacefully. It's been a blessing for our whole family.",
    condition: "Insomnia",
    initials: "AP"
  },
  {
    name: "James Wilson",
    city: "Denver, OR",
    story: "The lower back pain that had bothered me for a decade vanished. The healer explained exactly which energy centers were congested and cleared them. I feel 10 years younger.",
    condition: "Lower Back Pain",
    initials: "JW"
  }
];

export default function Testimonials() {
  return (
    <div className="flex flex-col items-center w-full bg-background pb-24">
      {/* Header */}
      <section className="w-full py-20 pt-32 border-b bg-gradient-to-b from-secondary/50 to-secondary/10">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-6"
          >
            Stories of Healing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground font-light"
          >
            Read how pranic healing has brought comfort, relief, and transformation to others on their journey.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-16 max-w-6xl">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="break-inside-avoid"
            >
              <Card className="shadow-sm hover:shadow-md transition-shadow border-primary/10 bg-card">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-1 text-primary">
                      {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                    </div>
                    <span className="text-xs font-medium bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {t.condition}
                    </span>
                  </div>
                  <p className="text-foreground/90 italic leading-relaxed text-lg font-serif">
                    "{t.story}"
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <Avatar className="h-10 w-10 border border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">{t.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.city}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
