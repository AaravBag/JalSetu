import { Droplet } from "lucide-react";

const Header = () => {
  return (
    <header className="px-6 pt-12 pb-4 relative z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Jal</span>
            <span className="text-secondary font-black">Setu</span>
            <Droplet className="ml-1 h-5 w-5 text-secondary" fill="#3b82f6" fillOpacity={0.2} />
          </h1>
          <p className="text-sm font-medium text-neutral-dark opacity-75">Smart Water Management</p>
        </div>
        <div className="h-11 w-11 rounded-full shadow-md bg-gradient-to-br from-white to-blue-50 ring-2 ring-white flex items-center justify-center">
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
