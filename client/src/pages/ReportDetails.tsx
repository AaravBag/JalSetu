import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BarChart2, FileText, Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";

const ReportDetails = () => {
  const { darkMode } = useTheme();
  const { toast } = useToast();
  
  // Get the report type from the URL
  const [, params] = useRoute("/report-details/:type");
  const reportType = params?.type ? decodeURIComponent(params.type) : "Water Usage";
  
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

  // Get the correct data for the current report type
  const reportData = 
    reportType === "Water Usage" 
      ? waterUsageData 
      : reportType === "Soil Health" 
        ? soilHealthData 
        : seasonalData;

  // Get the analysis text based on report type
  const getAnalysisText = () => {
    switch(reportType) {
      case "Water Usage":
        return "Water usage trends show increasing irrigation needs in drier months. Consider optimizing irrigation schedules and investing in rain water harvesting.";
      case "Soil Health":
        return "Soil moisture levels are declining. Nitrogen and phosphorus levels need to be maintained. Consider adding organic matter to improve soil structure.";
      case "Seasonal Analytics":
      default:
        return "Crop yields have improved year-over-year. Water efficiency has also increased, showing positive returns on your smart irrigation investment.";
    }
  };
  
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 pb-20 transition-colors duration-300">
      <Header />
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto z-10">
        <div className="flex items-center mb-5">
          <Link href="/reports" className="mr-3">
            <div className="w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800 flex items-center justify-center shadow-sm">
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
          </Link>
          <h1 className="text-xl font-bold">{reportType} Report</h1>
        </div>
        
        <div className="space-y-6 slide-in-right">
          <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
            <CardContent className="p-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {reportType} Details
              </h2>
              
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={reportData}
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
                    
                    {reportType === "Water Usage" && (
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
                    
                    {reportType === "Soil Health" && (
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
                    
                    {reportType === "Seasonal Analytics" && (
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
                  {getAnalysisText()}
                </p>
              </div>
              
              <div className="mt-4 flex justify-between">
                <Link href="/reports">
                  <Button 
                    variant="outline" 
                    className="rounded-full text-xs font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 mr-1.5 rotate-180" />
                    Back
                  </Button>
                </Link>
                
                <Button 
                  variant="default" 
                  className="rounded-full text-xs font-semibold text-white"
                  onClick={() => {
                    toast({
                      title: "Report Exported",
                      description: `${reportType} report has been exported to PDF.`
                    });
                  }}
                >
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ReportDetails;