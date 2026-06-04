import { useState, useEffect } from "react";
import { Play, Pause, SkipForward, Music, VolumeX, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tracks = [
  "Crystal Bowl Meditation",
  "528Hz Healing Frequency",
  "Ocean of Prana",
  "Chakra Alignment",
  "Sacred Om Journey"
];

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Show player after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const toggleMute = () => {
    if (isMuted && !isPlaying) setIsPlaying(true);
    setIsMuted(!isMuted);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
    setIsMuted(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50 flex items-center bg-card shadow-lg border border-primary/20 rounded-full py-2 px-4 gap-4"
      data-testid="music-player"
    >
      <div className="flex items-center gap-2">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          {isPlaying && !isMuted ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent border-b-transparent"
            />
          ) : null}
          <Music size={14} />
        </div>
        
        <div className="flex flex-col w-32 hidden sm:flex overflow-hidden">
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Meditation Radio</span>
          <div className="relative h-4 overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span 
                key={currentTrackIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs font-medium truncate block absolute"
                data-testid={`text-current-track`}
              >
                {tracks[currentTrackIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Equalizer Animation */}
      {isPlaying && !isMuted && (
        <div className="flex items-end gap-[2px] h-4 mx-2">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-primary rounded-t-sm"
              animate={{
                height: ["20%", "100%", "40%", "80%", "20%"]
              }}
              transition={{
                duration: 1 + i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-1">
        <button 
          onClick={toggleMute}
          className="p-2 text-foreground/60 hover:text-primary transition-colors"
          data-testid="button-music-mute"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <button 
          onClick={togglePlay}
          className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-md"
          data-testid="button-music-play"
        >
          {isPlaying && !isMuted ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button 
          onClick={nextTrack}
          className="p-2 text-foreground/60 hover:text-primary transition-colors"
          data-testid="button-music-next"
        >
          <SkipForward size={16} />
        </button>
      </div>
    </motion.div>
  );
}
