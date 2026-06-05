import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/what-is-pranic-healing", label: t.nav.what_is },
    { href: "/services", label: t.nav.services },
    { href: "/videos", label: t.nav.videos },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/testimonials", label: t.nav.testimonials },
    { href: "/faq", label: t.nav.faq },
    { href: "/packages", label: t.nav.packages },
    { href: "/blog", label: t.nav.articles },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0 flex flex-col leading-tight" data-testid="link-home-logo">
          <span className="font-serif text-2xl font-medium tracking-wide text-primary">Pranic Healing</span>
          <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Zen Energetics</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                location === link.href ? "text-primary" : "text-foreground/80"
              }`}
              data-testid={`link-desktop-${link.href.replace(/\//g, "-").replace(/^-/, "")}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSelector />
          <Link href="/book" data-testid="link-desktop-book">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium whitespace-nowrap">
              {t.nav.book_session}
            </Button>
          </Link>
        </div>

        {/* Mobile: language + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSelector />
          <button
            className="p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="lg:hidden border-t bg-background">
          <nav className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-foreground/80"
                }`}
                data-testid={`link-mobile-${link.href.replace(/\//g, "-").replace(/^-/, "")}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t">
              <Link href="/book" data-testid="link-mobile-book">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  {t.nav.book_session}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
