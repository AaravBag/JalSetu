import { Droplet, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  return (
    <header className="px-6 pt-12 pb-4 relative z-10">
      <div className="flex items-center justify-between fade-in">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Jal</span>
            <span className="text-secondary dark:text-blue-400 font-black">Setu</span>
            <Droplet className="ml-1 h-5 w-5 text-secondary dark:text-blue-400" fill={darkMode ? "#3b82f6" : "#3b82f6"} fillOpacity={0.2} />
          </h1>
          <p className="text-sm font-medium text-neutral-dark dark:text-gray-300 opacity-75">Smart Water Management</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              toggleDarkMode();
              toast({
                title: darkMode ? "Light mode enabled" : "Dark mode enabled",
                description: "Your display preference has been updated"
              });
            }}
            className="h-9 w-9 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>
          
          <div className="h-11 w-11 rounded-full shadow-md bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 ring-2 ring-white dark:ring-gray-700 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-primary dark:text-blue-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
