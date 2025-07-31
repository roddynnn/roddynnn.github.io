import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Sliders, RotateCcw, Shield } from "lucide-react";

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

const PerformanceFeatures = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceFeatures.map((feature, index) => (
            <Card key={index} className="text-center border-border/50 hover:border-primary/30 transition-all duration-300 group">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                  <feature.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
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

export default PerformanceFeatures;