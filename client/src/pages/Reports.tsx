import { BarChart2, ArrowRight, FileText, Calendar, FilterX, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { darkMode } = useTheme();
  const { toast } = useToast();
  const [activeReport, setActiveReport] = useState<string | null>(null);
  
  // Sample data for reports
  const waterUsageData = [
    { name: "Jan", irrigation: 40, rainfall: 24 },
    { name: "Feb", irrigation: 30, rainfall: 28 },
    { name: "Mar", irrigation: 25, rainfall: 32 },
    { name: "Apr", irrigation: 35, rainfall: 20 },
    { name: "May", irrigation: 50, rainfall: 15 },
    { name: "Jun", irrigation: 45, rainfall: 10 },
    { name: "Jul", irrigation: 60, rainfall: 5 },
  ];
  
  const soilHealthData = [
    { name: "Jan", moisture: 75, nitrogen: 40, phosphorus: 30 },
    { name: "Feb", moisture: 80, nitrogen: 45, phosphorus: 32 },
    { name: "Mar", moisture: 70, nitrogen: 42, phosphorus: 28 },
    { name: "Apr", moisture: 65, nitrogen: 38, phosphorus: 25 },
    { name: "May", moisture: 60, nitrogen: 35, phosphorus: 24 },
    { name: "Jun", moisture: 55, nitrogen: 32, phosphorus: 22 },
    { name: "Jul", moisture: 50, nitrogen: 30, phosphorus: 20 },
  ];
  
  const seasonalData = [
    { name: "2022", yield: 80, efficiency: 65, water: 70 },
    { name: "2023", yield: 85, efficiency: 70, water: 75 },
    { name: "2024", yield: 90, efficiency: 75, water: 80 },
    { name: "2025", yield: 95, efficiency: 80, water: 85 },
  ];
  
  const handleViewDetails = (reportType: string) => {
    setActiveReport(reportType);
    toast({
      title: `${reportType} Details`,
      description: `Viewing detailed ${reportType.toLowerCase()} report data.`
    });
  };
  
  const handleBackToReports = () => {
    setActiveReport(null);
  };
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 pb-20 transition-colors duration-300">
      {/* Decorative top background pattern */}
      <div className="absolute top-0 left-0 right-0 h-56 overflow-hidden z-0 opacity-40">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary opacity-10 animate-pulse"></div>
        <div className="absolute top-20 -left-10 w-36 h-36 rounded-full bg-secondary opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <header className="px-6 pt-12 pb-4 relative z-10">
        <div className="flex items-center justify-between">
          {activeReport ? (
            <button 
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              onClick={handleBackToReports}
            >
              <ChevronRight className="h-5 w-5 rotate-180 mr-1" />
              <span className="text-sm font-medium">Back to Reports</span>
            </button>
          ) : (
            <div className="fade-in">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Reports
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Track your farm performance</p>
            </div>
          )}
          <div className="h-10 w-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm">
            <FilterX className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      </header>
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto z-10">
        {activeReport ? (
          // Detailed report view
          <div className="space-y-6 slide-in-right">
            <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
              <CardContent className="p-5">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  {activeReport} Details
                </h2>
                
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={
                        activeReport === "Water Usage" 
                          ? waterUsageData 
                          : activeReport === "Soil Health" 
                            ? soilHealthData 
                            : seasonalData
                      }
                      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: darkMode ? '#e5e7eb' : '#4b5563' }}
                      />
                      <YAxis 
                        tick={{ fill: darkMode ? '#e5e7eb' : '#4b5563' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                          borderColor: darkMode ? '#374151' : '#e5e7eb',
                          color: darkMode ? '#e5e7eb' : '#374151'
                        }} 
                      />
                      <Legend />
                      
                      {activeReport === "Water Usage" && (
                        <>
                          <Line 
                            type="monotone" 
                            dataKey="irrigation" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            activeDot={{ r: 6 }} 
                            animationDuration={1500}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="rainfall" 
                            stroke="#60a5fa" 
                            strokeWidth={2}
                            animationDuration={1500} 
                            animationBegin={300}
                          />
                        </>
                      )}
                      
                      {activeReport === "Soil Health" && (
                        <>
                          <Line 
                            type="monotone" 
                            dataKey="moisture" 
                            stroke="#10b981" 
                            strokeWidth={2}
                            activeDot={{ r: 6 }} 
                            animationDuration={1500}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="nitrogen" 
                            stroke="#34d399" 
                            strokeWidth={2}
                            animationDuration={1500} 
                            animationBegin={300}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="phosphorus" 
                            stroke="#6ee7b7" 
                            strokeWidth={2}
                            animationDuration={1500} 
                            animationBegin={600}
                          />
                        </>
                      )}
                      
                      {activeReport === "Seasonal Analytics" && (
                        <>
                          <Line 
                            type="monotone" 
                            dataKey="yield" 
                            stroke="#f59e0b" 
                            strokeWidth={2}
                            activeDot={{ r: 6 }} 
                            animationDuration={1500}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="efficiency" 
                            stroke="#fbbf24" 
                            strokeWidth={2}
                            animationDuration={1500} 
                            animationBegin={300}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="water" 
                            stroke="#fcd34d" 
                            strokeWidth={2}
                            animationDuration={1500} 
                            animationBegin={600}
                          />
                        </>
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 bg-white/30 dark:bg-gray-800/30 p-4 rounded-xl">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Analysis</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activeReport === "Water Usage" 
                      ? "Water usage trends show increasing irrigation needs in drier months. Consider optimizing irrigation schedules and investing in rain water harvesting." 
                      : activeReport === "Soil Health" 
                        ? "Soil moisture levels are declining. Nitrogen and phosphorus levels need to be maintained. Consider adding organic matter to improve soil structure."
                        : "Crop yields have improved year-over-year. Water efficiency has also increased, showing positive returns on your smart irrigation investment."
                    }
                  </p>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <Button 
                    variant="outline" 
                    className="rounded-full text-xs font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={handleBackToReports}
                  >
                    <ChevronRight className="h-3 w-3 mr-1.5 rotate-180" />
                    Back
                  </Button>
                  
                  <Button 
                    variant="default" 
                    className="rounded-full text-xs font-semibold text-white"
                    onClick={() => {
                      toast({
                        title: "Report Exported",
                        description: `${activeReport} report has been exported to PDF.`
                      });
                    }}
                  >
                    Export Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Reports list view
          <div className="space-y-6">
            {/* Water Usage Report */}
            <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0 scale-in" style={{animationDelay: '0.1s'}}>
              <CardContent className="p-5">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center p-2 mr-4 shadow-sm border border-blue-100 dark:border-blue-800">
                    <BarChart2 className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">Water Usage</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Track irrigation and rainfall data</p>
                  </div>
                </div>
                
                <div className="mt-4 h-48 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={waterUsageData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" tick={{fill: darkMode ? '#e5e7eb' : '#4b5563'}} />
                      <Line 
                        type="monotone" 
                        dataKey="irrigation" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1500}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rainfall" 
                        stroke="#60a5fa" 
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1500} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    className="rounded-full text-xs font-semibold text-primary bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => handleViewDetails("Water Usage")}
                  >
                    View Details
                    <ArrowRight className="h-3 w-3 ml-1.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Soil Health Report */}
            <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0 scale-in" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-5">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-800 flex items-center justify-center p-2 mr-4 shadow-sm border border-green-100 dark:border-green-800">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">Soil Health</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Analyze soil moisture and nutrients</p>
                  </div>
                </div>
                
                <div className="mt-4 h-48 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={soilHealthData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" tick={{fill: darkMode ? '#e5e7eb' : '#4b5563'}} />
                      <Line 
                        type="monotone" 
                        dataKey="moisture" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1500}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="nitrogen" 
                        stroke="#34d399" 
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1500} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    className="rounded-full text-xs font-semibold text-primary bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => handleViewDetails("Soil Health")}
                  >
                    View Details
                    <ArrowRight className="h-3 w-3 ml-1.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Seasonal Analytics */}
            <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0 scale-in" style={{animationDelay: '0.3s'}}>
              <CardContent className="p-5">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900 dark:to-amber-800 flex items-center justify-center p-2 mr-4 shadow-sm border border-amber-100 dark:border-amber-800">
                    <Calendar className="h-8 w-8 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">Seasonal Analytics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Analyze growing season performance</p>
                  </div>
                </div>
                
                <div className="mt-4 h-48 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={seasonalData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" tick={{fill: darkMode ? '#e5e7eb' : '#4b5563'}} />
                      <Line 
                        type="monotone" 
                        dataKey="yield" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1500}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="efficiency" 
                        stroke="#fbbf24" 
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1500} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    className="rounded-full text-xs font-semibold text-primary bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => handleViewDetails("Seasonal Analytics")}
                  >
                    View Details
                    <ArrowRight className="h-3 w-3 ml-1.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Reports;