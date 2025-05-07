
import UserProfile from "@/components/profile/UserProfile";
import MainLayout from "@/components/layout/MainLayout";
import { useEffect } from "react";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";

const Profile = () => {
  const { isAuthenticated } = useUser();
  
  useEffect(() => {
    // Show different messages for logged in vs non-logged in users
    if (isAuthenticated) {
      // First-time users might need guidance
      const isFirstVisit = !localStorage.getItem('visited-profile');
      
      if (isFirstVisit) {
        toast.info("Welcome to your profile", {
          description: "You can edit your profile and upload videos from here.",
          duration: 5000,
        });
        localStorage.setItem('visited-profile', 'true');
      }
    } else {
      toast.info("This is the profile page", {
        description: "Login to create your own profile and upload videos.",
        duration: 5000,
      });
    }
  }, [isAuthenticated]);
  
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <UserProfile />
      </div>
    </MainLayout>
  );
};

export default Profile;
