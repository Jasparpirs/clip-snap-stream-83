
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  Play, 
  User, 
  Users, 
  MessageCircle, 
  Video,
  Tv,
  Scissors,
  Share2,
  BarChart2,
  Layers,
  Award 
} from "lucide-react";
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

  const featureItems = [
    { icon: Tv, label: "MultiStream", path: "/multi-stream", badge: "New" },
    { icon: Scissors, label: "Clip Creator", path: "/clip-creator", badge: "Beta" },
    { icon: Share2, label: "AI Summaries", path: "/ai-summaries", badge: "AI" },
    { icon: BarChart2, label: "Creator Dashboard", path: "/creator-dashboard" },
    { icon: Layers, label: "Watch Party", path: "/watch-party", badge: "Live" },
  ];

  const suggestedAccounts = [
    { name: "Alex Morgan", username: "@alexmorgan", avatar: "https://i.pravatar.cc/100?img=1", platform: "youtube" },
    { name: "Jamie Chen", username: "@jamiechen", avatar: "https://i.pravatar.cc/100?img=2", platform: "twitch" },
    { name: "Taylor Swift", username: "@taylorswift", avatar: "https://i.pravatar.cc/100?img=3", platform: "tiktok" },
    { name: "Chris Evans", username: "@chrisevans", avatar: "https://i.pravatar.cc/100?img=4", platform: "youtube" },
    { name: "Zoe Smith", username: "@zoesmith", avatar: "https://i.pravatar.cc/100?img=5", platform: "snapchat" },
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
        
        <div className="px-4 mb-2">
          <h3 className={cn(
            "text-xs uppercase text-muted-foreground font-medium",
            !isOpen && "md:hidden"
          )}>
            New Features
          </h3>
        </div>
        
        <div className="flex flex-col gap-2 p-4 pt-0">
          {featureItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "justify-start rounded-lg relative",
                !isOpen && "md:justify-center"
              )}
              asChild
            >
              <Link to={item.path}>
                <item.icon className="mr-2" />
                <span className={cn("md:hidden", isOpen && "md:inline")}>
                  {item.label}
                </span>
                {item.badge && (
                  <span className={cn(
                    "absolute right-2 top-1 text-xs py-0.5 px-1.5 rounded-full bg-primary text-primary-foreground",
                    !isOpen && "md:top-0 md:right-0 md:h-2 md:w-2 md:p-0"
                  )}>
                    {isOpen ? item.badge : ""}
                  </span>
                )}
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
                <Avatar className="h-8 w-8 mr-2 ring-1 ring-offset-1 ring-offset-background">
                  <AvatarImage src={account.avatar} alt={account.name} />
                  <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden flex-1">
                  <p className="text-sm font-medium truncate">{account.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{account.username}</p>
                </div>
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  account.platform === "youtube" && "bg-red-500",
                  account.platform === "twitch" && "bg-purple-500",
                  account.platform === "tiktok" && "bg-slate-200",
                  account.platform === "snapchat" && "bg-yellow-300"
                )}></div>
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

