import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted py-12 mt-auto border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-serif text-2xl font-medium text-primary">Pranic Healing</h3>
            <p className="text-muted-foreground max-w-sm">
              A comprehensive pranic healing resource that guides you from curiosity to transformation. Discover the power of subtle energy to heal physical, emotional, and mental ailments.
            </p>
            <div className="flex gap-4 text-muted-foreground pt-2">
              <a href="#" className="hover:text-primary transition-colors" data-testid="link-social-facebook"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors" data-testid="link-social-instagram"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors" data-testid="link-social-twitter"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors" data-testid="link-social-mail"><Mail size={20} /></a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">Explore</h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link href="/what-is-pranic-healing" className="hover:text-primary transition-colors" data-testid="link-footer-what-is">What is Pranic Healing</Link>
              <Link href="/services" className="hover:text-primary transition-colors" data-testid="link-footer-services">Services</Link>
              <Link href="/videos" className="hover:text-primary transition-colors" data-testid="link-footer-videos">Videos</Link>
              <Link href="/gallery" className="hover:text-primary transition-colors" data-testid="link-footer-gallery">Gallery</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">Support</h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link href="/testimonials" className="hover:text-primary transition-colors" data-testid="link-footer-testimonials">Testimonials</Link>
              <Link href="/faq" className="hover:text-primary transition-colors" data-testid="link-footer-faq">FAQ</Link>
              <Link href="/book" className="hover:text-primary transition-colors" data-testid="link-footer-book">Book a Session</Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p data-testid="text-copyright">&copy; {new Date().getFullYear()} Pranic Healing Sanctuary. All rights reserved.</p>
          <p className="italic font-serif text-base text-primary">"Healing is a matter of time, but it is sometimes also a matter of opportunity."</p>
        </div>
      </div>
    </footer>
  );
}
