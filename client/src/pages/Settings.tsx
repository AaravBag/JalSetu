import { Settings as SettingsIcon, User, Languages, Bell, HelpCircle, LogOut, ChevronRight, Moon, Sun, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LiquidToggle } from "@/components/ui/liquid-toggle";
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
            <LiquidToggle 
              checked={darkMode} 
              onChange={() => {
                toggleDarkMode();
                toast({
                  title: darkMode ? "Light mode enabled" : "Dark mode enabled",
                  description: "Your theme preference has been updated."
                });
              }} 
              variant={darkMode ? "default" : "light"}
            />
          )
        },
        {
          id: "animations",
          label: "Enable Animations",
          icon: <Sparkles className="h-5 w-5 text-yellow-500" />,
          action: (
            <LiquidToggle 
              checked={animationsEnabled} 
              onChange={() => {
                toggleAnimations();
                toast({
                  title: animationsEnabled ? "Animations disabled" : "Animations enabled",
                  description: "Your animation preference has been updated."
                });
              }} 
              variant={darkMode ? "default" : "light"}
            />
          )
        },
        {
          id: "notifications",
          label: "Push Notifications",
          icon: <Bell className="h-5 w-5 text-red-500" />,
          action: (
            <LiquidToggle 
              checked={notifications} 
              onChange={(e) => {
                setNotifications(e.target.checked);
                toast({
                  title: e.target.checked ? "Notifications enabled" : "Notifications disabled",
                  description: "Your notification preference has been updated."
                });
              }} 
              variant={darkMode ? "default" : "light"}
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
    <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Decorative top background pattern */}
      <div className="absolute top-0 left-0 right-0 h-72 overflow-hidden z-0 opacity-40">
        <div className={`absolute -top-10 -right-10 w-64 h-64 rounded-full bg-primary opacity-10 ${animationsEnabled ? 'animate-pulse' : ''}`}></div>
        <div className={`absolute top-20 -left-10 w-48 h-48 rounded-full bg-secondary opacity-10 ${animationsEnabled ? 'animate-pulse' : ''}`} style={{ animationDelay: '1s' }}></div>
      </div>
      
      <header className="px-4 pt-8 pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className={`${animationsEnabled ? 'fade-in' : ''}`}>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Settings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Customize your app experience</p>
          </div>
          <div className={`h-10 w-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm ${animationsEnabled ? 'scale-in' : ''}`}>
            <SettingsIcon className="h-5 w-5 text-gray-600 dark:text-gray-200" />
          </div>
        </div>
      </header>
      
      <main className="relative flex-1 overflow-hidden z-10">
        <div className="absolute inset-0 overflow-y-auto no-scrollbar px-4">
          <div className="space-y-6 max-w-lg mx-auto pb-28">
          {/* Profile Card */}
            <Card className={`rounded-3xl shadow-lg overflow-hidden border-0 gradient-bg ${animationsEnabled ? 'scale-in hover-lift' : ''}`}>
              <CardContent className="p-4">
              <div className="flex items-center">
                  <div className={`h-14 w-14 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center p-1 ${animationsEnabled ? 'scale-in stagger-1' : ''}`}>
                  <div className="h-full w-full rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                      <User className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div className={`ml-4 text-white ${animationsEnabled ? 'fade-in stagger-2' : ''}`}>
                    <h2 className="text-lg font-bold">Ramesh</h2>
                    <p className="text-sm text-blue-100">Green Valley Farm</p>
                </div>
              </div>
              
                <div className={`flex space-x-2 mt-4 ${animationsEnabled ? 'fade-in stagger-3' : ''}`}>
                <div 
                    className={`bg-white/20 backdrop-blur-sm rounded-lg py-2.5 px-3 flex-1 flex items-center cursor-pointer hover:bg-white/30 transition-colors ${animationsEnabled ? 'hover-scale' : ''}`}
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
                    className={`bg-white/20 backdrop-blur-sm rounded-lg py-2.5 px-3 flex-1 flex items-center cursor-pointer hover:bg-white/30 transition-colors ${animationsEnabled ? 'hover-scale' : ''}`}
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
              <div key={section.title} className={`space-y-2.5 ${animationsEnabled ? 'slide-in-right' : ''}`} style={animationsEnabled ? {animationDelay: `${idx * 0.1}s`} : undefined}>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 px-1">{section.title}</h3>
              
                <Card className={`rounded-2xl shadow-sm overflow-hidden border-0 bg-white dark:bg-gray-800 ${animationsEnabled ? 'hover-lift' : ''}`}>
                <CardContent className="p-0">
                  {section.items.map((item, index) => (
                    <div 
                      key={item.id}
                        className={`flex items-center justify-between p-3.5 ${
                        index !== section.items.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                        } ${animationsEnabled ? 'hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors' : ''}`}
                    >
                      <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center mr-3 ${animationsEnabled ? 'scale-in' : ''}`} style={animationsEnabled ? {animationDelay: `${(idx * 0.1) + (index * 0.05)}s`} : undefined}>
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
          
            <div className={`text-center mt-6 text-xs text-gray-400 dark:text-gray-500 ${animationsEnabled ? 'fade-in' : ''}`}>
            <p>JalSetu v1.0.0</p>
            <p className="mt-1">© 2025 JalSetu Smart Irrigation</p>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Settings;