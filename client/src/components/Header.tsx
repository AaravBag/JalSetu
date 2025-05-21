import { Droplet, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { toast } = useToast();
  
  return (
    <header className="px-5 py-4 relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-colors duration-200">
      <div className="flex items-center justify-between fade-in">
        <div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold flex items-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Jal</span>
                <span className="text-blue-500 dark:text-blue-400 font-black">Setu</span>
                <Droplet 
                  className="ml-1 h-5 w-5 text-blue-500 dark:text-blue-400" 
                  fill="currentColor" 
                  fillOpacity={darkMode ? 0.2 : 0.1} 
                />
              </h1>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 opacity-75 mt-0.5">
              Smart Water Management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              toggleDarkMode();
              toast({
                title: darkMode ? "Light mode enabled" : "Dark mode enabled",
                description: "Your display preference has been updated",
                variant: "default"
              });
            }}
            className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm flex items-center justify-center transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 active:scale-95"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-amber-500 transition-transform duration-200 rotate-0 hover:rotate-90" />
            ) : (
              <Moon className="h-5 w-5 text-blue-600 transition-transform duration-200" />
            )}
          </button>
          
          <div className="h-9 w-9 rounded-full shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 ring-2 ring-white/50 dark:ring-gray-700/50 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-blue-600 dark:text-blue-400" 
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
