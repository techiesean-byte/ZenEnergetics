import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, Volume2 } from "lucide-react";

const TRACKS = [
  {
    title: "432 Hz Healing Frequency",
    src: "https://archive.org/download/01_20231218_20231218/01.mp3",
  },
  {
    title: "Crystal Bowl Meditation",
    src: "https://archive.org/download/SilentMindMeditation/silent_mind_-_tibetan_bowls_collection_-_04_-_green_tara.mp3",
  },
  {
    title: "Ocean of Prana",
    src: "https://archive.org/download/yoga-ambient/yoga-ambient.mp3",
  },
];

const FALLBACK_NOTE = "Connect an audio file to enable music.";

export function AmbientPlayer() {
  const [trackIndex] = useState(() => Math.floor(Math.random() * TRACKS.length));
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Set soft default volume on mount
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.15;
  }, []);

  // Show player after short delay
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Attempt autoplay after first scroll or touch
  useEffect(() => {
    function tryPlay() {
      if (!hasInteracted) {
        setHasInteracted(true);
        audioRef.current
          ?.play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }
    }
    window.addEventListener("scroll", tryPlay, { once: true, passive: true });
    window.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    window.addEventListener("click", tryPlay, { once: true });
    return () => {
      window.removeEventListener("scroll", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
      window.removeEventListener("click", tryPlay);
    };
  }, [hasInteracted]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  const track = TRACKS[trackIndex];

  return (
    <>
      <audio
        ref={audioRef}
        src={track.src}
        loop
        preload="none"
        onError={() => setLoadError(true)}
      />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="flex items-center gap-3 bg-background/90 backdrop-blur-md border border-primary/20 rounded-full py-2 px-4 shadow-lg">
              {/* Animated icon */}
              <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                {playing && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent"
                  />
                )}
                <Music size={12} />
              </div>

              {/* Label */}
              <div className="hidden sm:flex flex-col overflow-hidden w-36">
                <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">
                  {playing ? "Now Playing" : "Meditation Music"}
                </span>
                <span className="text-xs text-foreground truncate">
                  {loadError ? FALLBACK_NOTE : track.title}
                </span>
              </div>

              {/* Equalizer bars */}
              {playing && !loadError && (
                <div className="flex items-end gap-[2px] h-3 mx-1">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-[3px] bg-primary rounded-t-sm"
                      animate={{ height: ["25%", "100%", "45%", "75%", "25%"] }}
                      transition={{
                        duration: 0.9 + i * 0.15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Play / Pause */}
              <button
                onClick={toggle}
                aria-label={playing ? "Pause music" : "Play meditation music"}
                className="p-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow"
              >
                {playing ? <Pause size={13} /> : <Play size={13} />}
              </button>

              {/* Prompt if never interacted yet */}
              {!hasInteracted && !playing && (
                <span className="text-[10px] text-primary font-medium ml-1 hidden sm:block whitespace-nowrap">
                  Tap to play
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
