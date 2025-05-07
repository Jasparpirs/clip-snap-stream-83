
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Home, Play, User, Users, MessageCircle, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Play, label: "Shorts", path: "/shorts" },
    { icon: Video, label: "Live", path: "/live" },
    { icon: Users, label: "Following", path: "/following" },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
  ];

  const suggestedAccounts = [
    { name: "Alex Morgan", username: "@alexmorgan", avatar: "https://i.pravatar.cc/100?img=1" },
    { name: "Jamie Chen", username: "@jamiechen", avatar: "https://i.pravatar.cc/100?img=2" },
    { name: "Taylor Swift", username: "@taylorswift", avatar: "https://i.pravatar.cc/100?img=3" },
    { name: "Chris Evans", username: "@chrisevans", avatar: "https://i.pravatar.cc/100?img=4" },
    { name: "Zoe Smith", username: "@zoesmith", avatar: "https://i.pravatar.cc/100?img=5" },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col glass-effect pt-14 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16"
      )}
    >
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "justify-start rounded-lg",
                !isOpen && "md:justify-center"
              )}
              asChild
            >
              <Link to={item.path}>
                <item.icon className="mr-2" />
                <span className={cn("md:hidden", isOpen && "md:inline")}>
                  {item.label}
                </span>
              </Link>
            </Button>
          ))}
        </div>

        <Separator className="my-4" />
        
        <div className={cn("p-4", !isOpen && "md:hidden")}>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Suggested Accounts</h3>
          <div className="space-y-3">
            {suggestedAccounts.map((account) => (
              <div key={account.username} className="flex items-center p-2 hover:bg-secondary/50 rounded-lg transition-colors">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={account.avatar} alt={account.name} />
                  <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{account.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{account.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
      
      <div className="mt-auto p-4">
        <div className={cn("text-xs text-muted-foreground", !isOpen && "md:hidden")}>
          © 2025 ClipSnap
          <div className="mt-2 space-x-2">
            <a href="#" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Add Avatar components since they're used in the sidebar
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
