import { BarChart2, ArrowRight, FileText, Calendar, FilterX, DropletIcon, Layers, Sprout, Cloud, Sun, Leaf, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";

const Reports = () => {
  const { darkMode } = useTheme();
  const { toast } = useToast();
  const { t } = useLanguage();
  
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
      <div className="absolute top-0 left-0 right-0 h-72 overflow-hidden z-0">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-blue-500 opacity-10 animate-pulse"></div>
        <div className="absolute top-20 -left-10 w-36 h-36 rounded-full bg-green-500 opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-amber-500 opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Decorative background with chart-like pattern */}
        <div className="absolute top-0 left-0 right-0 h-40 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,40 L10,35 L20,38 L30,32 L40,36 L50,30 L60,35 L70,28 L80,32 L90,25 L100,30 L100,40 L0,40 Z" fill="url(#gradient)" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      <header className="px-6 pt-12 pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="fade-in">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white gradient-text">
              {t.reportsTitle}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">{t.reportsSubtitle}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-md border border-gray-100 dark:border-gray-700 pulse-effect">
            <FilterX className="h-6 w-6 text-blue-500 dark:text-blue-400" />
          </div>
        </div>
      </header>
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto z-10">
        <div className="space-y-6">
          {/* Water Usage Report */}
          <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0 scale-in enhanced-card" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-5 relative">
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-4 opacity-10 floating" style={{ animationDelay: '0.3s' }}>
                <DropletIcon className="h-20 w-20 text-blue-500" />
              </div>
              <div className="absolute top-5 right-5 opacity-10 floating" style={{ animationDelay: '1.2s' }}>
                <Cloud className="h-12 w-12 text-blue-300" />
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-2xl gradient-blue flex items-center justify-center p-3 mr-5 shadow-md border border-blue-200 dark:border-blue-700 pulse-effect">
                  <BarChart2 className="h-9 w-9 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 dark:text-white">{t.waterUsage}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t.waterUsageDesc}</p>
                </div>
              </div>
              
              <div className="mt-5 h-52 bg-white/50 dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-inner border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
                <div className="p-2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={waterUsageData}>
                      <defs>
                        <linearGradient id="irrigationGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        </linearGradient>
                        <linearGradient id="rainfallGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey="name" 
                        tick={{fill: darkMode ? '#e5e7eb' : '#4b5563'}}
                        axisLine={{ stroke: darkMode ? '#374151' : '#d1d5db', strokeWidth: 1 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        labelStyle={{ color: darkMode ? '#e5e7eb' : '#1f2937' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="irrigation" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#irrigationGradient)"
                        activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
                        animationDuration={1500}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="rainfall" 
                        stroke="#60a5fa" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#rainfallGradient)"
                        activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
                        animationDuration={1500} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-5 flex justify-between items-center">
                <div className="flex space-x-3">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-1.5"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Irrigation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-300 mr-1.5"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Rainfall</span>
                  </div>
                </div>
                
                <Link href={`/report-details/${encodeURIComponent("Water Usage")}`} onClick={() => handleReportCardClick("Water Usage")}>
                  <Button 
                    variant="outline" 
                    className="rounded-full text-sm font-medium transition-all bg-blue-500 text-white hover:bg-blue-600 border-0 shadow-sm"
                  >
                    {t.viewDetails}
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Soil Health Report */}
          <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0 scale-in enhanced-card" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-5 relative">
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-4 opacity-10 floating" style={{ animationDelay: '0.6s' }}>
                <Sprout className="h-20 w-20 text-green-500" />
              </div>
              <div className="absolute top-5 right-5 opacity-10 floating" style={{ animationDelay: '0.9s' }}>
                <Leaf className="h-12 w-12 text-green-400" />
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-2xl gradient-green flex items-center justify-center p-3 mr-5 shadow-md border border-green-200 dark:border-green-700 pulse-effect">
                  <Database className="h-9 w-9 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 dark:text-white">{t.soilHealth}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t.soilHealthDesc}</p>
                </div>
              </div>
              
              <div className="mt-5 h-52 bg-white/50 dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-inner border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
                <div className="p-2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={soilHealthData}>
                      <defs>
                        <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                        </linearGradient>
                        <linearGradient id="nitrogenGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#34d399" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey="name" 
                        tick={{fill: darkMode ? '#e5e7eb' : '#4b5563'}}
                        axisLine={{ stroke: darkMode ? '#374151' : '#d1d5db', strokeWidth: 1 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        labelStyle={{ color: darkMode ? '#e5e7eb' : '#1f2937' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="moisture" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#moistureGradient)"
                        activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
                        animationDuration={1500}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="nitrogen" 
                        stroke="#34d399" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#nitrogenGradient)"
                        activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
                        animationDuration={1500} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-5 flex justify-between items-center">
                <div className="flex space-x-3">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-600 mr-1.5"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Moisture</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-400 mr-1.5"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Nitrogen</span>
                  </div>
                </div>
                
                <Link href={`/report-details/${encodeURIComponent("Soil Health")}`} onClick={() => handleReportCardClick("Soil Health")}>
                  <Button 
                    variant="outline" 
                    className="rounded-full text-sm font-medium transition-all bg-green-500 text-white hover:bg-green-600 border-0 shadow-sm"
                  >
                    {t.viewDetails}
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Seasonal Analytics */}
          <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0 scale-in enhanced-card" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-5 relative">
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-4 opacity-10 floating" style={{ animationDelay: '1.5s' }}>
                <Sun className="h-20 w-20 text-amber-500" />
              </div>
              <div className="absolute top-5 left-5 opacity-10 floating" style={{ animationDelay: '0.7s' }}>
                <Cloud className="h-12 w-12 text-amber-300" />
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-2xl gradient-amber flex items-center justify-center p-3 mr-5 shadow-md border border-amber-200 dark:border-amber-700 pulse-effect">
                  <Calendar className="h-9 w-9 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 dark:text-white">{t.seasonalAnalytics}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t.seasonalAnalyticsDesc}</p>
                </div>
              </div>
              
              <div className="mt-5 h-52 bg-white/50 dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-inner border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
                <div className="p-2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={seasonalData}>
                      <defs>
                        <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.2}/>
                        </linearGradient>
                        <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey="name" 
                        tick={{fill: darkMode ? '#e5e7eb' : '#4b5563'}}
                        axisLine={{ stroke: darkMode ? '#374151' : '#d1d5db', strokeWidth: 1 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        labelStyle={{ color: darkMode ? '#e5e7eb' : '#1f2937' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="yield" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#yieldGradient)"
                        activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
                        animationDuration={1500}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="efficiency" 
                        stroke="#fbbf24" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#efficiencyGradient)"
                        activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
                        animationDuration={1500} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-5 flex justify-between items-center">
                <div className="flex space-x-3">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-amber-600 mr-1.5"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Yield</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-amber-400 mr-1.5"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Efficiency</span>
                  </div>
                </div>
                
                <Link href={`/report-details/${encodeURIComponent("Seasonal Analytics")}`} onClick={() => handleReportCardClick("Seasonal Analytics")}>
                  <Button 
                    variant="outline" 
                    className="rounded-full text-sm font-medium transition-all bg-amber-500 text-white hover:bg-amber-600 border-0 shadow-sm"
                  >
                    {t.viewDetails}
                    <ArrowRight className="h-4 w-4 ml-1.5" />
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