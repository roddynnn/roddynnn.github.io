import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DocsPage from "./components/DocsPage";
import FAQPage from "./components/FAQPage"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/docs" element={
            <div className="min-h-screen bg-background">
              <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                      <a href="/" className="text-2xl font-bold">
                        <span className="text-foreground">Aqua</span>
                        <span className="text-primary">Link</span>
                      </a>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-muted-foreground hover:text-primary cursor-pointer">Docs</span>
                      <span className="text-muted-foreground hover:text-primary cursor-pointer" onClick={() => window.open('https://github.com/toddythenoobdud/aqualink', '_blank')}>GitHub</span>
                    </div>
                  </div>
                </div>
              </div>
              <DocsPage />
            </div>
          } />
          <Route path="/faq" element={
            <div className="min-h-screen bg-background">
              <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                      <a href="/" className="text-2xl font-bold">
                        <span className="text-foreground">Aqua</span>
                        <span className="text-primary">Link</span>
                      </a>
                    </div>
                    <div className="flex items-center space-x-4">
                      <a href="/docs" className="text-muted-foreground hover:text-primary cursor-pointer">Docs</a>
                      <span className="text-muted-foreground hover:text-primary cursor-pointer">FAQ</span>
                      <span className="text-muted-foreground hover:text-primary cursor-pointer" onClick={() => window.open('https://github.com/toddythenoobdud/aqualink', '_blank')}>GitHub</span>
                    </div>
                  </div>
                </div>
              </div>
              <FAQPage />
            </div>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;