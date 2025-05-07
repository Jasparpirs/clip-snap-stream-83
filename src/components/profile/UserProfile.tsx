
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import VideoCard from "../video/VideoCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, User } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import EditProfileForm from "./EditProfileForm";
import VideoUpload from "../video/VideoUpload";

export default function UserProfile() {
  const { currentUser, getUserVideos } = useUser();
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [likesCount, setLikesCount] = useState("0");
  const [videos, setVideos] = useState(getUserVideos());
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Handler to refresh the profile after updates
  const handleProfileRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  // Handler for when a video is uploaded
  const handleVideoUploaded = () => {
    setVideos(getUserVideos());
  };
  
  useEffect(() => {
    if (!currentUser?.id) return;
    
    setVideos(getUserVideos());
    
    // Get follower count
    const fetchFollowCounts = async () => {
      try {
        const { count: followers } = await supabase
          .from('followers')
          .select('*', { count: 'exact', head: true })
          .eq('followed_id', currentUser.id);
          
        const { count: following } = await supabase
          .from('followers')
          .select('*', { count: 'exact', head: true })
          .eq('follower_id', currentUser.id);
          
        setFollowersCount(followers || 0);
        setFollowingCount(following || 0);
      } catch (error) {
        console.error('Error fetching follow counts:', error);
        // Fall back to demo data if supabase isn't connected
        if (currentUser.followers) {
          setFollowersCount(parseInt(currentUser.followers.replace(/[^0-9]/g, '')) || 0);
        }
        if (currentUser.following) {
          setFollowingCount(parseInt(currentUser.following.replace(/[^0-9]/g, '')) || 0);
        }
      }
    };
    
    fetchFollowCounts();
    
    // Try to subscribe to changes in followers
    try {
      const followersSubscription = supabase
        .channel('followers-changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'followers', filter: `followed_id=eq.${currentUser.id}` }, 
          payload => {
            console.log('Followers change detected:', payload);
            fetchFollowCounts();
          })
        .subscribe();
        
      return () => {
        supabase.removeChannel(followersSubscription);
      };
    } catch (error) {
      console.error('Error setting up subscription:', error);
      // Continue without subscription if Supabase is not properly connected
    }
  }, [currentUser?.id, refreshKey]);
  
  // Use current user data or fallback to demo data if not authenticated
  const profileUser = currentUser || {
    id: "demo",
    name: "Guest User",
    username: "@guest",
    avatar: "https://i.pravatar.cc/300?img=25", 
    bio: "Please login to view your profile",
    location: "Unknown"
  };
  
  // Default banner image if not available in user data
  const defaultBannerImage = "https://images.unsplash.com/photo-1594751684241-bcef0ac9c64d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
  
  return (
    <div className="container py-6">
      {/* Profile Banner */}
      <div className="relative w-full h-48 md:h-64 rounded-md overflow-hidden mb-16">
        <img 
          src={profileUser.banner || defaultBannerImage} 
          alt="Profile banner" 
          className="w-full h-full object-cover"
        />
        
        {/* Profile Avatar */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={profileUser.avatar} alt={profileUser.name} />
            <AvatarFallback>{profileUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">{profileUser.name}</h1>
        <p className="text-muted-foreground">{profileUser.username}</p>
        <p className="mt-2 max-w-md mx-auto">{profileUser.bio}</p>
        
        <div className="flex items-center justify-center space-x-8 mt-4">
          <div className="text-center">
            <p className="font-bold">{followersCount}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{followingCount}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{profileUser.likes || "0"}</p>
            <p className="text-sm text-muted-foreground">Likes</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-6 space-x-4">
          {currentUser && (
            <>
              <EditProfileForm onProfileUpdate={handleProfileRefresh} />
              <VideoUpload onVideoUploaded={handleVideoUploaded} />
            </>
          )}
          {!currentUser && (
            <Button variant="outline">
              Login to Edit Profile
            </Button>
          )}
        </div>
      </div>
      
      {/* Content Tabs */}
      <Tabs defaultValue="videos">
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="videos" className="flex-1">Videos</TabsTrigger>
          <TabsTrigger value="shorts" className="flex-1">Shorts</TabsTrigger>
          <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="mt-6">
          {videos && videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-secondary/20 rounded-lg">
              <h3 className="text-xl font-medium mb-2">No videos yet</h3>
              <p className="text-muted-foreground mb-6">Upload your first video to get started</p>
              {currentUser && <VideoUpload onVideoUploaded={handleVideoUploaded} />}
            </div>
          )}
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
                  <p>{profileUser.location}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">About</h3>
                <p>
                  {currentUser ? 
                    `Hey there! I'm ${profileUser.name}, a digital creator passionate about sharing my interests and connecting with others.` : 
                    "Please login to view your profile information."
                  }
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
