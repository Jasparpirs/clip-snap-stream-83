
import { Badge } from "@/components/ui/badge";
import { Radio, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveIndicatorProps {
  isLive: boolean;
  className?: string;
  variant?: "badge" | "dot" | "icon";
}

export default function LiveIndicator({ 
  isLive, 
  className,
  variant = "badge" 
}: LiveIndicatorProps) {
  if (!isLive) return null;
  
  if (variant === "dot") {
    return (
      <span 
        className={cn("h-2 w-2 rounded-full bg-destructive animate-pulse", className)}
      />
    );
  }
  
  if (variant === "icon") {
    return (
      <Activity 
        className={cn("h-4 w-4 text-destructive animate-pulse", className)}
      />
    );
  }
  
  // Default badge style
  return (
    <Badge 
      variant="destructive" 
      className={cn("flex items-center gap-1", className)}
    >
      <Radio className="h-3 w-3 animate-pulse" />
      LIVE
    </Badge>
  );
}
