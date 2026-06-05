import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "wouter";

const RATING = 4.9;
const REVIEW_COUNT = 127;

export function RatingBadge() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="badge"
          initial={{ opacity: 0, x: -24, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -24, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.1 }}
          className="fixed bottom-[6.5rem] left-6 z-40"
        >
          <Link
            href="/testimonials"
            data-testid="link-rating-badge"
            aria-label={`${RATING} stars — ${REVIEW_COUNT} client reviews`}
          >
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2.5 bg-card/95 backdrop-blur-md border border-border shadow-lg rounded-2xl px-4 py-2.5 cursor-pointer group"
            >
              {/* Stars */}
              <div className="flex items-center gap-[2px]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={12}
                    className="text-primary fill-primary"
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="w-px h-4 bg-border flex-shrink-0" />

              {/* Text */}
              <div className="flex flex-col leading-none">
                <span className="text-xs font-semibold text-foreground tabular-nums">
                  {RATING.toFixed(1)} <span className="font-normal text-muted-foreground">/ 5.0</span>
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5 group-hover:text-primary transition-colors">
                  {REVIEW_COUNT} client reviews
                </span>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
