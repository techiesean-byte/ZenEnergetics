import { useState, useEffect } from "react";
import { usePageMeta } from "@/lib/usePageMeta";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchVideos, SanityVideo } from "@/lib/sanity";

import thumb1 from "../assets/video-thumb-1.png";
import thumb2 from "../assets/video-thumb-2.png";
import thumb3 from "../assets/video-thumb-3.png";
import thumb4 from "../assets/video-thumb-4.png";
import thumb5 from "../assets/video-thumb-5.png";
import thumb6 from "../assets/video-thumb-6.png";

const FALLBACK_VIDEOS = [
  { _id: "1", title: "Introduction to Prana", description: "Learn the fundamentals of life energy and how it affects your daily well-being.", duration: "12 min", youtubeId: "GqrqF3QZsB8", order: 1 },
  { _id: "2", title: "Cleansing Your Aura", description: "A guided explanation on how energetic blockages form and how they are swept away.", duration: "18 min", youtubeId: "vpv5MopbM4s", order: 2 },
  { _id: "3", title: "Activating the Chakras", description: "Understand the major energy centers in your body and their physical counterparts.", duration: "22 min", youtubeId: "RVPdNOhcv-4", order: 3 },
  { _id: "4", title: "Distance Healing Explained", description: "How energy knows no bounds and distance healing works just as effectively.", duration: "15 min", youtubeId: "QUXCMnVnnvs", order: 4 },
  { _id: "5", title: "Daily Energy Hygiene Practice", description: "Simple techniques to keep your energy field clean amidst daily stress.", duration: "10 min", youtubeId: "qh4kCX9SsDA", order: 5 },
  { _id: "6", title: "Meditation for Energy Restoration", description: "A brief overview of the Meditation on Twin Hearts for deep inner peace.", duration: "25 min", youtubeId: "Rptib8FmrxM", order: 6 },
];

const THUMBS = [thumb1, thumb2, thumb3, thumb4, thumb5, thumb6];

export default function Videos() {
  usePageMeta({ title: "Healing Videos & Guided Meditations", description: "Watch guided meditations, energy healing demonstrations, and educational videos from Zen Energetics. Explore Pranic Healing techniques from the comfort of your home." });
  const [videos, setVideos] = useState<SanityVideo[]>(FALLBACK_VIDEOS);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos().then((data) => {
      if (data && data.length > 0) setVideos(data);
    });
  }, []);

  const openVideo  = (id: string) => setActiveVideo(id);
  const closeVideo = () => setActiveVideo(null);

  const activeData = videos.find(v => v._id === activeVideo);

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
              key={video._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => openVideo(video._id)}
              data-testid={`video-card-${video._id}`}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md mb-4 bg-muted">
                <img
                  src={THUMBS[index % THUMBS.length]}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-lg transform transition-transform group-hover:scale-110">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </div>
                {video.duration && (
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md font-medium">
                    {video.duration}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Pranic Healing</span>
                <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo !== null && activeData && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeVideo}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-full z-10"
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
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeData.youtubeId}?autoplay=1&rel=0`}
                  title={activeData.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-6 md:p-8 bg-card">
                <span className="text-sm font-medium text-primary uppercase tracking-wider mb-2 block">
                  Pranic Healing
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3">
                  {activeData.title}
                </h2>
                {activeData.description && (
                  <p className="text-muted-foreground text-lg">{activeData.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
