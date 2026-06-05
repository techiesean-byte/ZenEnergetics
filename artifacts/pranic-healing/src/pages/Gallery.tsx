import { motion } from "framer-motion";
import heroImg from "../assets/hero.png";
import whatIs1Img from "../assets/what-is-1.png";
import whatIs2Img from "../assets/what-is-2.png";
import gallery1 from "../assets/gallery-1.png";
import thumb1 from "../assets/video-thumb-1.png";
import thumb2 from "../assets/video-thumb-2.png";
import thumb3 from "../assets/video-thumb-3.png";
import thumb4 from "../assets/video-thumb-4.png";

const images = [
  { src: heroImg, caption: "Healing hands channeling pure prana.", aspect: "aspect-[4/5]" },
  { src: whatIs1Img, caption: "The ethereal beauty of a cleansed aura.", aspect: "aspect-[3/4]" },
  { src: thumb1, caption: "Deep meditation and alignment.", aspect: "aspect-square" },
  { src: whatIs2Img, caption: "A serene space for restoration.", aspect: "aspect-[4/3]" },
  { src: gallery1, caption: "Channeling golden life energy.", aspect: "aspect-square" },
  { src: thumb2, caption: "Distance healing reaches across any space.", aspect: "aspect-[3/4]" },
  { src: thumb3, caption: "Vibrant, balanced chakras.", aspect: "aspect-[4/5]" },
  { src: thumb4, caption: "Peaceful atmosphere for inner work.", aspect: "aspect-square" },
];

export default function Gallery() {
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
            Visual Sanctuary
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground font-light"
          >
            Glimpses into the beautiful, unseen world of energy healing.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <figure className="relative group overflow-hidden rounded-2xl shadow-sm border bg-card">
                <div className={`relative w-full ${img.aspect} overflow-hidden`}>
                  <img 
                    src={img.src} 
                    alt={img.caption} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm font-medium drop-shadow-md">
                    {img.caption}
                  </p>
                </figcaption>
              </figure>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
