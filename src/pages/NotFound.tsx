import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  // Simulate location for demo - in real app, you'd use useLocation from react-router-dom
  const location = { pathname: window.location.pathname };

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full mb-6">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>
        </div>

        {/* Large 404 Text */}
        <h1 className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have vanished into the digital void. 
          Let's get you back on track.
        </p>

        {/* Requested Path Display */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 mb-8">
          <p className="text-sm text-muted-foreground mb-2">Requested Path:</p>
          <code className="text-red-400 bg-slate-900/50 px-3 py-1 rounded text-sm">
            {location.pathname}
          </code>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={handleGoHome}
            className="text-lg px-8 py-3 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 rounded-lg font-medium shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="text-lg px-8 py-3 rounded-lg font-medium border-slate-600/50 hover:bg-slate-700/30 hover:border-slate-500/50 backdrop-blur-sm transition-all duration-300"
          >
            Go Back
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-slate-700/30">
          <p className="text-sm text-muted-foreground mb-4">
            Still having trouble? Try these options:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a 
              href="/docs" 
              className="text-primary hover:text-primary/80 underline transition-colors"
            >
              Documentation
            </a>
            <a 
              href="/faq" 
              className="text-primary hover:text-primary/80 underline transition-colors"
            >
              FAQ
            </a>
            <a 
              href="https://discord.gg/UKNDx2JWa5" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline transition-colors"
            >
              Discord Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;