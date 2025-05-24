import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Lightbulb, Check, Sparkles, Calendar, Clock, Droplet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";

const IrrigationTipsDetails = () => {
  // Get the farm ID from the URL
  const [, params] = useRoute("/irrigation-tips/:id");
  const farmId = params?.id ? parseInt(params.id) : 1;
  
  // Fetch detailed irrigation tips data
  const { data: tipData, isLoading } = useQuery({
    queryKey: [`/api/farm/${farmId}/irrigation-tips`],
  });
  
  // Default tip if none provided
  const defaultTip = "Based on your soil type and current moisture levels, water your crops early morning (5-7 AM) to minimize evaporation and maximize absorption.";
  
  const tip = tipData?.tip || defaultTip;
  
  // Additional tips
  const additionalTips = [
    {
      title: "Use Drip Irrigation",
      description: "For vegetable crops, switch to drip irrigation to reduce water usage by up to 30% while maintaining optimal soil moisture.",
      category: "water-saving"
    },
    {
      title: "Mulching Benefits",
      description: "Apply organic mulch around plants to reduce evaporation, suppress weeds, and maintain soil temperature.",
      category: "soil-health"
    },
    {
      title: "Irrigation Timing",
      description: "Water deeply but less frequently to encourage deeper root growth and drought resistance in your crops.",
      category: "scheduling"
    }
  ];
  
  // Scheduled irrigation events
  const scheduledEvents = [
    { field: "Field 1", date: "May 26", time: "06:00 AM", status: "scheduled" },
    { field: "Field 2", date: "May 24", time: "05:30 AM", status: "scheduled" }
  ];
  
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 pb-20 transition-colors duration-300">
      <Header />
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto z-10">
        <div className="flex items-center mb-5">
          <Link href="/" className="mr-3">
            <div className="w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800 flex items-center justify-center shadow-sm">
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
          </Link>
          <h1 className="text-xl font-bold">Smart Irrigation Tips</h1>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
            <div className="h-60 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Current Recommendation Card */}
            <div className="slide-in-right">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-amber-100 p-1 mr-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                </div>
                Today's Recommendation
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
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Additional Tips Card */}
            <div className="slide-in-left">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-green-100 p-1 mr-2">
                  <Lightbulb className="h-4 w-4 text-green-500" />
                </div>
                More Smart Tips
              </h3>
              
              <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
                <CardContent className="p-5">
                  <div className="space-y-4">
                    {additionalTips.map((tip, index) => (
                      <div key={index} className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm">
                        <div className="flex items-start">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 
                            ${tip.category === 'water-saving' 
                              ? 'bg-blue-50 text-blue-500' 
                              : tip.category === 'soil-health' 
                                ? 'bg-green-50 text-green-500' 
                                : 'bg-purple-50 text-purple-500'}`}>
                            {tip.category === 'water-saving' ? (
                              <Droplet className="h-4 w-4" />
                            ) : tip.category === 'soil-health' ? (
                              <Sparkles className="h-4 w-4" />
                            ) : (
                              <Clock className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1">{tip.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{tip.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Scheduled Irrigation Card */}
            <div className="fade-in">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-blue-100 p-1 mr-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                </div>
                Scheduled Irrigation
              </h3>
              
              <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
                <CardContent className="p-5">
                  <div className="space-y-3">
                    {scheduledEvents.map((event, index) => (
                      <div key={index} className={`flex justify-between items-center ${index !== scheduledEvents.length - 1 ? 'pb-3 border-b border-gray-100 dark:border-gray-700' : ''}`}>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">{event.field}</h4>
                          <div className="flex items-center mt-1">
                            <Calendar className="h-3 w-3 text-gray-500 mr-1.5" />
                            <span className="text-xs text-gray-500">{event.date}</span>
                            <Clock className="h-3 w-3 text-gray-500 ml-2 mr-1.5" />
                            <span className="text-xs text-gray-500">{event.time}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-500 font-medium">
                            {event.status === 'scheduled' ? 'Scheduled' : 'Completed'}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline" 
                        className="rounded-full text-xs font-semibold text-primary border-primary/20 shadow-sm hover:bg-primary/5"
                      >
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        Schedule New Irrigation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Irrigation Efficiency Card */}
            <div className="scale-in">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-indigo-100 p-1 mr-2">
                  <Droplet className="h-4 w-4 text-indigo-500" />
                </div>
                Irrigation Efficiency
              </h3>
              
              <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0 mb-6">
                <CardContent className="p-5">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium">Water Usage Efficiency</span>
                      <span className="text-xs font-semibold text-green-500">92%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">Your irrigation is 15% more efficient than regional average</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium">Water Saved This Month</span>
                      <span className="text-xs font-semibold text-green-500">43,200 L</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">By following AI recommendations, you've saved 43,200 liters of water</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default IrrigationTipsDetails;