import React from 'react';
import { Card } from '@/components/ui/card';
import { Droplet, Scale, Eye } from 'lucide-react';
import { useWaterQualityAnimation } from '@/hooks/useAnime';

interface QualityMetric {
  name: string;
  value: string | number;
  status: string;
  icon: "ph" | "tds" | "clarity";
  unit?: string;
}

interface WaterQualityCardProps {
  metrics?: QualityMetric[];
}

const WaterQualityCard = ({ metrics }: WaterQualityCardProps) => {
  const cardRef = useWaterQualityAnimation(true);
  
  const defaultMetrics: QualityMetric[] = [
    { name: "pH Level", value: "6.8", status: "Good", icon: "ph" },
    { name: "TDS", value: "320", status: "Good", unit: "ppm", icon: "tds" },
    { name: "Clarity", value: "Clear", status: "Good", icon: "clarity" }
  ];

  const displayMetrics = metrics || defaultMetrics;

  const getIcon = (type: string) => {
    switch (type) {
      case 'ph':
        return <Droplet className="h-5 w-5 text-blue-500" />;
      case 'tds':
        return <Scale className="h-5 w-5 text-blue-500" />;
      case 'clarity':
        return <Eye className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'good':
        return 'text-green-500 dark:text-green-400';
      case 'moderate':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'bad':
        return 'text-red-500 dark:text-red-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  const getStatusText = (metric: QualityMetric) => {
    if (metric.unit) {
      return metric.unit;
    }
    return metric.status;
  };

  return (
    <div className="grid grid-cols-3 gap-4" ref={cardRef}>
      {displayMetrics.map((metric, index) => (
        <Card 
          key={index}
          className="bg-white dark:bg-gray-800 transition-colors duration-200"
        >
          <div className="p-4 flex flex-col items-center">
            <div className="icon-container p-2 rounded-full bg-gray-50 dark:bg-gray-700">
              {getIcon(metric.icon)}
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {metric.name}
            </p>
            <p className="value-display mt-1 text-xl font-semibold text-gray-900 dark:text-gray-100">
              {metric.value}
            </p>
            <p className={`mt-1 text-sm font-medium ${getStatusColor(metric.status)}`}>
              {getStatusText(metric)}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default WaterQualityCard;
