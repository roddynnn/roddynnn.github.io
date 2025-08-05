import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDocsClick = () => {
    window.location.href = '/docs';
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/toddythenoobdud/aqualink', '_blank');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0">
            <span className="text-2xl font-bold whitespace-nowrap">
              <span className="text-foreground">Aqua</span>
              <span className="text-primary">Link</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Button 
                variant="ghost" 
                onClick={handleDocsClick}
                className="text-muted-foreground hover:text-primary hover:bg-transparent"
              >
                Docs
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleGitHubClick}
                className="text-muted-foreground hover:text-primary hover:bg-transparent"
              >
                GitHub
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card/50 rounded-lg mt-2">
              <Button 
                variant="ghost" 
                onClick={handleDocsClick}
                className="w-full justify-start text-muted-foreground hover:text-primary"
              >
                Docs
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleGitHubClick}
                className="w-full justify-start text-muted-foreground hover:text-primary"
              >
                GitHub
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
