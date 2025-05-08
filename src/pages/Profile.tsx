
import UserProfile from "@/components/profile/UserProfile";
import MainLayout from "@/components/layout/MainLayout";
import { useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <UserProfile />
      </motion.div>
    </MainLayout>
  );
};

export default Profile;
