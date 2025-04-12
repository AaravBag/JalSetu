import { Settings as SettingsIcon, User, Languages, Bell, HelpCircle, LogOut, ChevronRight, Moon, Sun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import BottomNavigation from "@/components/BottomNavigation";
import { useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
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
              onCheckedChange={setDarkMode} 
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
              onCheckedChange={setNotifications} 
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
              Settings
            </h1>
            <p className="text-sm text-gray-500 font-medium">Customize your app experience</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <SettingsIcon className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </header>
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto z-10">
        <div className="space-y-6">
          {/* Profile Card */}
          <Card className="rounded-3xl shadow-lg overflow-hidden border-0 bg-gradient-to-r from-primary to-blue-500">
            <CardContent className="p-5">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center p-1">
                  <div className="h-full w-full rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="ml-4 text-white">
                  <h2 className="text-xl font-bold">Ramesh</h2>
                  <p className="text-blue-100">Green Valley Farm</p>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex-1 flex items-center">
                  <span className="text-sm text-white font-medium text-center w-full">Edit Profile</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex-1 flex items-center">
                  <span className="text-sm text-white font-medium text-center w-full">My Farms</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Settings Sections */}
          {settingsSections.map(section => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500 px-1">{section.title}</h3>
              
              <Card className="rounded-3xl shadow-sm overflow-hidden border-0 bg-white">
                <CardContent className="p-0">
                  {section.items.map((item, index) => (
                    <div 
                      key={item.id}
                      className={`flex items-center justify-between p-4 ${
                        index !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center mr-3">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.label}</p>
                          {item.subtext && <p className="text-xs text-gray-500">{item.subtext}</p>}
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
          
          <div className="text-center mt-6 text-xs text-gray-400">
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