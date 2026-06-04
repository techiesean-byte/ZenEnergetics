import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/what-is-pranic-healing", label: "What is Pranic Healing" },
    { href: "/services", label: "Services" },
    { href: "/videos", label: "Videos" },
    { href: "/gallery", label: "Gallery" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-medium tracking-wide text-primary" data-testid="link-home-logo">
          Pranic Healing
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-foreground/80"
              }`}
              data-testid={`link-desktop-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/book" data-testid="link-desktop-book">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
              Book Session
            </Button>
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-mobile-menu-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-foreground/80"
                }`}
                data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t">
              <Link href="/book" data-testid="link-mobile-book">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Book Session
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
