import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Layout } from "@/components/layout/Layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import WhatIsPranicHealing from "@/pages/WhatIsPranicHealing";
import FAQ from "@/pages/FAQ";
import Videos from "@/pages/Videos";
import Gallery from "@/pages/Gallery";
import Services from "@/pages/Services";
import Testimonials from "@/pages/Testimonials";
import Book from "@/pages/Book";
import Blog from "@/pages/Blog";
import BlogArticle from "@/pages/BlogArticle";
import About from "@/pages/About";
import Packages from "@/pages/Packages";
import FutureCollective from "@/pages/FutureCollective";
import { FeedbackWidget } from "@/components/FeedbackWidget";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location]);
  return null;
}

function Router() {
  return (
    <Layout>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/what-is-pranic-healing" component={WhatIsPranicHealing} />
        <Route path="/faq" component={FAQ} />
        <Route path="/videos" component={Videos} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/services" component={Services} />
        <Route path="/testimonials" component={Testimonials} />
        <Route path="/book" component={Book} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogArticle} />
        <Route path="/about" component={About} />
        <Route path="/packages" component={Packages} />
        <Route path="/future-collective" component={FutureCollective} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <FeedbackWidget />
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
