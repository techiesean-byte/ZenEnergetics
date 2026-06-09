import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getArticleBySlug, articles as localArticles } from "@/data/articles";
import type { Section } from "@/data/articles";
import { fetchArticleBySlug, urlFor, type SanityArticle } from "@/lib/sanity";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function renderSection(section: Section, index: number) {
  switch (section.type) {
    case "paragraph":
      return <p key={index} className="text-foreground/80 text-lg leading-relaxed mb-6">{section.content}</p>;
    case "heading":
      return <h2 key={index} className="font-serif text-2xl md:text-3xl font-light text-foreground mt-10 mb-4">{section.content}</h2>;
    case "subheading":
      return <h3 key={index} className="font-serif text-xl font-medium text-foreground mt-8 mb-3">{section.content}</h3>;
    case "quote":
      return (
        <blockquote key={index} className="my-8 pl-6 border-l-4 border-primary">
          <p className="font-serif text-xl md:text-2xl font-light italic text-foreground/75 leading-relaxed">"{section.content}"</p>
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

const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-foreground/80 text-lg leading-relaxed mb-6">{children}</p>,
    h2: ({ children }) => <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-6 border-l-4 border-primary">
        <p className="font-serif text-xl md:text-2xl font-light italic text-foreground/75 leading-relaxed">{children}</p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-6 space-y-3">{children}</ul>,
    number: ({ children }) => <ol className="my-6 space-y-3 list-decimal list-inside">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-foreground/80 text-base leading-relaxed">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="text-foreground/80 text-base leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
};

interface RelatedDisplay {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  heroImageUrl: string;
}

export default function BlogArticle() {
  const params = useParams<{ slug: string }>();
  const localArticle = getArticleBySlug(params.slug);
  const [sanityArticle, setSanityArticle] = useState<SanityArticle | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetchArticleBySlug(params.slug).then((a) => {
      if (a) setSanityArticle(a);
      setChecked(true);
    });
  }, [params.slug]);

  // Wait until Sanity check is done before showing 404
  const notFound = checked && !localArticle && !sanityArticle;

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
        <h1 className="font-serif text-4xl font-light text-foreground">Article Not Found</h1>
        <p className="text-muted-foreground">The article you are looking for does not exist.</p>
        <Link href="/blog"><Button variant="outline">Back to Articles</Button></Link>
      </div>
    );
  }

  // Sanity article takes precedence
  if (sanityArticle) {
    const heroUrl = sanityArticle.heroImageRef ? urlFor(sanityArticle.heroImageRef).width(1400).url() : "";
    const related: RelatedDisplay[] = localArticles
      .filter((a) => a.slug !== sanityArticle.slug && a.category === sanityArticle.category)
      .slice(0, 3)
      .map((a) => ({ slug: a.slug, title: a.title, category: a.category, readTime: a.readTime, heroImageUrl: a.heroImage as string }));

    return (
      <div className="min-h-screen bg-background">
        {heroUrl && (
          <div className="relative w-full h-72 md:h-[420px] overflow-hidden">
            <img src={heroUrl} alt={sanityArticle.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        )}
        <div className={`container mx-auto px-4 md:px-6 max-w-3xl ${heroUrl ? "-mt-16" : "pt-32"} relative z-10 pb-24`}>
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={fadeInUp} className="mb-8">
              <Link href="/blog" data-testid="link-back-to-blog">
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                  <ArrowLeft size={14} /> Back to Articles
                </span>
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant="secondary" className="text-xs font-medium">{sanityArticle.category}</Badge>
              {sanityArticle.readTime && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock size={13} /><span>{sanityArticle.readTime}</span>
                </div>
              )}
              {sanityArticle.publishedDate && <span className="text-sm text-muted-foreground">{sanityArticle.publishedDate}</span>}
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-serif text-3xl md:text-5xl font-light text-foreground mb-4 leading-tight">
              {sanityArticle.title}
            </motion.h1>
            {sanityArticle.subtitle && (
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed mb-10 font-light italic">
                {sanityArticle.subtitle}
              </motion.p>
            )}
            <Separator className="mb-10" />
            <motion.div variants={fadeInUp}>
              {sanityArticle.body?.length > 0
                ? <PortableText value={sanityArticle.body as Parameters<typeof PortableText>[0]["value"]} components={portableComponents} />
                : <p className="text-muted-foreground italic">This article has no body content yet.</p>
              }
            </motion.div>
            <ArticleCTA />
            {related.length > 0 && <RelatedSection articles={related} />}
          </motion.div>
        </div>
      </div>
    );
  }

  // Fallback to local article
  if (!localArticle) return null;

  const related: RelatedDisplay[] = localArticles
    .filter((a) => a.slug !== localArticle.slug && a.category === localArticle.category)
    .slice(0, 3)
    .map((a) => ({ slug: a.slug, title: a.title, category: a.category, readTime: a.readTime, heroImageUrl: a.heroImage as string }));
  const fallback = localArticles.filter((a) => a.slug !== localArticle.slug).slice(0, 3)
    .map((a) => ({ slug: a.slug, title: a.title, category: a.category, readTime: a.readTime, heroImageUrl: a.heroImage as string }));

  return (
    <div className="min-h-screen bg-background">
      <div className="relative w-full h-72 md:h-[420px] overflow-hidden">
        <img src={localArticle.heroImage as string} alt={localArticle.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
      <div className="container mx-auto px-4 md:px-6 max-w-3xl -mt-16 relative z-10 pb-24">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
          <motion.div variants={fadeInUp} className="mb-8">
            <Link href="/blog" data-testid="link-back-to-blog">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                <ArrowLeft size={14} /> Back to Articles
              </span>
            </Link>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="secondary" className="text-xs font-medium">{localArticle.category}</Badge>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground"><Clock size={13} /><span>{localArticle.readTime}</span></div>
            <span className="text-sm text-muted-foreground">{localArticle.publishedDate}</span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="font-serif text-3xl md:text-5xl font-light text-foreground mb-4 leading-tight">
            {localArticle.title}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed mb-10 font-light italic">
            {localArticle.subtitle}
          </motion.p>
          <Separator className="mb-10" />
          <motion.div variants={fadeInUp}>{localArticle.body.map((section, i) => renderSection(section, i))}</motion.div>
          <ArticleCTA />
          <RelatedSection articles={related.length > 0 ? related : fallback} />
        </motion.div>
      </div>
    </div>
  );
}

