import { Settings as SettingsIcon, User, Languages, Bell, HelpCircle, LogOut, ChevronRight, Moon, Sun, Sparkles, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import BottomNavigation from "@/components/BottomNavigation";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";

const Settings = () => {
  const { darkMode, toggleDarkMode, animationsEnabled, toggleAnimations } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account."
        });
        navigate('/login');
      }
    });
  };
  
  // Define the types for the settings items
  type SettingsItem = {
    id: string;
    label: string;
    icon: React.ReactNode;
    action: React.ReactNode;
    onClick?: () => void;
    subtext?: string;
  };
  
  type SettingsSection = {
    title: string;
    items: SettingsItem[];
  };
  
  const settingsSections: SettingsSection[] = [
    {
      title: "Account",
      items: [
        {
          id: "profile",
          label: "Profile Information",
          icon: <User className="h-5 w-5 text-blue-500" />,
          action: <ChevronRight className="h-5 w-5 text-gray-400" />,
          onClick: () => navigate('/edit-profile')
        },
        {
          id: "language",
          label: "Language",
          icon: <Languages className="h-5 w-5 text-green-500" />,
          subtext: availableLanguages.find(lang => lang.code === language)?.name || "English",
          action: <ChevronRight className="h-5 w-5 text-gray-400" />,
          onClick: () => setLanguageDialogOpen(true)
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
                // Prevent setting the notifications value from refreshing the page
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
          action: <ChevronRight className="h-5 w-5 text-gray-400" />,
          onClick: () => navigate('/help-chatbot')
        },
        {
          id: "logout",
          label: "Logout",
          icon: <LogOut className="h-5 w-5 text-gray-500" />,
          action: <ChevronRight className="h-5 w-5 text-gray-400" />,
          onClick: handleLogout
        }
      ]
    }
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 pb-20 transition-colors duration-300">
      {/* Decorative top background pattern */}
      <div className="absolute top-0 left-0 right-0 h-72 overflow-hidden z-0">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-purple-500 opacity-10 animate-pulse"></div>
        <div className="absolute top-20 -left-10 w-36 h-36 rounded-full bg-blue-500 opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-green-500 opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Settings icon pattern in background */}
        <div className="absolute top-0 left-0 right-0 h-40 opacity-5">
          <div className="flex justify-between px-10 pt-20">
            <Moon className="h-8 w-8" />
            <SettingsIcon className="h-8 w-8" />
            <Bell className="h-8 w-8" />
          </div>
        </div>
      </div>
      
      <header className="px-6 pt-12 pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="fade-in">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white gradient-text">
              Settings
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">Customize your app experience</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-md border border-gray-100 dark:border-gray-700 pulse-effect">
            <SettingsIcon className="h-6 w-6 text-purple-500 dark:text-purple-400" />
          </div>
        </div>
      </header>
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto z-10">
        <div className="space-y-6">
          {/* Profile Card */}
          <Card className="rounded-3xl shadow-lg overflow-hidden border-0 bg-white dark:bg-gray-800 scale-in enhanced-card">
            <CardContent className="p-6 relative">
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white opacity-10"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white opacity-10"></div>
              
              <div className="flex items-center relative z-10">
                <div className="h-20 w-20 rounded-2xl bg-white/20 dark:bg-gray-700/40 flex items-center justify-center p-1 shadow-lg border border-white/30 dark:border-white/10 pulse-effect">
                  <div className="h-full w-full rounded-xl bg-white/30 dark:bg-gray-600/50 flex items-center justify-center backdrop-blur-sm">
                    <User className="h-10 w-10 text-blue-500 dark:text-white" />
                  </div>
                </div>
                <div className="ml-5">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user?.firstName || user?.username || "User"}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{user?.email || "JalSetu User"}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <div 
                  className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-3 flex items-center cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors shadow-lg border border-blue-200 dark:border-blue-800/50"
                  onClick={() => navigate('/edit-profile')}
                >
                  <span className="text-sm text-blue-700 dark:text-blue-300 font-medium text-center w-full flex items-center justify-center">
                    Edit Profile
                    <ChevronRight className="h-4 w-4 ml-1.5 opacity-70" />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Settings Sections */}
          {settingsSections.map((section, idx) => (
            <div key={section.title} className="space-y-3 slide-in-right" style={{animationDelay: `${idx * 0.15}s`}}>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 px-1 ml-1 flex items-center">
                <span className="bg-gray-200 dark:bg-gray-700 h-1 w-5 rounded-full mr-2.5"></span>
                {section.title}
              </h3>
              
              <Card className="rounded-3xl shadow-md overflow-hidden border-0 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm glass-effect enhanced-card">
                <CardContent className="p-0">
                  {section.items.map((item, index) => {
                    return (
                      <div 
                        key={item.id}
                        className={`flex items-center justify-between p-5 ${
                          index !== section.items.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                        } hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors`}
                        onClick={item.onClick}
                        style={{ 
                          cursor: item.onClick ? 'pointer' : 'default',
                          animationDelay: `${idx * 0.15 + index * 0.08}s`
                        }}
                      >
                        <div className="flex items-center">
                          <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4 shadow-sm">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">{item.label}</p>
                            {item.subtext && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.subtext}</p>}
                          </div>
                        </div>
                        <div>
                          {item.action}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          ))}
          
          <div className="text-center mt-8 mb-4 text-xs text-gray-500 dark:text-gray-400 fade-in">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl py-3 px-4 shadow-sm border border-gray-100 dark:border-gray-700 inline-block">
              <p className="font-medium">JalSetu v1.0.0</p>
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 via-green-500 to-amber-500 rounded-full mx-auto my-2.5 opacity-60"></div>
              <p>© 2025 JalSetu Smart Irrigation</p>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNavigation />

      {/* Language Selection Dialog */}
      <Dialog open={languageDialogOpen} onOpenChange={setLanguageDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center">Select Language</DialogTitle>
            <DialogDescription className="text-center">
              Choose your preferred language for the application
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  language === lang.code 
                    ? 'bg-primary/10 border border-primary/30' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => {
                  setLanguage(lang.code);
                  toast({
                    title: "Language Updated",
                    description: `App language changed to ${lang.name}`,
                  });
                  setLanguageDialogOpen(false);
                }}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-primary"></span>
                )}
              </button>
            ))}
          </div>
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <button className="rounded-lg px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Cancel
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;