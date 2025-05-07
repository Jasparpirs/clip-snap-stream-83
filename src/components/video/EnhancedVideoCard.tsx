
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Video as VideoType } from "@/contexts/UserContext";
import { Video, Radio } from "lucide-react";

interface VideoCardProps {
  video: VideoType;
}

export default function EnhancedVideoCard({ video }: VideoCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {video.isLive && (
          <Badge variant="destructive" className="absolute top-2 left-2 flex items-center gap-1">
            <Radio className="h-3 w-3 animate-pulse" />
            LIVE
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-start p-4">
          <div className="text-white">
            <h3 className="font-medium line-clamp-2">{video.title}</h3>
            {video.description && (
              <p className="text-xs line-clamp-2 mt-1 text-gray-200">
                {video.description}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <CardContent className="p-3">
        <h3 className="font-medium line-clamp-2">{video.title}</h3>
        <div className="flex items-center mt-2 justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={video.user.avatar} />
              <AvatarFallback>{video.user.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {video.user.name}
            </span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            {video.views}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 pt-0 text-xs text-muted-foreground">
        {video.timestamp}
      </CardFooter>
    </Card>
  );
}
