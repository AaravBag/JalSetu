import { Droplet } from "lucide-react";

const Header = () => {
  return (
    <header className="px-6 pt-12 pb-4 relative z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            Jal<span className="text-secondary">Setu</span>
            <Droplet className="ml-1 h-5 w-5 text-secondary" />
          </h1>
          <p className="text-sm text-gray-500">Smart Water Management</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-neutral-light flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-primary" 
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
    </header>
  );
};

export default Header;
