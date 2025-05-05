
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle, Share, User, Play, Pause, VolumeX, Volume2 } from "lucide-react";

const shortVideos = [
  {
    id: "s1",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-for-an-audition-41784-large.mp4",
    caption: "When the weekend finally arrives #dance #weekend #vibes",
    user: {
      name: "Sarah_Dance",
      avatar: "https://i.pravatar.cc/150?img=20",
    },
    likes: "342K",
    comments: "1.2K",
    shares: "21K"
  },
  {
    id: "s2",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-breakdancing-on-a-street-with-concrete-walls-43747-large.mp4",
    caption: "Street dancing at its finest 🔥 #breakdance #urban",
    user: {
      name: "UrbanMoves",
      avatar: "https://i.pravatar.cc/150?img=21",
    },
    likes: "567K",
    comments: "3.4K",
    shares: "45K"
  },
  {
    id: "s3",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-taking-a-selfie-in-a-clothing-store-46712-large.mp4",
    caption: "Shopping day selfies #fashion #shopping #ootd",
    user: {
      name: "FashionGirl",
      avatar: "https://i.pravatar.cc/150?img=22",
    },
    likes: "187K",
    comments: "956",
    shares: "12K"
  }
];

export default function ShortVideos() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  const activeVideo = shortVideos[activeVideoIndex];
  
  const handleNext = () => {
    if (activeVideoIndex < shortVideos.length - 1) {
      setActiveVideoIndex(activeVideoIndex + 1);
    }
  };
  
  const handlePrev = () => {
    if (activeVideoIndex > 0) {
      setActiveVideoIndex(activeVideoIndex - 1);
    }
  };
  
  const togglePlay = () => {
    const video = videoRefs.current[activeVideoIndex];
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    const video = videoRefs.current[activeVideoIndex];
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="relative h-full max-h-[90vh] w-full max-w-md mx-auto overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={(el) => (videoRefs.current[activeVideoIndex] = el)}
            src={activeVideo.videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="h-full w-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          
          {/* Video overlay with controls */}
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-black/20 border-none"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
            
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <Avatar className="h-10 w-10 mr-2 border-2 border-white">
                    <AvatarImage src={activeVideo.user.avatar} alt={activeVideo.user.name} />
                    <AvatarFallback>{activeVideo.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{activeVideo.user.name}</span>
                  <Button size="sm" variant="secondary" className="ml-2">
                    Follow
                  </Button>
                </div>
                <p className="text-sm mb-4">{activeVideo.caption}</p>
              </div>
              
              {/* Right side actions */}
              <div className="flex flex-col items-center space-y-6">
                <Button variant="ghost" size="icon" className="rounded-full bg-black/20">
                  <ThumbsUp className="h-6 w-6" />
                  <span className="block text-xs mt-1">{activeVideo.likes}</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-black/20">
                  <MessageCircle className="h-6 w-6" />
                  <span className="block text-xs mt-1">{activeVideo.comments}</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-black/20">
                  <Share className="h-6 w-6" />
                  <span className="block text-xs mt-1">{activeVideo.shares}</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Center play/pause button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`rounded-full bg-black/20 opacity-0 transition-opacity ${!isPlaying ? 'opacity-100' : ''}`}
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-12 w-12" /> : <Play className="h-12 w-12" />}
            </Button>
          </div>
          
          {/* Navigation buttons */}
          {activeVideoIndex > 0 && (
            <Button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-black/20 border-none"
              size="icon"
              variant="outline"
              onClick={handlePrev}
            >
              <span className="sr-only">Previous video</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M15 18l-6-6 6-6"/></svg>
            </Button>
          )}
          
          {activeVideoIndex < shortVideos.length - 1 && (
            <Button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-black/20 border-none"
              size="icon"
              variant="outline"
              onClick={handleNext}
            >
              <span className="sr-only">Next video</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M9 18l6-6-6-6"/></svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
