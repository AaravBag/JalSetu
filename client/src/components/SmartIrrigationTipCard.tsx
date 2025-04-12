import { Lightbulb, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SmartIrrigationTipCardProps {
  tip: string;
}

const SmartIrrigationTipCard = ({ 
  tip = "Based on your soil type and current moisture levels, water your crops early morning (5-7 AM) to minimize evaporation and maximize absorption." 
}: SmartIrrigationTipCardProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3 flex items-center">
        <Lightbulb className="h-5 w-5 text-accent mr-2" />
        Smart Irrigation Tip
      </h3>
      
      <Card className="bg-accent bg-opacity-10 rounded-2xl shadow-sm">
        <CardContent className="p-4">
          <div className="flex">
            <div className="mr-3 mt-1">
              <div className="w-8 h-8 rounded-full bg-accent bg-opacity-20 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-accent" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-1h10M7.3 7.7a6 6 0 0 1 8.4 0m-8.4 4a2 2 0 0 1 2-2c.6 0 1.4 0 2 .7.6-.7 1.4-.7 2-.7a2 2 0 0 1 2 2c0 2-3 5-4 5s-4-3-4-5z" 
                  />
                </svg>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-accent">AI Suggestion</h4>
              <p className="text-sm text-neutral-dark">{tip}</p>
              
              <div className="mt-3 flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full text-xs font-semibold text-accent border border-accent"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Apply suggestion
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full text-xs font-semibold text-gray-500 border border-gray-300"
                >
                  See more
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartIrrigationTipCard;
