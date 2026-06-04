import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
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
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
