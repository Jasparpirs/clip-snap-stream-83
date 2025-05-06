
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import VideoCard from "../video/VideoCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, User } from "lucide-react";
import { useUser, User as UserType } from "@/contexts/UserContext";
import LoginModal from "@/components/auth/LoginModal";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface OtherUserProfileProps {
  user: UserType;
}

// Sample videos for this user
const userVideos = [
  {
    id: "v1",
    title: "Day in my life as a content creator",
    thumbnail: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    views: "1.8M views",
    timestamp: "1 week ago",
    user: {
      name: "User",
      avatar: "https://i.pravatar.cc/300?img=25"
    }
  },
  {
    id: "v2",
    title: "5 tips to grow your social media in 2025",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    views: "954K views",
    timestamp: "3 weeks ago",
    user: {
      name: "User",
      avatar: "https://i.pravatar.cc/300?img=25"
    }
  },
  {
    id: "v3",
    title: "Exploring hidden beaches in Bali | Travel vlog",
    thumbnail: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    views: "2.4M views",
    timestamp: "1 month ago",
    user: {
      name: "User", 
      avatar: "https://i.pravatar.cc/300?img=25"
    }
  }
];

export default function OtherUserProfile({ user }: OtherUserProfileProps) {
  const { isAuthenticated, isFollowing, isFollower, followUser, unfollowUser, isMutualFollow } = useUser();
  const navigate = useNavigate();
  
  const handleFollowClick = () => {
    followUser(user.id);
  };

  const handleUnfollowClick = () => {
    unfollowUser(user.id);
  };
  
  const handleMessageClick = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to message users");
      return;
    }
    
    if (!isMutualFollow(user.id)) {
      toast.error(`You can only message ${user.name} if they follow you back`);
      return;
    }
    
    navigate("/messages");
  };
  
  // Update video objects with actual user data
  const videos = userVideos.map(video => ({
    ...video,
    user: {
      name: user.name,
      avatar: user.avatar
    }
  }));

  return (
    <div className="container py-6">
      {/* Profile Banner */}
      <div className="relative w-full h-48 md:h-64 rounded-md overflow-hidden mb-16 bg-secondary/50">
        <img 
          src={`https://images.unsplash.com/photo-1594751684241-bcef0ac9c64d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`}
          alt="Profile banner" 
          className="w-full h-full object-cover"
        />
        
        {/* Profile Avatar */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">{user.username}</p>
        <p className="mt-2 max-w-md mx-auto">{user.bio}</p>
        
        <div className="flex items-center justify-center space-x-8 mt-4">
          <div className="text-center">
            <p className="font-bold">{user.followers}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{user.following}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{user.likes}</p>
            <p className="text-sm text-muted-foreground">Likes</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-6 space-x-4">
          {isAuthenticated ? (
            <>
              {isFollowing(user.id) ? (
                <Button variant="outline" onClick={handleUnfollowClick}>Unfollow</Button>
              ) : (
                <Button onClick={handleFollowClick}>Follow</Button>
              )}
              <Button 
                variant={isMutualFollow(user.id) ? "default" : "outline"} 
                onClick={handleMessageClick}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {isMutualFollow(user.id) ? "Message" : "Can't Message"}
              </Button>
            </>
          ) : (
            <LoginModal 
              trigger={<Button>Follow</Button>} 
            />
          )}
        </div>
        
        {isFollowing(user.id) && !isFollower(user.id) && (
          <p className="mt-2 text-sm text-muted-foreground">
            {user.name} doesn't follow you back yet
          </p>
        )}
        
        {isMutualFollow(user.id) && (
          <p className="mt-2 text-sm text-primary">
            You follow each other
          </p>
        )}
      </div>
      
      {/* Content Tabs */}
      <Tabs defaultValue="videos">
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="videos" className="flex-1">Videos</TabsTrigger>
          <TabsTrigger value="shorts" className="flex-1">Shorts</TabsTrigger>
          <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="shorts" className="mt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No shorts yet</p>
          </div>
        </TabsContent>
        
        <TabsContent value="about" className="mt-6">
          <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg">
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
                  <p>{user.location || "Unknown"}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">About</h3>
                <p>
                  {user.bio || `Hi, I'm ${user.name}! Welcome to my profile.`}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
