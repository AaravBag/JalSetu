import { useState } from "react";
import { Home, BarChart2, Bell, Settings } from "lucide-react";

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "Home", icon: <Home className="h-5 w-5" />, hasNotification: false },
    { id: "reports", label: "Reports", icon: <BarChart2 className="h-5 w-5" />, hasNotification: false },
    { id: "alerts", label: "Alerts", icon: <Bell className="h-5 w-5" />, hasNotification: true },
    { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" />, hasNotification: false }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 flex justify-around py-3 px-2 z-20 shadow-lg max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-white/50"></div>
      
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className="relative z-10 flex flex-col items-center p-2 transition-all duration-200 rounded-xl"
          onClick={() => setActiveTab(tab.id)}
        >
          <div className={`w-12 h-12 flex items-center justify-center relative ${
            activeTab === tab.id ? "text-primary" : "text-gray-500 hover:text-gray-700"
          }`}>
            {activeTab === tab.id && (
              <div className="absolute inset-0 bg-primary/10 rounded-full scale-90 animate-pulse"></div>
            )}
            {tab.hasNotification && (
              <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
            <div className={`transition-all duration-200 ${
              activeTab === tab.id ? "scale-110" : "scale-100"
            }`}>
              {tab.icon}
            </div>
          </div>
          <span className={`text-xs mt-0.5 font-medium ${
            activeTab === tab.id ? "text-primary font-semibold" : "text-gray-500" 
          }`}>
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
