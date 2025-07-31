import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Music, Sliders, Radio, List, Link } from "lucide-react";

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

export default Features;