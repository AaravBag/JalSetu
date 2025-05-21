import React from 'react';
import { Droplet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FieldMoisture {
  id: number;
  name: string;
  percentage: number;
}

interface SoilMoistureCardProps {
  fields: FieldMoisture[];
}

const SoilMoistureCard = ({ fields }: SoilMoistureCardProps) => {
  const mainFieldPercentage = fields[0]?.percentage || 0;
  
  return (
    <Card className="bg-white dark:bg-gray-800 transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
            <Droplet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Soil Moisture
          </h2>
        </div>

        <div className="flex items-start gap-8">
          <div className="relative">
            <div className="w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  className="stroke-current text-gray-200 dark:text-gray-700"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  className="stroke-current text-blue-500 dark:text-blue-400 transition-all duration-1000 ease-in-out"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={`${2 * Math.PI * 60 * (1 - mainFieldPercentage / 100)}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {mainFieldPercentage}%
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">MOISTURE</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Ideal Moisture Level
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Current soil moisture is optimal for your crops.
            </p>
            
            <div className="space-y-3">
              {fields.map((field) => (
                <div key={field.id} className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Field {field.id}
                      </span>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {field.percentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-1000 ease-in-out"
                        style={{ width: `${field.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilMoistureCard;
