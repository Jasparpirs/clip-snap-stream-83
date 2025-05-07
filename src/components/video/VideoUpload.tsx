
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Video, Radio } from "lucide-react";

interface VideoUploadProps {
  onVideoUploaded?: () => void;
}

export default function VideoUpload({ onVideoUploaded }: VideoUploadProps) {
  const { currentUser, addUserVideo } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    isLive: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVideoData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleVideoTypeChange = (value: string) => {
    setVideoData(prev => ({ ...prev, isLive: value === "live" }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please log in to upload videos");
      return;
    }
    
    try {
      setIsUploading(true);
      
      // In a real app, you'd upload the video to a storage service here
      // For now, we'll simulate adding it to the user's profile
      
      // Create a new video object
      const newVideo = {
        id: `video-${Date.now()}`,
        title: videoData.title,
        description: videoData.description,
        thumbnail: videoData.thumbnailUrl || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
        videoUrl: videoData.videoUrl || "#",
        views: "0 views",
        timestamp: "Just now",
        isLive: videoData.isLive,
        user: {
          name: currentUser.name,
          avatar: currentUser.avatar
        }
      };
      
      await addUserVideo(newVideo);
      
      toast.success(videoData.isLive ? "Live stream created!" : "Video uploaded successfully!");
      
      // Reset form
      setVideoData({
        title: "",
        description: "",
        thumbnailUrl: "",
        videoUrl: "",
        isLive: false
      });
      
      // Call callback if provided
      if (onVideoUploaded) {
        onVideoUploaded();
      }
      
    } catch (error) {
      toast.error("Failed to upload video");
      console.error("Error uploading video:", error);
    } finally {
      setIsUploading(false);
    }
  };
  
  if (!currentUser) {
    return null;
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Content
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload New Content</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="video" onValueChange={handleVideoTypeChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Radio className="h-4 w-4" />
              Go Live
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <TabsContent value="video" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                <Input
                  id="thumbnailUrl"
                  name="thumbnailUrl"
                  value={videoData.thumbnailUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  name="videoUrl"
                  value={videoData.videoUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/video.mp4"
                />
                <p className="text-xs text-muted-foreground">
                  In a real app, you would upload a video file directly
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="live" className="space-y-4">
              <div className="p-4 bg-secondary/50 rounded-md text-center">
                <Radio className="h-10 w-10 mx-auto mb-2 text-primary" />
                <p className="font-medium">Ready to Start Streaming</p>
                <p className="text-sm text-muted-foreground">
                  Your stream will be public once you click "Go Live"
                </p>
              </div>
            </TabsContent>
            
            {/* Common fields for both tabs */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={videoData.title}
                onChange={handleInputChange}
                placeholder="Video title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={videoData.description}
                onChange={handleInputChange}
                placeholder="Describe your video..."
                className="min-h-[100px]"
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? "Uploading..." : videoData.isLive ? "Go Live" : "Upload Video"}
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
