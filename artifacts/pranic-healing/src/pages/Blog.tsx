import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { articles, categories } from "@/data/articles";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const featured = articles[0];
  const rest = filtered.filter(a => a.slug !== featured.slug);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-secondary/40 to-background">
        <motion.div
          className="container mx-auto px-4 md:px-6 text-center"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="text-primary" size={20} />
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase">Learning Centre</span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-6xl font-light text-foreground mb-4">
            Articles & Insights
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deepen your understanding of pranic healing, energy anatomy, and practical wellness through our curated articles.
          </motion.p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 md:px-6 pb-24">

        {/* Featured Article */}
        {activeCategory === "All" && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">Featured Article</p>
            <Link href={`/blog/${featured.slug}`} data-testid={`link-featured-article-${featured.slug}`}>
              <div className="group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-300 bg-card">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={featured.heroImage}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/10" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-4 text-xs font-medium">{featured.category}</Badge>
                  <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4 leading-tight group-hover:text-primary transition-colors duration-200">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock size={14} />
                      <span>{featured.readTime}</span>
                      <span className="mx-2 text-border">|</span>
                      <span>{featured.publishedDate}</span>
                    </div>
                    <span className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all duration-200">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10" data-testid="blog-category-filter">
          {["All", ...categories].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-testid={`button-category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary bg-card"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          animate="show"
          key={activeCategory}
        >
          {(activeCategory === "All" ? rest : filtered).map(article => (
            <motion.div key={article.slug} variants={fadeInUp}>
              <Link href={`/blog/${article.slug}`} data-testid={`link-article-${article.slug}`}>
                <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge
                      variant="secondary"
                      className="absolute top-4 left-4 text-xs font-medium bg-background/90 backdrop-blur-sm"
                    >
                      {article.category}
                    </Badge>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-xl font-light text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-3">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock size={12} />
                        <span>{article.readTime}</span>
                      </div>
                      <span className="flex items-center gap-1 text-primary text-xs font-medium group-hover:gap-2 transition-all duration-200">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No articles in this category yet.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center py-16 bg-secondary/30 rounded-2xl border border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl font-light text-foreground mb-3">Ready to Experience Healing?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Reading about pranic healing is just the beginning. A session is where the real transformation happens.
          </p>
          <Link href="/book" data-testid="link-blog-cta-book">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-5 text-base">
              Book a Session
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
