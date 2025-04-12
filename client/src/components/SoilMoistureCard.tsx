import { Shrub } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
}

const SoilMoistureCard = ({ 
  moistureLevel = 68, 
  moistureStatus = "Ideal Moisture Level", 
  fieldReadings = [] 
}: SoilMoistureCardProps) => {
  // Calculate the stroke-dashoffset based on the moisture level
  const calculateOffset = (percent: number) => {
    const circumference = 2 * Math.PI * 40;
    return circumference - (percent / 100) * circumference;
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-primary bg-opacity-20 text-primary";
      case "warning":
        return "bg-status-warning bg-opacity-20 text-status-warning";
      case "danger":
        return "bg-status-danger bg-opacity-20 text-status-danger";
      default:
        return "bg-primary bg-opacity-20 text-primary";
    }
  };

  // Default field readings if none provided
  const defaultFieldReadings: FieldReading[] = [
    { id: 1, name: "Field 1", value: 68, status: "optimal" },
    { id: 2, name: "Field 2", value: 45, status: "warning" }
  ];

  const readings = fieldReadings.length ? fieldReadings : defaultFieldReadings;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3 flex items-center">
        <Shrub className="h-5 w-5 text-primary mr-2" />
        Soil Moisture
      </h3>
      
      <Card className="bg-neutral-light rounded-2xl shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="w-24 h-24 relative flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  className="text-gray-200" 
                  strokeWidth="10" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="40" 
                  cx="50" 
                  cy="50"
                />
                <circle 
                  className="text-primary" 
                  strokeWidth="10" 
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
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">{moistureLevel}%</span>
              </div>
            </div>
            
            <div className="flex-1 ml-4">
              <h4 className="font-bold">{moistureStatus}</h4>
              <p className="text-sm text-gray-600">
                Current soil moisture is optimal for your crops.
              </p>
              <div className="mt-2 flex space-x-2">
                {readings.map((field) => (
                  <span 
                    key={field.id}
                    className={`px-2 py-1 rounded-lg text-xs ${getStatusClass(field.status)}`}
                  >
                    {field.name}: {field.value}%
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SoilMoistureCard;
