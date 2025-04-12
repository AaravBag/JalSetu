import { TestTube, Droplet, Scale, Thermometer } from "lucide-react";
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
        return "text-status-success";
      case "warm":
      case "warning":
        return "text-status-warning";
      case "bad":
      case "danger":
        return "text-status-danger";
      default:
        return "text-gray-500";
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
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3 flex items-center">
        <TestTube className="h-5 w-5 text-secondary mr-2" />
        Water Quality Status
      </h3>
      
      <Card className="bg-neutral-light rounded-2xl shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-3">
            {metrics.map((metric, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-3 flex flex-col items-center justify-center"
              >
                <div className="w-9 h-9 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center mb-2">
                  {getIcon(metric.icon)}
                </div>
                <span className="text-sm text-gray-500">{metric.name}</span>
                <span className="font-bold text-lg">{metric.value}</span>
                <span className={`text-xs ${getStatusColor(metric.status)}`}>
                  {metric.unit || metric.status}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-3 text-right">
            <a href="#" className="text-secondary text-sm font-semibold flex items-center justify-end">
              View Details
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterQualityCard;
