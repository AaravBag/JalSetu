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
    <div className="mb-20 -mt-8">
      <h3 className="text-lg font-bold mb-2 flex items-center text-gray-900 dark:text-gray-100">
        <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-1 mr-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
        </div>
        Smart Irrigation Tip
      </h3>
      
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl shadow-sm overflow-hidden border-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 dark:bg-yellow-500/10 rounded-full -mr-10 -mt-10 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-yellow-200 dark:bg-yellow-500/10 rounded-full -ml-10 -mb-10 opacity-10"></div>
        
        <CardContent className="p-4 relative">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/50 dark:to-amber-800/50 shadow-sm border border-amber-200 dark:border-amber-700 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-gray-900 dark:text-gray-100">AI-Powered Suggestion</h4>
                <div className="h-5 px-2 rounded-full bg-amber-200 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 text-[10px] font-bold flex items-center">
                  SMART
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 mb-3">{tip}</p>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  className="rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 shadow-sm hover:shadow-md hover:opacity-90 transition-all dark:from-amber-600 dark:to-amber-700"
                >
                  <Check className="h-3.5 w-3.5 mr-1.5" />
                  Apply suggestion
                </Button>
                
                <Button 
                  variant="outline" 
                  className="rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
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
