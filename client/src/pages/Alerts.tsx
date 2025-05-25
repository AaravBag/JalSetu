import React, { useState } from "react";
import { Bell, XCircle, ShieldAlert, Droplet, Leaf, DropletIcon, Trash2, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";

// Define alert types
type AlertType = "info" | "warning" | "danger";

// Alert interface
interface Alert {
  id: number;
  title: string;
  message: string;
  time: string;
  type: AlertType;
  icon: React.ReactNode;
}

// Sample alert data
const SAMPLE_ALERTS: Alert[] = [
  { 
    id: 1, 
    title: "Low Soil Moisture", 
    message: "Field 2 moisture level is below 40%. Consider irrigation.",
    time: "2 hours ago",
    type: "warning",
    icon: <DropletIcon />
  },
  { 
    id: 2, 
    title: "Pest Detection Alert", 
    message: "Possible pest infestation detected in north section. Inspect crops.",
    time: "Yesterday",
    type: "danger",
    icon: <ShieldAlert /> 
  },
  { 
    id: 3, 
    title: "Optimal Watering Time", 
    message: "Best time to water crops is now, based on weather forecast.",
    time: "Today",
    type: "info",
    icon: <Droplet /> 
  },
  { 
    id: 4, 
    title: "Nutrient Deficiency", 
    message: "Field 1 showing signs of nitrogen deficiency. Consider fertilization.",
    time: "2 days ago",
    type: "warning",
    icon: <Leaf /> 
  },
  { 
    id: 5, 
    title: "Irrigation System Maintenance", 
    message: "Your irrigation system is due for maintenance. Schedule service soon.",
    time: "3 days ago",
    type: "info",
    icon: <Bell /> 
  },
  { 
    id: 6, 
    title: "Weather Alert", 
    message: "Heavy rain expected tomorrow. Consider adjusting irrigation schedule.",
    time: "4 days ago",
    type: "warning",
    icon: <Droplet /> 
  },
  { 
    id: 7, 
    title: "Sensor Offline", 
    message: "Field 3 moisture sensor is offline. Please check connection.",
    time: "5 days ago",
    type: "danger",
    icon: <ShieldAlert /> 
  },
  { 
    id: 8, 
    title: "Crop Growth Report", 
    message: "Your wheat crop is growing at an optimal rate. Keep up the good work!",
    time: "1 week ago",
    type: "info",
    icon: <Leaf /> 
  }
];

// Component for alerts page
export default function Alerts() {
  const { toast } = useToast();
  
  // State for alerts and visible count
  const [alerts, setAlerts] = useState<Alert[]>(SAMPLE_ALERTS);
  const [visibleCount, setVisibleCount] = useState(4);
  
  // Calculate which alerts are currently visible
  const visibleAlerts = alerts.slice(0, visibleCount);
  
  // Function to dismiss a single alert
  function dismissAlert(id: number) {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert Dismissed",
      description: "The alert has been removed from your list."
    });
  }
  
  // Function to clear all alerts
  function clearAllAlerts() {
    setAlerts([]);
    toast({
      title: "All Alerts Cleared",
      description: "Your alerts have been cleared."
    });
  }
  
  // Function to load more alerts
  function loadMoreAlerts() {
    setVisibleCount(prev => Math.min(prev + 4, alerts.length));
    toast({
      title: "More Alerts Loaded",
      description: "Showing additional alerts from your history."
    });
  }
  
  // Function to get styles based on alert type
  function getAlertStyles(type: AlertType) {
    switch(type) {
      case "danger":
        return {
          container: "bg-red-50 border-red-200",
          icon: "bg-red-100 text-red-600",
          badge: "bg-red-500 text-white"
        };
      case "warning":
        return {
          container: "bg-amber-50 border-amber-200",
          icon: "bg-amber-100 text-amber-600",
          badge: "bg-amber-500 text-white"
        };
      case "info":
      default:
        return {
          container: "bg-blue-50 border-blue-200",
          icon: "bg-blue-100 text-blue-600",
          badge: "bg-blue-500 text-white"
        };
    }
  }

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 pb-20 transition-colors duration-300">
      {/* Decorative top background pattern */}
      <div className="absolute top-0 left-0 right-0 h-72 overflow-hidden z-0">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-red-500 opacity-10 animate-pulse"></div>
        <div className="absolute top-20 -left-10 w-36 h-36 rounded-full bg-amber-500 opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-blue-500 opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <header className="px-6 pt-12 pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="fade-in">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white gradient-text">
              Alerts
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">Important notifications & warnings</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-md border border-gray-100 dark:border-gray-700 pulse-effect">
            <Bell className="h-6 w-6 text-red-500 dark:text-red-400" />
          </div>
        </div>
      </header>
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto z-10">
        <div className="space-y-4">
          {alerts.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Showing {visibleAlerts.length} of {alerts.length} alerts
                  </p>
                </div>
              </div>
            
              {visibleAlerts.map((alert, index) => {
                const styles = getAlertStyles(alert.type);
                
                return (
                  <Card 
                    key={alert.id} 
                    className={`rounded-2xl shadow-md overflow-hidden border glass-effect ${styles.container} dark:bg-opacity-10 dark:border-opacity-20 scale-in enhanced-card`}
                  >
                    <CardContent className="p-5 relative">
                      <div className="flex">
                        <div className={`w-12 h-12 rounded-xl ${styles.icon} dark:bg-opacity-20 flex items-center justify-center mr-4 flex-shrink-0 shadow-sm pulse-effect`}>
                          {alert.icon}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">{alert.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 pr-6">{alert.message}</p>
                            </div>
                            <button 
                              type="button"
                              className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                              onClick={() => dismissAlert(alert.id)}
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-2 py-0.5 rounded-full backdrop-blur-sm">{alert.time}</span>
                            <Badge className={`${styles.badge} shadow-sm px-2.5 py-0.5`}>{alert.type}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              

            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 fade-in">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">All Caught Up!</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-xs">
                You've dismissed all alerts. Check back later for new notifications.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
}