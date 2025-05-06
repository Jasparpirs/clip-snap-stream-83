
import MainLayout from "@/components/layout/MainLayout";
import VideoFeed from "@/components/video/VideoFeed";
import { useEffect } from "react";
import { toast } from "sonner";

const Index = () => {
  useEffect(() => {
    // Welcome toast when user first visits
    toast.success("Welcome to ClipSnap!", {
      description: "Discover videos, follow creators, and share your world.",
      duration: 5000,
    });
  }, []);
  
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <VideoFeed />
      </div>
    </MainLayout>
  );
};

export default Index;
