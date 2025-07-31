import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import QuickStart from "@/components/QuickStart";
import PerformanceFeatures from "@/components/PerformanceFeatures";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <PerformanceFeatures />
      <Features />
      <QuickStart />
      
      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 AquaLavalink. Built with ❤️ for the Discord community. Made by @lavalink.py
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;