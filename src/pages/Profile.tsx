
import UserProfile from "@/components/profile/UserProfile";
import MainLayout from "@/components/layout/MainLayout";
import { useEffect } from "react";
import { toast } from "sonner";

const Profile = () => {
  useEffect(() => {
    // First-time users might need guidance
    const isFirstVisit = !localStorage.getItem('visited-profile');
    
    if (isFirstVisit) {
      toast.info("This is your profile page", {
        description: "Here you can see your videos and profile information.",
        duration: 5000,
      });
      localStorage.setItem('visited-profile', 'true');
    }
  }, []);
  
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <UserProfile />
      </div>
    </MainLayout>
  );
};

export default Profile;
