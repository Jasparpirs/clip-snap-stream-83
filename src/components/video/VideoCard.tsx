
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Play, ThumbsUp, MessageCircle, Share } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    views: string;
    timestamp: string;
    user: {
      name: string;
      avatar: string;
    };
  };
  layout?: "grid" | "feed";
}

export default function VideoCard({ video, layout = "grid" }: VideoCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Card className={cn(
      "border-none bg-transparent overflow-hidden",
      layout === "feed" ? "flex flex-col md:flex-row gap-4" : ""
    )}>
      <div 
        className={cn(
          "relative overflow-hidden group rounded-md",
          layout === "grid" ? "aspect-video w-full" : "aspect-video md:w-[300px]"
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
        />
        
        {isHovering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Button size="icon" variant="outline" className="rounded-full bg-primary/80 border-none">
              <Play className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
      
      <CardContent className={cn(
        "p-3",
        layout === "feed" ? "flex-1" : ""
      )}>
        <div className="flex space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={video.user.avatar} alt={video.user.name} />
            <AvatarFallback>{video.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-1">
            <h3 className="font-semibold line-clamp-2">{video.title}</h3>
            <p className="text-sm text-muted-foreground">{video.user.name}</p>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span>{video.views}</span>
              <span>•</span>
              <span>{video.timestamp}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 flex justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <ThumbsUp className="mr-1 h-4 w-4" />
            <span>Like</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MessageCircle className="mr-1 h-4 w-4" />
            <span>Comment</span>
          </Button>
        </div>
        
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Share className="mr-1 h-4 w-4" />
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
