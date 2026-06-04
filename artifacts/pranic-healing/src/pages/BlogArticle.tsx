import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getArticleBySlug, articles } from "@/data/articles";
import type { Section } from "@/data/articles";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function renderSection(section: Section, index: number) {
  switch (section.type) {
    case "paragraph":
      return (
        <p key={index} className="text-foreground/80 text-lg leading-relaxed mb-6">
          {section.content}
        </p>
      );
    case "heading":
      return (
        <h2 key={index} className="font-serif text-2xl md:text-3xl font-light text-foreground mt-10 mb-4">
          {section.content}
        </h2>
      );
    case "subheading":
      return (
        <h3 key={index} className="font-serif text-xl font-medium text-foreground mt-8 mb-3">
          {section.content}
        </h3>
      );
    case "quote":
      return (
        <blockquote key={index} className="my-8 pl-6 border-l-4 border-primary">
          <p className="font-serif text-xl md:text-2xl font-light italic text-foreground/75 leading-relaxed">
            "{section.content}"
          </p>
        </blockquote>
      );
    case "list":
      return (
        <ul key={index} className="my-6 space-y-3">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-foreground/80 text-base leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default function BlogArticle() {
  const params = useParams<{ slug: string }>();
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
        <h1 className="font-serif text-4xl font-light text-foreground">Article Not Found</h1>
        <p className="text-muted-foreground">The article you are looking for does not exist.</p>
        <Link href="/blog">
          <Button variant="outline">Back to Articles</Button>
        </Link>
      </div>
    );
  }

  const related = articles
    .filter(a => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);
  const fallback = articles.filter(a => a.slug !== article.slug).slice(0, 3);
  const relatedArticles = related.length > 0 ? related : fallback;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative w-full h-72 md:h-[420px] overflow-hidden">
        <img
          src={article.heroImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-3xl -mt-16 relative z-10 pb-24">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>

          {/* Back link */}
          <motion.div variants={fadeInUp} className="mb-8">
            <Link href="/blog" data-testid="link-back-to-blog">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                <ArrowLeft size={14} />
                Back to Articles
              </span>
            </Link>
          </motion.div>

          {/* Meta */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="secondary" className="text-xs font-medium">{article.category}</Badge>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock size={13} />
              <span>{article.readTime}</span>
            </div>
            <span className="text-sm text-muted-foreground">{article.publishedDate}</span>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fadeInUp} className="font-serif text-3xl md:text-5xl font-light text-foreground mb-4 leading-tight">
            {article.title}
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed mb-10 font-light italic">
            {article.subtitle}
          </motion.p>

          <Separator className="mb-10" />

          {/* Body */}
          <motion.div variants={fadeInUp}>
            {article.body.map((section, i) => renderSection(section, i))}
          </motion.div>

          <Separator className="my-12" />

          {/* CTA */}
          <motion.div
            variants={fadeInUp}
            className="bg-secondary/30 border border-border rounded-2xl p-8 text-center mb-16"
          >
            <h3 className="font-serif text-2xl font-light text-foreground mb-2">
              Ready to experience this for yourself?
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              A one-on-one session with a trained pranic healer is the most direct way to understand what you have been reading about.
            </p>
            <Link href="/book" data-testid="link-article-cta-book">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                Book a Session
              </Button>
            </Link>
          </motion.div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <motion.div variants={fadeInUp}>
              <h2 className="font-serif text-2xl font-light text-foreground mb-6">Continue Reading</h2>
              <div className="grid gap-4">
                {relatedArticles.map(related => (
                  <Link key={related.slug} href={`/blog/${related.slug}`} data-testid={`link-related-${related.slug}`}>
                    <div className="group flex gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-sm transition-shadow duration-200">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={related.heroImage} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Badge variant="secondary" className="text-xs mb-1">{related.category}</Badge>
                        <h4 className="font-serif text-base font-light text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
                          {related.title}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Clock size={11} />
                          <span>{related.readTime}</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground self-center flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