function ArticleCTA() {
  return (
    <>
      <Separator className="my-12" />
      <motion.div variants={fadeInUp} className="bg-secondary/30 border border-border rounded-2xl p-8 text-center mb-16">
        <h3 className="font-serif text-2xl font-light text-foreground mb-2">Ready to experience this for yourself?</h3>
        <p className="text-muted-foreground mb-6 text-sm">
          A one-on-one session with a trained pranic healer is the most direct way to understand what you have been reading about.
        </p>
        <Link href="/book" data-testid="link-article-cta-book">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">Book a Session</Button>
        </Link>
      </motion.div>
    </>
  );
}

function RelatedSection({ articles }: { articles: { slug: string; title: string; category: string; readTime: string; heroImageUrl: string }[] }) {
  if (!articles.length) return null;
  return (
    <motion.div variants={fadeInUp}>
      <h2 className="font-serif text-2xl font-light text-foreground mb-6">Continue Reading</h2>
      <div className="grid gap-4">
        {articles.map((related) => (
          <Link key={related.slug} href={`/blog/${related.slug}`} data-testid={`link-related-${related.slug}`}>
            <div className="group flex gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-sm transition-shadow duration-200">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img src={related.heroImageUrl} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <Badge variant="secondary" className="text-xs mb-1">{related.category}</Badge>
                <h4 className="font-serif text-base font-light text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {related.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Clock size={11} /><span>{related.readTime}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground self-center flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
