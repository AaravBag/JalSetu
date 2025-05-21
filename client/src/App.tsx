import React from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Reports from "@/pages/Reports";
import Alerts from "@/pages/Alerts";
import Settings from "@/pages/Settings";
import { ThemeProvider } from "./context/ThemeContext";
import WaterBackground from "@/components/WaterBackground";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/reports" component={Reports} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="fixed inset-0">
          <WaterBackground />
          <div className="relative h-full w-full flex justify-center">
            <div className="w-full max-w-md h-full flex flex-col bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm">
              <Router />
              <Toaster />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
