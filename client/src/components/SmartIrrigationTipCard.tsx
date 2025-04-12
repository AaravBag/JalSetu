import { Lightbulb, Check, Sparkles, ArrowRight } from "lucide-react";
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
        <div className="rounded-full bg-amber-100 p-1 mr-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
        </div>
        Smart Irrigation Tip
      </h3>
      
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-lg overflow-hidden border-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full -mr-10 -mt-10 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-yellow-200 rounded-full -ml-10 -mb-10 opacity-10"></div>
        
        <CardContent className="p-5 relative">
          <div className="flex">
            <div className="mr-4 mt-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 shadow-sm border border-amber-200 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-amber-500" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center">
                <h4 className="font-bold text-gray-800">AI-Powered Suggestion</h4>
                <div className="ml-2 flex-shrink-0 h-5 px-2 rounded-full bg-amber-200 text-amber-700 text-[10px] font-bold flex items-center">
                  SMART
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1.5 mb-4">{tip}</p>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  className="rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 shadow-md hover:shadow-lg hover:opacity-90 transition-all"
                >
                  <Check className="h-3.5 w-3.5 mr-1.5" />
                  Apply suggestion
                </Button>
                
                <Button 
                  variant="outline" 
                  className="rounded-full text-xs font-semibold text-gray-700 bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
                >
                  See more tips
                  <ArrowRight className="h-3 w-3 ml-1.5" />
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
