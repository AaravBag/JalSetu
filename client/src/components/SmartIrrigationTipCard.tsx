import { Lightbulb, Check, Sparkles, ArrowRight, Droplet, Clock, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";

interface SmartIrrigationTipCardProps {
  tip: string;
  farmId?: number;
}

const SmartIrrigationTipCard = ({ 
  tip,
  farmId = 1
}: SmartIrrigationTipCardProps) => {
  const { t } = useLanguage();
  // Default tip if none is provided
  const displayTip = tip || "Based on your soil type and current moisture levels, water your crops early morning (5-7 AM) to minimize evaporation and maximize absorption.";
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3 flex items-center gradient-text">
        <div className="rounded-full bg-amber-100 p-1.5 mr-2 shadow-sm">
          <Lightbulb className="h-4 w-4 text-amber-600" />
        </div>
        Smart Irrigation Tip
      </h3>
      
      <Card className="gradient-amber rounded-3xl shadow-lg overflow-hidden border-0 card-highlight enhanced-card">
        <CardContent className="p-5 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full -mr-10 -mt-10 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-yellow-200 rounded-full -ml-10 -mb-10 opacity-10"></div>
          <div className="absolute top-5 right-5 opacity-20 floating" style={{ animationDelay: '0.5s' }}>
            <Droplet className="h-12 w-12 text-amber-300" />
          </div>
          <div className="absolute bottom-5 left-5 opacity-10 floating" style={{ animationDelay: '1.2s' }}>
            <Clock className="h-10 w-10 text-amber-400" />
          </div>
          
          <div className="flex relative z-10">
            <div className="mr-4 mt-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-md border border-amber-400 flex items-center justify-center pulse-effect">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center">
                <h4 className="font-bold text-white text-lg text-shadow">AI-Powered Suggestion</h4>
                <div className="ml-2 flex-shrink-0 h-5 px-2 rounded-full bg-amber-200 text-amber-800 text-[10px] font-bold flex items-center shadow-sm">
                  <Zap className="h-2.5 w-2.5 mr-0.5" />
                  SMART
                </div>
              </div>
              <p className="text-sm text-white/90 mt-2 mb-4">{displayTip}</p>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  className="rounded-full text-xs font-semibold bg-white text-amber-700 border-0 shadow-md hover:shadow-lg hover:bg-white/90 transition-all"
                >
                  <Check className="h-3.5 w-3.5 mr-1.5" />
                  Apply suggestion
                </Button>
                
                <Link href={`/irrigation-tips/${farmId}`}>
                  <Button 
                    variant="outline" 
                    className="rounded-full text-xs font-semibold text-white bg-amber-600/30 backdrop-blur-sm border border-white/20 shadow-sm hover:bg-amber-600/40"
                  >
                    View Details
                    <ArrowRight className="h-3 w-3 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartIrrigationTipCard;
