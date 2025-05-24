import { BarChart2, ArrowRight, FileText, Calendar, FilterX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const Reports = () => {
  const { darkMode } = useTheme();
  const { toast } = useToast();
  
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
    { name: "Jan", moisture: 75, nitrogen: 40 },
    { name: "Feb", moisture: 80, nitrogen: 45 },
    { name: "Mar", moisture: 70, nitrogen: 42 },
    { name: "Apr", moisture: 65, nitrogen: 38 },
    { name: "May", moisture: 60, nitrogen: 35 },
    { name: "Jun", moisture: 55, nitrogen: 32 },
    { name: "Jul", moisture: 50, nitrogen: 30 },
  ];
  
  const seasonalData = [
    { name: "2022", yield: 80, efficiency: 65 },
    { name: "2023", yield: 85, efficiency: 70 },
    { name: "2024", yield: 90, efficiency: 75 },
    { name: "2025", yield: 95, efficiency: 80 },
  ];
  
  // Show toast notification when a report card is clicked
  const handleReportCardClick = (reportType: string) => {
    toast({
      title: `${reportType} Details`,
      description: `Viewing detailed ${reportType.toLowerCase()} report data.`
    });
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
          <div className="fade-in">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Reports
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Track your farm performance</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm">
            <FilterX className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      </header>
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto z-10">
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
                <Link href={`/report-details/${encodeURIComponent("Water Usage")}`} onClick={() => handleReportCardClick("Water Usage")}>
                  <Button 
                    variant="outline" 
                    className="rounded-full text-xs font-semibold text-primary bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    View Details
                    <ArrowRight className="h-3 w-3 ml-1.5" />
                  </Button>
                </Link>
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
                <Link href={`/report-details/${encodeURIComponent("Soil Health")}`} onClick={() => handleReportCardClick("Soil Health")}>
                  <Button 
                    variant="outline" 
                    className="rounded-full text-xs font-semibold text-primary bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    View Details
                    <ArrowRight className="h-3 w-3 ml-1.5" />
                  </Button>
                </Link>
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Year-over-year performance trends</p>
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
                <Link href={`/report-details/${encodeURIComponent("Seasonal Analytics")}`} onClick={() => handleReportCardClick("Seasonal Analytics")}>
                  <Button 
                    variant="outline" 
                    className="rounded-full text-xs font-semibold text-primary bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    View Details
                    <ArrowRight className="h-3 w-3 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Reports;