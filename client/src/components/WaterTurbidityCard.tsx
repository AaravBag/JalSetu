import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Droplet } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000';

interface Field {
  fieldName: string;
  value: number;
}

interface TurbidityResponse {
  currentTurbidity: number;
  fields: Field[];
}

const defaultFields: Field[] = [
  { fieldName: "Field 1", value: 1.0 },
  { fieldName: "Field 2", value: 1.0 }
];

const WaterTurbidityCard = () => {
  const [turbidity, setTurbidity] = useState<number>(1.0);
  const [fields, setFields] = useState<Field[]>(defaultFields);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching from:', `${API_BASE_URL}/api/turbidity`);
        const response = await fetch(`${API_BASE_URL}/api/turbidity`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const text = await response.text();
          console.error('Response not OK:', response.status, text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('Raw response:', text);
        
        const data = JSON.parse(text);
        console.log('Parsed data:', data);
        
        if (data && typeof data.currentTurbidity === 'number') {
          setTurbidity(data.currentTurbidity);
          if (Array.isArray(data.fields)) {
            setFields(data.fields);
          }
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching turbidity data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Card className="bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="p-6">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </Card>
    );
  }

  const circumference = 2 * Math.PI * 40;
  const progress = Math.min((turbidity / 5) * circumference, circumference);

  return (
    <Card className="bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50">
            <Droplet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Water Turbidity
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200 dark:text-gray-700 transition-colors duration-200"
              />
              <circle
                cx="64"
                cy="64"
                r="40"
                stroke="rgb(34, 197, 94)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                className="transition-all duration-500 text-green-500 dark:text-green-400"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-green-500 dark:text-green-400">
                {turbidity.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                NTU
              </span>
            </div>
          </div>

          <div className="flex-1 ml-8">
            <div className="mb-4">
              <h3 className="text-lg text-gray-900 dark:text-gray-100">Current Water Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Water turbidity is{" "}
                <span className="text-green-500 dark:text-green-400">
                  good
                </span>{" "}
                for use.
              </p>
            </div>

            <div className="space-y-3">
              {fields.map((field: Field, index: number) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">{field.fieldName}</span>
                    <span className="text-green-500 dark:text-green-400">
                      {field.value.toFixed(1)} NTU
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors duration-200">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-green-500 dark:bg-green-400"
                      style={{ width: `${(field.value / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WaterTurbidityCard; 