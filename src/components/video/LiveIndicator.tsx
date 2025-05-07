
import { Badge } from "@/components/ui/badge";
import { Radio } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveIndicatorProps {
  isLive: boolean;
  className?: string;
}

export default function LiveIndicator({ isLive, className }: LiveIndicatorProps) {
  if (!isLive) return null;
  
  return (
    <Badge 
      variant="destructive" 
      className={cn("flex items-center gap-1 animate-pulse", className)}
    >
      <Radio className="h-3 w-3" />
      LIVE
    </Badge>
  );
}
