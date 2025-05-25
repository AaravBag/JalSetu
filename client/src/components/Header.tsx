import { Droplet, Moon, Sun, LogOut, User } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user, logout, logoutIsPending } = useAuth();
  
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast({
          title: "Logged out",
          description: "You have been logged out successfully"
        });
      }
    });
  };
  
  return (
    <header className="px-6 pt-12 pb-4 relative z-10">
      <div className="flex items-center justify-between fade-in">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Jal</span>
            <span className="text-blue-600 dark:text-blue-400 font-black">Setu</span>
            <Droplet className="ml-1 h-5 w-5 text-blue-600 dark:text-blue-400" fill={darkMode ? "#60a5fa" : "#2563eb"} fillOpacity={0.2} />
          </h1>
          <p className="text-sm font-medium text-neutral-dark dark:text-gray-300 opacity-75">Smart Water Management</p>
        </div>
        <div className="flex items-center space-x-3">
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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="h-11 w-11 rounded-full shadow-md bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 ring-2 ring-white dark:ring-gray-700 flex items-center justify-center cursor-pointer">
                <User className="h-6 w-6 text-primary dark:text-blue-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                {user?.username || 'My Account'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.href = '/settings'}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} disabled={logoutIsPending}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{logoutIsPending ? 'Logging out...' : 'Log out'}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
