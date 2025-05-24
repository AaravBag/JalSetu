import { TestTube, Droplet, Scale, Thermometer, ArrowRight, Waves } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

interface QualityMetric {
  name: string;
  value: string | number;
  unit?: string;
  status: string;
  icon: "ph" | "tds" | "temp";
}

interface WaterQualityCardProps {
  qualityMetrics: QualityMetric[];
  farmId?: number;
}

const WaterQualityCard = ({ qualityMetrics = [], farmId = 1 }: WaterQualityCardProps) => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "ph":
        return <Droplet className="h-5 w-5 text-blue-500" />;
      case "tds":
        return <Scale className="h-5 w-5 text-blue-500" />;
      case "temp":
        return <Thermometer className="h-5 w-5 text-blue-600" />;
      default:
        return <Droplet className="h-5 w-5 text-blue-500" />;
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
      <h3 className="text-lg font-bold mb-3 flex items-center gradient-text">
        <div className="rounded-full bg-blue-100 p-1.5 mr-2 shadow-sm">
          <TestTube className="h-4 w-4 text-blue-600" />
        </div>
        Water Quality Status
      </h3>
      
      <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0 card-highlight enhanced-card">
        <CardContent className="p-5 relative">
          {/* Decorative wave */}
          <div className="absolute -bottom-6 -right-6 opacity-10">
            <Waves className="h-20 w-20 text-blue-500" />
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {metrics.map((metric, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-2xl p-3 flex flex-col items-center justify-center shadow-sm border border-gray-50 dark:border-gray-700 hover:shadow-md transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center mb-2 shadow-sm">
                  {getIcon(metric.icon)}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{metric.name}</span>
                <span className="font-bold text-lg text-gray-800 dark:text-white">{metric.value}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full mt-1 font-medium ${getStatusColor(metric.status)}`}>
                  {metric.unit || metric.status}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-right">
            <Link href={`/water-quality/${farmId}`} className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium transition-colors hover:bg-blue-600 shadow-sm">
              View Details
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterQualityCard;
