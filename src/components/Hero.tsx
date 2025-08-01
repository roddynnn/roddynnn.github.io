import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Package, Star, Loader2, Zap, Sliders, RotateCcw, Shield, Settings, Music, Radio, List, Link } from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const performanceFeatures = [
  {
    icon: Zap,
    title: "Full Performance Focused",
    description: "Optimized for maximum performance and minimal latency"
  },
  {
    icon: Sliders,
    title: "Filters Support", 
    description: "Comprehensive audio filter system with real-time processing"
  },
  {
    icon: RotateCcw,
    title: "True Node Auto Resume",
    description: "Seamless playback continuation across node connections"
  },
  {
    icon: Shield,
    title: "Stability",
    description: "Rock-solid reliability with extensive error handling"
  }
];

const features = [
  {
    icon: Settings,
    title: "Easy Setup",
    description: "Simple configuration with comprehensive options for nodes, failover, and auto-resume functionality."
  },
  {
    icon: Music,
    title: "Advanced Player",
    description: "Full-featured audio player with queue management, filters, lyrics support, and seamless playback controls."
  },
  {
    icon: Sliders,
    title: "Audio Filters",
    description: "Rich collection of audio effects including equalizer, karaoke, timescale, tremolo, and rotation filters."
  },
  {
    icon: Radio,
    title: "Event System",
    description: "Comprehensive event handling for track lifecycle, player updates, and queue management."
  },
  {
    icon: List,
    title: "Queue Management",
    description: "Powerful queue system with shuffle, loop modes, autoplay, and advanced track manipulation."
  },
  {
    icon: Link,
    title: "Node Failover",
    description: "Automatic failover between Lavalink nodes with configurable retry logic and connection management."
  }
];

const Hero = () => {
  const [npmStats, setNpmStats] = useState({
    weeklyDownloads: null,
    version: null,
    loading: true,
    error: null
  });

  const [typewriterText, setTypewriterText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = "Wrapper";

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

  // Typewriter effect - butter smooth
  useEffect(() => {
    const typeSpeed = 80;   // Super smooth typing
    const deleteSpeed = 60; // Even smoother deleting
    const pauseTime = 1200; // Shorter pause for flow

    const timeout = setTimeout(() => {
      if (!isDeleting && typewriterText.length < fullText.length) {
        // Typing
        setTypewriterText(fullText.slice(0, typewriterText.length + 1));
      } else if (!isDeleting && typewriterText.length === fullText.length) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && typewriterText.length > 0) {
        // Deleting
        setTypewriterText(fullText.slice(0, typewriterText.length - 1));
      } else if (isDeleting && typewriterText.length === 0) {
        // Start typing again
        setIsDeleting(false);
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, fullText]);

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
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Animated network pattern background */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="rgba(59, 130, 246, 0.3)" className="animate-pulse">
                <animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="20" cy="20" r="1.5" fill="rgba(168, 85, 247, 0.4)" className="animate-pulse">
                <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="80" cy="30" r="1" fill="rgba(34, 197, 94, 0.3)">
                <animate attributeName="r" values="0.5;2;0.5" dur="5s" repeatCount="indefinite" />
              </circle>
              <line x1="20" y1="20" x2="50" y2="50" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5">
                <animate attributeName="opacity" values="0;0.6;0" dur="3s" repeatCount="indefinite" />
              </line>
              <line x1="50" y1="50" x2="80" y2="30" stroke="rgba(168, 85, 247, 0.15)" strokeWidth="0.5">
                <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite" />
              </line>
            </pattern>
            <radialGradient id="glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#network)" />
          <rect width="100%" height="100%" fill="url(#glow)" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/70 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-green-400/50 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute top-1/6 right-1/3 w-1 h-1 bg-cyan-400/60 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/6 w-2 h-2 bg-blue-300/40 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
      </div>

      {/* Dynamic gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/25 to-blue-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s', animationDuration: '5s'}}></div>
      </div>

      {/* Overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-transparent to-slate-950/60" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="min-h-screen flex items-center justify-center text-center px-4 max-w-5xl mx-auto">
            <div>
                <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                <span className="text-foreground">The Ultimate</span>
                <br />
                <span className="text-foreground">Lavalink</span>
                <br />
                <span className="text-primary bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent transition-all duration-150 ease-out">
                    {typewriterText}
                    <span className="animate-pulse opacity-80">|</span>
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
        </div>
        <div className="py-24 px-4">
            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceFeatures.map((feature, index) => (
                    <Card key={index} className="text-center border-border/30 bg-slate-900/40 backdrop-blur-sm hover:border-primary/30 hover:bg-slate-800/50 transition-all duration-300 group">
                    <CardHeader>
                        <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit group-hover:bg-primary/20 transition-all duration-300">
                        <feature.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                        </div>
                        <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-sm text-muted-foreground">
                        {feature.description}
                        </CardDescription>
                    </CardContent>
                    </Card>
                ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30">
              <CardHeader>
                <div className="mb-4">
                  <feature.icon className="w-12 h-12 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const QuickStart = () => {
  const codeExample = `const { Aqua, Client } = require("discord.js");
const client = new Client({ intents: ["Guilds", "GuildVoiceStates"] });

const aqua = Aqua(client, [{
  host: "127.0.0.1",
  password: "yourpass",
  port: 233,
  secure: false,
  name: "localhost"
}], {
  defaultSearchPlatform: "ytsearch",
  restVersion: "v4"
});

client.aqua = aqua;

client.once("ready", () => aqua.init(client.user.id));

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("!play")) {
    const query = message.content.slice(6);
    const player = aqua.createConnection({
      guildId: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id
    });
    
    const resolve = await aqua.resolve({
      query,
      requester: message.member
    });
    
    if (resolve.loadType === 'track') {
      player.queue.add(resolve.tracks[0]);
      await message.channel.send(\`Added **\${resolve.tracks[0].info.title}** to the queue.\`);
      if (!player.playing) player.play();
    }
  }
});

client.login("Yourtokenhere");`;

  return (
    <section className="py-24 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Quick Start
          </h2>
        </div>
        
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Get up and running in minutes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="code-block">
              <pre className="text-sm">
                <code className="text-foreground">{codeExample}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Hero;