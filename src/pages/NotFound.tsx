import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { PrideFloatingOrbs } from "@/features/pride/components/PrideFloatingOrbs";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="activity-root">
      <PrideFloatingOrbs />
      <div className="activity-container-sm flex-1 flex flex-col items-center justify-center relative z-10 text-center space-y-8">
        <div className="premium-card p-12 space-y-8 shadow-2xl">
          <div className="text-8xl animate-bounce">🌈</div>
          <div className="space-y-4">
            <h1 className="text-6xl font-black text-foreground tracking-tighter">404</h1>
            <p className="text-2xl text-muted-foreground font-medium">This rainbow leads somewhere else.</p>
          </div>
          <a href="/pride" className="btn-primary inline-flex h-14 px-10 items-center justify-center font-bold text-lg shadow-xl shadow-pride-purple/20">
            Return to Hub
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
