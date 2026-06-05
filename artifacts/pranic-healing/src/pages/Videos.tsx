import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import thumb1 from "../assets/video-thumb-1.png";
import thumb2 from "../assets/video-thumb-2.png";
import thumb3 from "../assets/video-thumb-3.png";
import thumb4 from "../assets/video-thumb-4.png";
import thumb5 from "../assets/video-thumb-5.png";
import thumb6 from "../assets/video-thumb-6.png";

const videos = [
  {
    id: 1,
    title: "Introduction to Prana",
    description: "Learn the fundamentals of life energy and how it affects your daily well-being.",
    guide: "Female Guide",
    thumbnail: thumb1,
    duration: "1:24"
  },
  {
    id: 2,
    title: "Cleansing Your Aura",
    description: "A guided explanation on how energetic blockages form and how they are swept away.",
    guide: "Male Guide",
    thumbnail: thumb2,
    duration: "1:45"
  },
  {
    id: 3,
    title: "Activating the Chakras",
    description: "Understand the major energy centers in your body and their physical counterparts.",
    guide: "Female Guide",
    thumbnail: thumb3,
    duration: "2:10"
  },
  {
    id: 4,
    title: "Distance Healing Explained",
    description: "How energy knows no bounds and distance healing works just as effectively.",
    guide: "Male Guide",
    thumbnail: thumb4,
    duration: "1:55"
  },
  {
    id: 5,
    title: "Daily Energy Hygiene Practice",
    description: "Simple techniques to keep your energy field clean amidst daily stress.",
    guide: "Female Guide",
    thumbnail: thumb5,
    duration: "2:30"
  },
  {
    id: 6,
    title: "Meditation for Energy Restoration",
    description: "A brief overview of the Meditation on Twin Hearts for deep inner peace.",
    guide: "Male Guide",
    thumbnail: thumb6,
    duration: "1:40"
  }
];

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const openVideo = (id: number) => {
    setActiveVideo(id);
    setIsPlaying(true);
  };

  const closeVideo = () => {
    setActiveVideo(null);
    setIsPlaying(false);
  };

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
            Video Library
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground font-light"
          >
            Short, insightful guides to understanding energy healing.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => openVideo(video.id)}
              data-testid={`video-card-${video.id}`}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md mb-4 bg-muted">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-lg transform transition-transform group-hover:scale-110">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md font-medium">
                  {video.duration}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{video.guide}</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-lg"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-6 right-6 text-foreground hover:bg-muted rounded-full"
              onClick={closeVideo}
              data-testid="button-close-video"
            >
              <X className="w-6 h-6" />
            </Button>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl bg-card rounded-3xl overflow-hidden shadow-2xl border"
            >
              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
                <img 
                  src={videos.find(v => v.id === activeVideo)?.thumbnail} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? 'opacity-30' : 'opacity-60'}`}
                  alt=""
                />
                
                {/* Simulated playing state */}
                {isPlaying ? (
                  <div className="relative z-10 flex flex-col items-center text-white space-y-8">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full border-2 border-primary/50"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.2, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute inset-4 rounded-full border border-primary/50"
                      />
                      <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/50 flex items-center justify-center cursor-pointer" onClick={() => setIsPlaying(false)}>
                        <Pause className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-sm font-medium uppercase tracking-widest text-white/70 animate-pulse">
                      Playing Audio...
                    </p>
                  </div>
                ) : (
                  <div className="relative z-10 w-20 h-20 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center cursor-pointer hover:bg-primary transition-colors shadow-lg shadow-primary/20" onClick={() => setIsPlaying(true)}>
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                )}

                {/* Fake Controls */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-primary transition-colors">
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary" 
                        initial={{ width: "0%" }}
                        animate={isPlaying ? { width: "100%" } : { width: "0%" }}
                        transition={isPlaying ? { duration: 120, ease: "linear" } : { duration: 0 }}
                      />
                    </div>
                    <span className="text-xs text-white font-medium">0:00 / {videos.find(v => v.id === activeVideo)?.duration}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-card">
                <span className="text-sm font-medium text-primary uppercase tracking-wider mb-2 block">
                  {videos.find(v => v.id === activeVideo)?.guide}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3">
                  {videos.find(v => v.id === activeVideo)?.title}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {videos.find(v => v.id === activeVideo)?.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
