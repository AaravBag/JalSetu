import { Shrub, DropletIcon, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

interface FieldReading {
  id: number;
  name: string;
  value: number;
  status: "optimal" | "warning" | "danger";
}

interface SoilMoistureCardProps {
  moistureLevel: number;
  moistureStatus: string;
  fieldReadings: FieldReading[];
  farmId?: number;
}

const SoilMoistureCard = ({ 
  moistureLevel = 68, 
  moistureStatus = "Ideal Moisture Level", 
  fieldReadings = [],
  farmId = 1
}: SoilMoistureCardProps) => {
  // Calculate the stroke-dashoffset based on the moisture level
  const calculateOffset = (percent: number) => {
    const circumference = 2 * Math.PI * 40;
    return circumference - (percent / 100) * circumference;
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-primary/10 text-primary border-primary/20";
      case "warning":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "danger":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getMoistureColor = (level: number) => {
    if (level >= 60) return "text-primary";
    if (level >= 40) return "text-amber-500";
    return "text-red-500";
  };

  // Default field readings if none provided
  const defaultFieldReadings: FieldReading[] = [
    { id: 1, name: "Field 1", value: 68, status: "optimal" },
    { id: 2, name: "Field 2", value: 45, status: "warning" }
  ];

  const readings = fieldReadings.length ? fieldReadings : defaultFieldReadings;

  return (
    <div className="mb-5">
      <h3 className="text-lg font-bold mb-3 flex items-center">
        <div className="rounded-full bg-green-100 p-1 mr-2">
          <Shrub className="h-4 w-4 text-primary" />
        </div>
        Soil Moisture
      </h3>
      
      <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
        <CardContent className="p-5">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-[100px] h-[100px] relative flex items-center justify-center">
                <svg className="w-[100px] h-[100px] transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    className="text-gray-100" 
                    strokeWidth="8" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50"
                  />
                  <circle 
                    className={`${getMoistureColor(moistureLevel)}`}
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50"
                    strokeDasharray="251.2"
                    strokeDashoffset={calculateOffset(moistureLevel)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-2xl font-bold ${getMoistureColor(moistureLevel)}`}>
                    {moistureLevel}%
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium -mt-1">MOISTURE</span>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="absolute -right-1 top-1/4 opacity-20">
                  <DropletIcon className={`h-5 w-5 ${getMoistureColor(moistureLevel)}`} />
                </div>
                <div className="absolute -left-2 bottom-1/4 opacity-10">
                  <DropletIcon className={`h-8 w-8 ${getMoistureColor(moistureLevel)}`} />
                </div>
              </div>
            </div>
            
            <div className="flex-1 ml-5">
              <h4 className="font-bold text-gray-800">{moistureStatus}</h4>
              <p className="text-sm text-gray-600 mt-1">
                Current soil moisture is optimal for your crops.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {readings.map((field) => (
                  <span 
                    key={field.id}
                    className={`px-3 py-1 rounded-full text-xs border ${getStatusClass(field.status)} font-medium shadow-sm`}
                  >
                    {field.name}: {field.value}%
                  </span>
                ))}
              </div>
              
              <div className="mt-3 text-right">
                <Link href={`/soil-moisture/${farmId}`} className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium transition-colors hover:bg-primary/20">
                  View Details
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SoilMoistureCard;
