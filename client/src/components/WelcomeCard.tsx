import { Leaf, Sun } from "lucide-react";

interface WelcomeCardProps {
  farmerName: string;
  farmStatus: string;
}

const WelcomeCard = ({ farmerName, farmStatus }: WelcomeCardProps) => {
  // Get current time to display appropriate greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  
  return (
    <div className="mb-1">
      <div className="bg-gradient-to-r from-primary/90 to-secondary/90 rounded-3xl p-5 text-white shadow-lg card-shadow">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4">
            {hour < 18 ? (
              <Sun className="h-7 w-7 text-white" />
            ) : (
              <Leaf className="h-7 w-7 text-white" />
            )}
          </div>
          <div>
            <p className="text-xs font-medium text-white/80">{greeting}</p>
            <h2 className="text-xl font-bold text-white">{farmerName}</h2>
            <div className="flex items-center mt-1">
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
