import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t" style={{ background: "linear-gradient(180deg, hsl(270 38% 88%) 0%, hsl(268 32% 86%) 100%)" }}>
      {/* Newsletter strip */}
      <div className="border-b border-border/60 py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-6">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">{t.newsletter.label}</p>
            <h4 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-2">
              {t.newsletter.headline}
            </h4>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {t.newsletter.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6 text-xs text-muted-foreground">
            {[t.newsletter.benefit_1, t.newsletter.benefit_2, t.newsletter.benefit_3].map(b => (
              <div key={b} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                <span>{b}</span>
              </div>
            ))}
          </div>
          <div className="max-w-md mx-auto">
            <NewsletterSignup variant="footer" />
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">{t.newsletter.privacy}</p>
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-2">
              <h3 className="font-serif text-2xl font-medium text-primary">Pranic Healing</h3>
              <p className="text-muted-foreground max-w-sm">{t.footer.tagline}</p>
              <div className="flex gap-4 text-muted-foreground pt-2">
                <a href="#" className="hover:text-primary transition-colors" data-testid="link-social-facebook"><Facebook size={20} /></a>
                <a href="#" className="hover:text-primary transition-colors" data-testid="link-social-instagram"><Instagram size={20} /></a>
                <a href="#" className="hover:text-primary transition-colors" data-testid="link-social-twitter"><Twitter size={20} /></a>
                <a href="#" className="hover:text-primary transition-colors" data-testid="link-social-mail"><Mail size={20} /></a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif text-lg font-medium">{t.footer.explore}</h4>
              <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
                <Link href="/what-is-pranic-healing" className="hover:text-primary transition-colors" data-testid="link-footer-what-is">{t.nav.what_is}</Link>
                <Link href="/services" className="hover:text-primary transition-colors" data-testid="link-footer-services">{t.nav.services}</Link>
                <Link href="/videos" className="hover:text-primary transition-colors" data-testid="link-footer-videos">{t.nav.videos}</Link>
                <Link href="/gallery" className="hover:text-primary transition-colors" data-testid="link-footer-gallery">{t.nav.gallery}</Link>
                <Link href="/blog" className="hover:text-primary transition-colors" data-testid="link-footer-blog">{t.nav.articles}</Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif text-lg font-medium">{t.footer.support}</h4>
              <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
                <Link href="/testimonials" className="hover:text-primary transition-colors" data-testid="link-footer-testimonials">{t.nav.testimonials}</Link>
                <Link href="/faq" className="hover:text-primary transition-colors" data-testid="link-footer-faq">{t.nav.faq}</Link>
                <Link href="/book" className="hover:text-primary transition-colors" data-testid="link-footer-book">{t.nav.book_session}</Link>
              </nav>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
            <p data-testid="text-copyright">&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
            <p className="italic font-serif text-base text-primary">{t.footer.quote}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
