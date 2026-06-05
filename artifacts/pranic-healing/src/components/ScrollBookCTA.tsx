import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays } from "lucide-react";

/**
 * Sticky "Book a Session" pill that slides up from the bottom-centre
 * once the visitor has scrolled past the hero section (~85vh).
 * Only rendered on the Home page — import only there.
 */
export function ScrollBookCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const THRESHOLD = window.innerHeight * 0.85;

    function onScroll() {
      setVisible(window.scrollY > THRESHOLD);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once in case page is already scrolled
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scroll-book-cta"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        >
          <Link href="/book" data-testid="link-scroll-book-cta">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(109,40,217,0.25)" }}
              whileTap={{ scale: 0.97 }}
              className="pointer-events-auto flex items-center gap-2.5 bg-primary text-primary-foreground font-medium text-sm px-6 py-3 rounded-full shadow-lg"
            >
              <CalendarDays size={16} className="flex-shrink-0" />
              Book a Session
            </motion.button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
