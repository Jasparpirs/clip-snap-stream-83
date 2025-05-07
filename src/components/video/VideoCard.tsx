
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle, Share } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 1000) + 100);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
      setLiked(false);
      toast.info("Removed like");
    } else {
      setLikeCount(likeCount + 1);
      setLiked(true);
      toast.success("Video liked!");
    }
  };

  const handleComment = () => {
    toast.info("Comment feature coming soon!");
  };
  
  const handleShare = () => {
    // Simulate copy to clipboard
    toast.success("Link copied to clipboard!");
  };

  const handlePlay = () => {
    toast("Opening video player...", {
      description: `Now playing: ${video.title}`,
    });
  };

  return (
    <Card className={cn(
      "border-none bg-background/60 overflow-hidden rounded-xl",
      layout === "feed" ? "flex flex-col md:flex-row gap-4" : ""
    )}>
      <div 
        className={cn(
          "relative overflow-hidden group rounded-lg",
          layout === "grid" ? "aspect-video w-full" : "aspect-video md:w-[300px]"
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200", 
            isHovering ? "opacity-100" : "opacity-0"
          )}
          onClick={handlePlay}
        >
          <Button size="icon" variant="secondary" className="rounded-full bg-primary/80 border-none animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </Button>
        </div>
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
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "text-muted-foreground rounded-full transition-all duration-200", 
              liked ? "text-primary" : ""
            )}
            onClick={handleLike}
          >
            <ThumbsUp className={cn("mr-1 h-4 w-4", liked ? "fill-current" : "")} />
            <span>{likeCount}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="text-muted-foreground rounded-full" onClick={handleComment}>
            <MessageCircle className="mr-1 h-4 w-4" />
            <span>{Math.floor(Math.random() * 200)}</span>
          </Button>
        </div>
        
        <Button variant="ghost" size="sm" className="text-muted-foreground rounded-full" onClick={handleShare}>
          <Share className="mr-1 h-4 w-4" />
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
