import { Home, BarChart2, Bell, Settings } from "lucide-react";
import { useLocation, Link } from "wouter";

const BottomNavigation = () => {
  const [location] = useLocation();
  
  const navItems = [
    {
      name: "Home",
      icon: Home,
      path: "/",
      active: location === "/"
    },
    {
      name: "Reports",
      icon: BarChart2,
      path: "/reports",
      active: location === "/reports"
    },
    {
      name: "Alerts",
      icon: Bell,
      path: "/alerts",
      active: location === "/alerts"
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
      active: location === "/settings"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto">
        <div className="bg-white border-t border-gray-100 px-4 py-2 flex items-center justify-around shadow-lg rounded-t-3xl">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <div className="flex flex-col items-center py-2 px-3 rounded-xl transition-colors duration-200 hover:bg-gray-50 cursor-pointer">
                <div 
                  className={`p-1.5 rounded-full mb-1 ${
                    item.active 
                      ? "bg-primary/10 text-primary" 
                      : "text-gray-500"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${item.active ? "text-primary" : ""}`} />
                </div>
                <span 
                  className={`text-xs font-medium ${
                    item.active ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;