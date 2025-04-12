import { useState } from "react";
import { Home, BarChart2, Bell, Settings } from "lucide-react";

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "Home", icon: <Home className="h-5 w-5" /> },
    { id: "reports", label: "Reports", icon: <BarChart2 className="h-5 w-5" /> },
    { id: "alerts", label: "Alerts", icon: <Bell className="h-5 w-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 px-4 z-20">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex flex-col items-center p-2 ${
            activeTab === tab.id 
              ? "text-primary" 
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.icon}
          <span className="text-xs mt-1">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
