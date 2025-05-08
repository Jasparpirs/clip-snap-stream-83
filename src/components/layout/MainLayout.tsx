
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface MainLayoutProps {
  children: React.ReactNode;
  withSidebar?: boolean;
}

export default function MainLayout({ children, withSidebar = true }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { platformFilter } = useTheme();

  // Apply different background styling based on platform filter
  const getBgStyle = () => {
    if (!platformFilter) return "";
    
    switch(platformFilter) {
      case "twitch":
        return "bg-gradient-to-b from-purple-900/20 to-background";
      case "youtube":
        return "bg-gradient-to-b from-red-900/20 to-background";
      case "tiktok":
        return "bg-gradient-to-b from-slate-800/30 to-background";
      case "snapchat":
        return "bg-gradient-to-b from-yellow-500/10 to-background";
      default:
        return "";
    }
  };

  return (
    <div className={cn("min-h-screen flex flex-col bg-background", getBgStyle())}>
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 relative">
        {withSidebar && (
          <Sidebar isOpen={sidebarOpen} />
        )}
        <main className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          withSidebar && sidebarOpen ? "ml-0 md:ml-64" : "ml-0"
        )}>
          <div className="pb-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
