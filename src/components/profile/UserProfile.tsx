
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import VideoCard from "../video/VideoCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

// Sample videos for this user (will be replaced by real data in future)
const userVideos = [
  {
    id: "u1",
    title: "A day in my life as a content creator",
    thumbnail: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    views: "1.8M views",
    timestamp: "1 week ago",
    user: {
      name: "",  // Will be dynamically replaced
      avatar: "" // Will be dynamically replaced
    }
  },
  {
    id: "u2",
    title: "5 tips to grow your social media in 2025",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    views: "954K views",
    timestamp: "3 weeks ago",
    user: {
      name: "",  // Will be dynamically replaced
      avatar: "" // Will be dynamically replaced
    }
  },
  {
    id: "u3",
    title: "Exploring hidden beaches in Bali | Travel vlog",
    thumbnail: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    views: "2.4M views",
    timestamp: "1 month ago",
    user: {
      name: "",  // Will be dynamically replaced
      avatar: "" // Will be dynamically replaced
    }
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function UserProfile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || "User",
    username: `@${user?.email?.split('@')[0] || "user"}`,
    avatar: "https://i.pravatar.cc/300?img=25", // Default avatar
    banner: "https://images.unsplash.com/photo-1594751684241-bcef0ac9c64d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    bio: "Digital creator | Making content that inspires",
    followers: "1.2K",
    following: "345",
    likes: "18.5K",
    location: "Tech Enthusiast"
  });

  // Update user videos with the current user's info
  useEffect(() => {
    if (user) {
      userVideos.forEach(video => {
        video.user.name = user.name;
        video.user.avatar = profileData.avatar;
      });
    }
  }, [user, profileData.avatar]);

  return (
    <motion.div 
      className="container py-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Profile Banner */}
      <motion.div 
        className="relative w-full h-48 md:h-64 rounded-md overflow-hidden mb-16"
        variants={item}
      >
        <img 
          src={profileData.banner} 
          alt="Profile banner" 
          className="w-full h-full object-cover"
        />
        
        {/* Profile Avatar */}
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={profileData.avatar} alt={profileData.name} />
            <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </motion.div>
      </motion.div>
      
      {/* Profile Info */}
      <motion.div className="text-center mb-8" variants={item}>
        <h1 className="text-2xl font-bold">{profileData.name}</h1>
        <p className="text-muted-foreground">{profileData.username}</p>
        <p className="mt-2 max-w-md mx-auto">{profileData.bio}</p>
        
        <div className="flex items-center justify-center space-x-8 mt-4">
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="font-bold">{profileData.followers}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="font-bold">{profileData.following}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="font-bold">{profileData.likes}</p>
            <p className="text-sm text-muted-foreground">Likes</p>
          </motion.div>
        </div>
        
        <div className="flex justify-center mt-6 space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-primary hover:bg-primary/80 transition-colors">Follow</Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" />
              Message
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Content Tabs */}
      <motion.div variants={item}>
        <Tabs defaultValue="videos">
          <TabsList className="w-full max-w-md mx-auto">
            <TabsTrigger value="videos" className="flex-1">Videos</TabsTrigger>
            <TabsTrigger value="shorts" className="flex-1">Shorts</TabsTrigger>
            <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos" className="mt-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {userVideos.map((video) => (
                <motion.div 
                  key={video.id} 
                  variants={item}
                  className="hover-scale"
                >
                  <VideoCard key={video.id} video={video} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="shorts" className="mt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No shorts yet</p>
            </div>
          </TabsContent>
          
          <TabsContent value="about" className="mt-6">
            <motion.div 
              className="max-w-2xl mx-auto bg-card p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member since</p>
                    <p>January 2023</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5 text-muted-foreground"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p>{profileUser.location}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">About</h3>
                  <p>
                    Hey there! I'm Jessica, a digital creator passionate about travel, fashion, and lifestyle content.
                    I started my journey in 2020 and have been blessed to work with amazing brands and connect with
                    incredible people around the world. My goal is to inspire you to explore new places, try new things,
                    and live your best life!
                  </p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
