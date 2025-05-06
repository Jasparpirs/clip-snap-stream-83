
import MainLayout from "@/components/layout/MainLayout";
import ShortVideos from "@/components/video/ShortVideos";
import { useEffect } from "react";
import { toast } from "sonner";

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
      <div className="animate-fade-in">
        <ShortVideos />
      </div>
    </MainLayout>
  );
};

export default Shorts;
