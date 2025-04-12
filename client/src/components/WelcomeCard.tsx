import { Leaf } from "lucide-react";

interface WelcomeCardProps {
  farmerName: string;
  farmStatus: string;
}

const WelcomeCard = ({ farmerName, farmStatus }: WelcomeCardProps) => {
  return (
    <div className="mb-6">
      <div className="bg-primary bg-opacity-10 rounded-2xl p-4">
        <div className="flex items-center">
          <Leaf className="h-8 w-8 text-primary mr-3" />
          <div>
            <h2 className="text-lg font-bold">Welcome, {farmerName}!</h2>
            <p className="text-primary font-semibold">{farmStatus} 🌱</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
