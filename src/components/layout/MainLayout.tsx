
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface MainLayoutProps {
  children: React.ReactNode;
  withSidebar?: boolean;
}

export default function MainLayout({ children, withSidebar = true }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { platformFilter } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out successfully");
    navigate("/auth");
  };

  return (
    <div className={cn("min-h-screen flex flex-col bg-background transition-colors duration-500", getBgStyle())}>
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 relative">
        {withSidebar && (
          <Sidebar isOpen={sidebarOpen} />
        )}
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            withSidebar && sidebarOpen ? "ml-0 md:ml-64" : "ml-0"
          )}
        >
          <div className="pb-16">
            {children}
          </div>
          
          {/* Floating logout button */}
          <div className="fixed bottom-6 right-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-white transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
