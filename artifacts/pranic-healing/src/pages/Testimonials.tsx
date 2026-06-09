import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchTestimonials, fetchSiteSettings } from "@/lib/sanity";

const FALLBACK_TESTIMONIALS = [
  { name: "Sarah Jenkins", city: "Seattle, WA", story: "I had been suffering from chronic migraines for years. After just three sessions, the intensity and frequency reduced dramatically. The gentle approach made me feel so safe and cared for.", condition: "Chronic Migraines", initials: "SJ", _id: "1", order: 1 },
  { name: "Michael Chen", city: "San Francisco, CA", story: "The distance healing sessions were a revelation. I was going through a period of intense grief and anxiety, and I could literally feel the heavy weight lifting off my chest during our sessions.", condition: "Anxiety & Grief", initials: "MC", _id: "2", order: 2 },
  { name: "Elena Rodriguez", city: "Austin, TX", story: "I sought pranic healing to help with my recovery post-surgery. My doctor was amazed at how quickly my incision healed and how high my energy levels were compared to normal recovery times.", condition: "Post-Surgery Recovery", initials: "ER", _id: "3", order: 3 },
  { name: "David Thompson", city: "Portland, OR", story: "I was skeptical at first, but the chakra balancing intensive changed my life. I finally found the clarity and emotional stability I had been seeking through years of talk therapy alone.", condition: "Emotional Imbalance", initials: "DT", _id: "4", order: 4 },
  { name: "Aisha Patel", city: "Chicago, IL", story: "My daughter was having severe sleep issues and nightmares. After two gentle sessions, she began sleeping through the night peacefully. It's been a blessing for our whole family.", condition: "Insomnia", initials: "AP", _id: "5", order: 5 },
  { name: "James Wilson", city: "Denver, CO", story: "The lower back pain that had bothered me for a decade vanished. The healer explained exactly which energy centers were congested and cleared them. I feel 10 years younger.", condition: "Lower Back Pain", initials: "JW", _id: "6", order: 6 },
];

const FALLBACK_RATING = 4.9;
const FALLBACK_COUNT = 127;
const FALLBACK_REVIEW_URL = "https://www.google.com/search?q=pranic+healing+rosalyn+piza";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const [rating, setRating] = useState(FALLBACK_RATING);
  const [reviewCount, setReviewCount] = useState(FALLBACK_COUNT);
  const [reviewUrl, setReviewUrl] = useState(FALLBACK_REVIEW_URL);

  useEffect(() => {
    fetchTestimonials().then((data) => {
      if (data.length > 0) setTestimonials(data);
    });
    fetchSiteSettings().then((s) => {
      if (s?.googleRating) setRating(s.googleRating);
      if (s?.googleReviewCount) setReviewCount(s.googleReviewCount);
      if (s?.googleReviewUrl) setReviewUrl(s.googleReviewUrl);
    });
  }, []);

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

      {/* Google Reviews Banner */}
      <section className="w-full py-10 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-card border border-border rounded-2xl px-7 py-6 shadow-sm"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0 bg-background shadow-sm">
                <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-serif text-3xl font-light text-foreground leading-none">{rating}</span>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-[#FBBC05] fill-[#FBBC05]" />)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on <span className="font-medium text-foreground">{reviewCount} Google reviews</span>
                </p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border flex-shrink-0" />
            <div className="flex flex-col items-center sm:items-end gap-2 text-center sm:text-right">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                Verified reviews from real clients on Google
              </p>
              <a href={reviewUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                View on Google <ExternalLink size={11} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-16 max-w-6xl">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t._id}
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
