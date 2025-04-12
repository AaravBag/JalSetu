import { TestTube, Droplet, Scale, Thermometer, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface QualityMetric {
  name: string;
  value: string | number;
  unit?: string;
  status: string;
  icon: "ph" | "tds" | "temp";
}

interface WaterQualityCardProps {
  qualityMetrics: QualityMetric[];
}

const WaterQualityCard = ({ qualityMetrics = [] }: WaterQualityCardProps) => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "ph":
        return <Droplet className="h-5 w-5 text-secondary" />;
      case "tds":
        return <Scale className="h-5 w-5 text-secondary" />;
      case "temp":
        return <Thermometer className="h-5 w-5 text-accent" />;
      default:
        return <Droplet className="h-5 w-5 text-secondary" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "good":
        return "text-green-500 bg-green-50";
      case "warm":
      case "warning":
        return "text-amber-500 bg-amber-50";
      case "bad":
      case "danger":
        return "text-red-500 bg-red-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  // Default metrics if none provided
  const defaultMetrics: QualityMetric[] = [
    { name: "pH Level", value: "6.8", status: "Good", icon: "ph" },
    { name: "TDS", value: "320", unit: "ppm", status: "Good", icon: "tds" },
    { name: "Temp", value: "28°C", status: "Warm", icon: "temp" }
  ];

  const metrics = qualityMetrics.length ? qualityMetrics : defaultMetrics;

  return (
    <div className="mb-5">
      <h3 className="text-lg font-bold mb-3 flex items-center">
        <div className="rounded-full bg-blue-100 p-1 mr-2">
          <TestTube className="h-4 w-4 text-secondary" />
        </div>
        Water Quality Status
      </h3>
      
      <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
        <CardContent className="p-5">
          <div className="grid grid-cols-3 gap-3">
            {metrics.map((metric, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center shadow-sm border border-gray-50"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mb-2">
                  {getIcon(metric.icon)}
                </div>
                <span className="text-xs text-gray-500 font-medium">{metric.name}</span>
                <span className="font-bold text-lg">{metric.value}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full mt-1 font-medium ${getStatusColor(metric.status)}`}>
                  {metric.unit || metric.status}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-right">
            <a href="#" className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium transition-colors hover:bg-secondary/20">
              View Details
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterQualityCard;
