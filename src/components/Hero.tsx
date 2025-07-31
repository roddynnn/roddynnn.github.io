import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Package, Star, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [npmStats, setNpmStats] = useState({
    weeklyDownloads: null,
    version: null,
    loading: true,
    error: null
  });

  const handleGetStarted = () => {
    window.location.href = '/docs';
  };

  const handleFAQ = () => {
    window.location.href = '/faq';
  };

  const handleJoinDiscord = () => {
    window.open('https://discord.gg/UKNDx2JWa5', '_blank');
  };

  // Format numbers with K/M suffixes
  const formatDownloads = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num?.toString() || '0';
  };

  // Fetch npm stats
  useEffect(() => {
    const fetchNpmStats = async () => {
      try {
        setNpmStats(prev => ({ ...prev, loading: true, error: null }));
        
        // Fetch package info and download stats in parallel
        const [packageResponse, downloadsResponse] = await Promise.all([
          fetch('https://registry.npmjs.org/aqualink'),
          fetch('https://api.npmjs.org/downloads/point/last-week/aqualink')
        ]);

        if (!packageResponse.ok || !downloadsResponse.ok) {
          throw new Error('Failed to fetch npm data');
        }

        const [packageData, downloadsData] = await Promise.all([
          packageResponse.json(),
          downloadsResponse.json()
        ]);

        setNpmStats({
          weeklyDownloads: downloadsData.downloads,
          version: packageData['dist-tags']?.latest || 'N/A',
          loading: false,
          error: null
        });

      } catch (error) {
        console.error('Error fetching npm stats:', error);
        setNpmStats({
          weeklyDownloads: null,
          version: null,
          loading: false,
          error: 'Failed to load stats'
        });
      }
    };

    fetchNpmStats();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Network pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/95 to-background/90" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="text-foreground">The Ultimate</span>
          <br />
          <span className="text-foreground">Lavalink</span>
          <br />
          <span className="text-primary bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent animate-pulse">
            Wrapper
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
          Reimagining audio streaming for Discord. Experience crystal-clear audio with 
          unmatched stability and industry-leading performance.
        </p>
        
        {/* Stats Badges with real npm data */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 hover:bg-slate-700/50 transition-colors">
            <Download className="w-3 h-3 text-primary" />
            <span className="text-muted-foreground">DOWNLOADS</span>
            {npmStats.loading ? (
              <Loader2 className="w-3 h-3 animate-spin text-primary" />
            ) : (
              <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-bold">
                {npmStats.error ? 'N/A' : `${formatDownloads(npmStats.weeklyDownloads)}/WEEK`}
              </span>
            )}
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 hover:bg-slate-700/50 transition-colors">
            <Package className="w-3 h-3 text-primary" />
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-bold">NPM</span>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 px-3 py-1 text-xs font-medium rounded-md hover:bg-slate-700/50 transition-colors">
            {npmStats.loading ? (
              <Loader2 className="w-3 h-3 animate-spin text-primary" />
            ) : (
              <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-bold">
                {npmStats.error ? 'VERSION N/A' : `V${npmStats.version}`}
              </span>
            )}
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 hover:bg-slate-700/50 transition-colors">
            <Star className="w-3 h-3 text-yellow-400" />
            <span className="text-muted-foreground">STARS</span>
            <span className="bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded text-xs font-bold">4</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={handleGetStarted}
            className="text-lg px-8 py-3 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 rounded-lg font-medium shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Button>
          <Button 
            variant="outline"
            size="lg"
            onClick={handleFAQ}
            className="text-lg px-8 py-3 rounded-lg font-medium border-primary/30 hover:bg-primary/10 hover:border-primary/50 backdrop-blur-sm transition-all duration-300"
          >
            FAQ
          </Button>
          <Button 
            variant="secondary"
            size="lg"
            onClick={handleJoinDiscord}
            className="text-lg px-8 py-3 rounded-lg font-medium bg-slate-700/50 hover:bg-slate-600/50 backdrop-blur-sm transition-all duration-300"
          >
            Join Discord Server
          </Button>
        </div>

        {/* Error message for debugging */}
        {npmStats.error && (
          <p className="text-red-400 text-sm mt-4 opacity-75">
            Note: Live stats temporarily unavailable
          </p>
        )}
      </div>
    </section>
  );
};

export default Hero;