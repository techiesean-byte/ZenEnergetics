import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ContactWidget } from "../ContactWidget";
import { RatingBadge } from "../RatingBadge";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ContactWidget />
      <RatingBadge />
    </div>
  );
}
