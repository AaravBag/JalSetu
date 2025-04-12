import { Bell, XCircle, ShieldAlert, Droplet, Leaf, DropletIcon, Trash2, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/BottomNavigation";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Alerts = () => {
  const { darkMode } = useTheme();
  const { toast } = useToast();
  const [visibleAlerts, setVisibleAlerts] = useState(4);
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);
  
  // Sample alerts for demonstration
  const allAlerts = [
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
  
  const loadMoreAlerts = () => {
    if (visibleAlerts < allAlerts.length) {
      setVisibleAlerts(prevCount => Math.min(prevCount + 4, allAlerts.length));
      toast({
        title: "Alerts Loaded",
        description: "Showing more alerts from your history."
      });
    } else {
      toast({
        title: "No More Alerts",
        description: "You've reached the end of your alerts history."
      });
    }
  };
  
  const dismissAlert = (id: number) => {
    setDismissedAlerts(prev => [...prev, id]);
    toast({
      title: "Alert Dismissed",
      description: "The alert has been removed from your list."
    });
  };
  
  const handleClearAll = () => {
    const ids = filteredAlerts.map(alert => alert.id);
    setDismissedAlerts(prev => [...prev, ...ids]);
    toast({
      title: "All Alerts Cleared",
      description: "Your alerts have been cleared."
    });
  };
  
  const filteredAlerts = allAlerts
    .filter(alert => !dismissedAlerts.includes(alert.id))
    .slice(0, visibleAlerts);

  const getAlertStyles = (type: string) => {
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
              Alerts
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Important notifications</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      </header>
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto z-10">
        <div className="space-y-4">
          {filteredAlerts.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Showing {filteredAlerts.length} of {allAlerts.length - dismissedAlerts.length} alerts
                </p>
                {filteredAlerts.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs rounded-full border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={handleClearAll}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>
            
              {filteredAlerts.map(alert => {
                const styles = getAlertStyles(alert.type);
                
                return (
                  <Card 
                    key={alert.id} 
                    className={`rounded-2xl shadow-sm overflow-hidden border ${styles.container} dark:bg-opacity-10 dark:border-opacity-20 scale-in`}
                    style={{ animationDelay: `${filteredAlerts.indexOf(alert) * 0.05}s` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex">
                        <div className={`w-10 h-10 rounded-full ${styles.icon} dark:bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0`}>
                          {alert.icon}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-gray-900 dark:text-gray-100">{alert.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alert.message}</p>
                            </div>
                            <button 
                              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                              onClick={() => dismissAlert(alert.id)}
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </div>
                          
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</span>
                            <Badge className={styles.badge}>{alert.type}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {visibleAlerts < allAlerts.length - dismissedAlerts.length && (
                <div className="flex justify-center mt-6 fade-in">
                  <Button 
                    variant="outline" 
                    className="rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={loadMoreAlerts}
                  >
                    Load More
                  </Button>
                </div>
              )}
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
};

export default Alerts;