
import MainLayout from "@/components/layout/MainLayout";
import ShortVideos from "@/components/video/ShortVideos";
import { useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Shorts = () => {
  useEffect(() => {
    // Show a helpful toast when accessing shorts
    toast("Swipe up for more shorts!", {
      description: "Tap the center to pause and play videos.",
      duration: 4000,
    });
  }, []);
  
  return (
    <MainLayout>
      <div className="content-container py-4 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">Short Videos</h1>
            <Badge variant="outline" className="bg-primary/10">Cross-Platform</Badge>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="glass-effect">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="recommended">For You</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <ShortVideos />
      </div>
    </MainLayout>
  );
};

export default Shorts;
