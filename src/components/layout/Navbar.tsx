
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Search, Bell, MessageCircle, Plus } from "lucide-react";
import ThemeSelector from "../ThemeSelector";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { platformFilter } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isAuthenticated } = useAuth();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/auth");
      toast.info("Please log in to view your profile");
    }
  };

  const handleCreateClick = () => {
    if (isAuthenticated) {
      navigate("/clip-creator");
    } else {
      navigate("/auth");
      toast.info("Please log in to create content");
    }
  };
  
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="hover:scale-110 transition-transform">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="hidden md:flex">
            <h1 className="font-bold text-xl text-primary">
              Snipster
              {platformFilter && (
                <span className="ml-2 text-sm bg-primary/20 px-2 py-0.5 rounded-full">
                  {platformFilter.charAt(0).toUpperCase() + platformFilter.slice(1)} Only
                </span>
              )}
            </h1>
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-center px-4">
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search videos, people, or channels across platforms" 
              className="pl-8 bg-secondary/60 transition-all focus:ring-2 ring-primary/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <div className="flex items-center space-x-3">
          <ThemeSelector />
          
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:flex items-center gap-1 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
            onClick={handleCreateClick}
          >
            <Plus className="h-4 w-4" />
            <span>Create</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground relative hover:scale-110 transition-transform"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:scale-110 transition-transform"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>
          
          <Avatar 
            onClick={handleProfileClick}
            className="h-8 w-8 ring-2 ring-primary/20 ring-offset-1 ring-offset-background cursor-pointer transition-transform hover:scale-110"
          >
            <AvatarImage 
              src={user ? `https://i.pravatar.cc/300?u=${user.id}` : "https://github.com/shadcn.png"} 
              alt={user?.name || "User"} 
            />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
