import { BarChart2, ArrowRight, FileText, Calendar, FilterX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";

const Reports = () => {
  // Reports page for water usage, soil health, and more
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-gradient-to-b from-white to-blue-50 pb-20">
      {/* Decorative top background pattern */}
      <div className="absolute top-0 left-0 right-0 h-56 overflow-hidden z-0 opacity-40">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary opacity-10"></div>
        <div className="absolute top-20 -left-10 w-36 h-36 rounded-full bg-secondary opacity-10"></div>
      </div>
      
      <header className="px-6 pt-12 pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Reports
            </h1>
            <p className="text-sm text-gray-500 font-medium">Track your farm performance</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <FilterX className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </header>
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto z-10">
        <div className="space-y-6">
          {/* Water Usage Report */}
          <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
            <CardContent className="p-5">
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center p-2 mr-4 shadow-sm border border-blue-100">
                  <BarChart2 className="h-8 w-8 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">Water Usage</h3>
                  <p className="text-sm text-gray-600">Track irrigation and rainfall data</p>
                </div>
              </div>
              
              <div className="mt-4 h-48 bg-gray-50 rounded-xl flex items-center justify-center">
                <p className="text-gray-400 text-sm">Water usage visualization</p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline" 
                  className="rounded-full text-xs font-semibold text-primary bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
                >
                  View Details
                  <ArrowRight className="h-3 w-3 ml-1.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Soil Health Report */}
          <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
            <CardContent className="p-5">
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center p-2 mr-4 shadow-sm border border-green-100">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">Soil Health</h3>
                  <p className="text-sm text-gray-600">Analyze soil moisture and nutrients</p>
                </div>
              </div>
              
              <div className="mt-4 h-48 bg-gray-50 rounded-xl flex items-center justify-center">
                <p className="text-gray-400 text-sm">Soil health visualization</p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline" 
                  className="rounded-full text-xs font-semibold text-primary bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
                >
                  View Details
                  <ArrowRight className="h-3 w-3 ml-1.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Seasonal Analytics */}
          <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
            <CardContent className="p-5">
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center p-2 mr-4 shadow-sm border border-amber-100">
                  <Calendar className="h-8 w-8 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">Seasonal Analytics</h3>
                  <p className="text-sm text-gray-600">Analyze growing season performance</p>
                </div>
              </div>
              
              <div className="mt-4 h-48 bg-gray-50 rounded-xl flex items-center justify-center">
                <p className="text-gray-400 text-sm">Seasonal data visualization</p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline" 
                  className="rounded-full text-xs font-semibold text-primary bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
                >
                  View Details
                  <ArrowRight className="h-3 w-3 ml-1.5" />
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

export default Reports;