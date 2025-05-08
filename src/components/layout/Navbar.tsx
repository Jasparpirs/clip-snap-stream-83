
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Search, Bell, MessageCircle, Plus } from "lucide-react";
import ThemeSelector from "../ThemeSelector";
import { useTheme } from "@/contexts/ThemeContext";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { platformFilter } = useTheme();
  
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="hidden md:flex">
            <h1 className="font-bold text-xl text-primary">
              ClipSnap
              {platformFilter && (
                <span className="ml-2 text-sm bg-primary/20 px-2 py-0.5 rounded-full">
                  {platformFilter.charAt(0).toUpperCase() + platformFilter.slice(1)} Only
                </span>
              )}
            </h1>
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search videos, people, or channels across platforms" 
              className="pl-8 bg-secondary/60"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <ThemeSelector />
          
          <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1 rounded-full">
            <Plus className="h-4 w-4" />
            <span>Create</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>
          
          <Avatar className="h-8 w-8 ring-2 ring-primary/20 ring-offset-1 ring-offset-background">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
