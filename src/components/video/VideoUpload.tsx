
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Video, Upload, Radio, Activity } from "lucide-react";
import { toast } from "sonner";

interface VideoUploadProps {
  onUploadComplete?: () => void;
}

export default function VideoUpload({ onUploadComplete }: VideoUploadProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please select a video file to upload");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a title for your video");
      return;
    }

    setUploading(true);

    // Simulating upload process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Video uploaded successfully!");
      
      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);
      
      // Notify parent component
      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (error) {
      toast.error("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          Upload New Video
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter video title" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Add a description to your video" 
              rows={3} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video-file">Video File</Label>
            <div className="flex items-center justify-center w-full">
              <label 
                htmlFor="video-file" 
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer bg-secondary/20 border-secondary hover:bg-secondary/30 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-primary" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">MP4, WebM or MOV (MAX. 1GB)</p>
                </div>
                <Input 
                  id="video-file" 
                  type="file" 
                  className="hidden" 
                  accept="video/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {file && (
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Video Type</Label>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button type="button" variant="outline" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Normal Video
              </Button>
              <Button type="button" variant="outline" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Short Video
              </Button>
              <Button type="button" variant="outline" className="flex items-center gap-2">
                <Radio className="h-4 w-4" />
                Live Stream
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={uploading}
          >
            {uploading ? (
              <>
                <span className="animate-spin mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                </span>
                Uploading...
              </>
            ) : (
              "Upload Video"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
