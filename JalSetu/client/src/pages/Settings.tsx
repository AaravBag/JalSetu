import { Settings as SettingsIcon, User, Languages, Bell, HelpCircle, LogOut, ChevronRight, Moon, Sun, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import BottomNavigation from "@/components/BottomNavigation";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { darkMode, toggleDarkMode, animationsEnabled, toggleAnimations } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const { toast } = useToast();
  
  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          id: "profile",
          label: "Profile Information",
          icon: <User className="h-5 w-5 text-blue-500" />,
          action: <ChevronRight className="h-5 w-5 text-gray-400" />
        },
        {
          id: "language",
          label: "Language",
          icon: <Languages className="h-5 w-5 text-green-500" />,
          subtext: "English",
          action: <ChevronRight className="h-5 w-5 text-gray-400" />
        }
      ]
    },
    {
      title: "Preferences",
      items: [
        {
          id: "darkMode",
          label: "Dark Mode",
          icon: darkMode ? <Moon className="h-5 w-5 text-purple-500" /> : <Sun className="h-5 w-5 text-amber-500" />,
          action: (
            <Switch 
              checked={darkMode} 
              onCheckedChange={() => {
                toggleDarkMode();
                toast({
                  title: darkMode ? "Light mode enabled" : "Dark mode enabled",
                  description: "Your theme preference has been updated."
                });
              }} 
              className="data-[state=checked]:bg-primary" 
            />
          )
        },
        {
          id: "animations",
          label: "Enable Animations",
          icon: <Sparkles className="h-5 w-5 text-yellow-500" />,
          action: (
            <Switch 
              checked={animationsEnabled} 
              onCheckedChange={() => {
                toggleAnimations();
                toast({
                  title: animationsEnabled ? "Animations disabled" : "Animations enabled",
                  description: "Your animation preference has been updated."
                });
              }} 
              className="data-[state=checked]:bg-primary" 
            />
          )
        },
        {
          id: "notifications",
          label: "Push Notifications",
          icon: <Bell className="h-5 w-5 text-red-500" />,
          action: (
            <Switch 
              checked={notifications} 
              onCheckedChange={(val) => {
                setNotifications(val);
                toast({
                  title: val ? "Notifications enabled" : "Notifications disabled",
                  description: "Your notification preference has been updated."
                });
              }} 
              className="data-[state=checked]:bg-primary" 
            />
          )
        }
      ]
    },
    {
      title: "Support",
      items: [
        {
          id: "help",
          label: "Help & FAQ",
          icon: <HelpCircle className="h-5 w-5 text-amber-500" />,
          action: <ChevronRight className="h-5 w-5 text-gray-400" />
        },
        {
          id: "logout",
          label: "Logout",
          icon: <LogOut className="h-5 w-5 text-gray-500" />,
          action: <ChevronRight className="h-5 w-5 text-gray-400" />
        }
      ]
    }
  ];

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
              Settings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Customize your app experience</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm">
            <SettingsIcon className="h-5 w-5 text-gray-600 dark:text-gray-200" />
          </div>
        </div>
      </header>
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto z-10">
        <div className="space-y-6">
          {/* Profile Card */}
          <Card className="rounded-3xl shadow-lg overflow-hidden border-0 gradient-bg scale-in">
            <CardContent className="p-5">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center p-1">
                  <div className="h-full w-full rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="ml-4 text-white">
                  <h2 className="text-xl font-bold">Ramesh</h2>
                  <p className="text-blue-100">Green Valley Farm</p>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <div 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex-1 flex items-center cursor-pointer hover:bg-white/30 transition-colors"
                  onClick={() => {
                    toast({
                      title: "Edit Profile",
                      description: "Profile editing functionality is coming soon."
                    });
                  }}
                >
                  <span className="text-sm text-white font-medium text-center w-full">Edit Profile</span>
                </div>
                <div 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex-1 flex items-center cursor-pointer hover:bg-white/30 transition-colors"
                  onClick={() => {
                    toast({
                      title: "My Farms",
                      description: "Farm management functionality is coming soon."
                    });
                  }}
                >
                  <span className="text-sm text-white font-medium text-center w-full">My Farms</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Settings Sections */}
          {settingsSections.map((section, idx) => (
            <div key={section.title} className="space-y-3 slide-in-right" style={{animationDelay: `${idx * 0.1}s`}}>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 px-1">{section.title}</h3>
              
              <Card className="rounded-3xl shadow-sm overflow-hidden border-0 bg-white dark:bg-gray-800">
                <CardContent className="p-0">
                  {section.items.map((item, index) => (
                    <div 
                      key={item.id}
                      className={`flex items-center justify-between p-4 ${
                        index !== section.items.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center mr-3">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">{item.label}</p>
                          {item.subtext && <p className="text-xs text-gray-500 dark:text-gray-400">{item.subtext}</p>}
                        </div>
                      </div>
                      <div>
                        {item.action}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
          
          <div className="text-center mt-6 text-xs text-gray-400 dark:text-gray-500 fade-in">
            <p>JalSetu v1.0.0</p>
            <p className="mt-1">© 2025 JalSetu Smart Irrigation</p>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Settings;