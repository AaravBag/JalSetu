import { Leaf, Sun, Cloud, CloudRain } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface WelcomeCardProps {
  farmerName: string;
  farmStatus: string;
}

const WelcomeCard = ({ farmerName, farmStatus }: WelcomeCardProps) => {
  const { t, language } = useLanguage();
  
  // Get current time to display appropriate greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  
  // Get current date
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(
    language === 'en' ? 'en-US' : 
    language === 'es' ? 'es-ES' : 
    language === 'hi' ? 'hi-IN' : 
    language === 'fr' ? 'fr-FR' : 
    language === 'de' ? 'de-DE' : 
    language === 'pt' ? 'pt-BR' : 'en-US', 
    options
  );
  
  return (
    <div className="mb-1">
      <div className="gradient-primary rounded-3xl p-5 text-white shadow-lg card-shadow enhanced-card water-wave relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -mt-10 -mr-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 -mb-10 -ml-5"></div>
        
        <div className="absolute right-5 top-5 opacity-20">
          {hour < 12 ? (
            <Sun className="h-10 w-10 text-yellow-200 floating" />
          ) : hour < 18 ? (
            <Cloud className="h-10 w-10 text-white floating" />
          ) : (
            <CloudRain className="h-10 w-10 text-white floating" />
          )}
        </div>
        
        <div className="flex items-center relative z-10">
          <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 pulse-effect">
            {hour < 18 ? (
              <Sun className="h-8 w-8 text-white" />
            ) : (
              <Leaf className="h-8 w-8 text-white" />
            )}
          </div>
          <div>
            <p className="text-xs font-medium text-white/80">{greeting}</p>
            <h2 className="text-2xl font-bold text-white text-shadow">{farmerName}</h2>
            <p className="text-xs text-white/70 mt-0.5">{formattedDate}</p>
            <div className="flex items-center mt-2">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white/20 mr-2">
                <Leaf className="h-3 w-3 text-white" />
              </div>
              <p className="text-sm font-semibold text-white/90">{farmStatus} 🌱</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
