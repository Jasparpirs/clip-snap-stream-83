import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  username: string;
  avatar_url: string;
  is_live?: boolean;
}

const Following = () => {
  const { user, isAuthenticated } = useAuth();
  const [followingUsers, setFollowingUsers] = useState<UserProfile[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      
      try {
        if (!isAuthenticated) {
          // Fallback to sample data if not authenticated
          setFollowingUsers([]);
          setSuggestedUsers([]);
          setLoading(false);
          return;
        }
        
        // Fetch following relationships for the current user
        const { data: relationships, error: relError } = await supabase
          .from('relationships')
          .select('following_id')
          .eq('follower_id', user?.id);
          
        if (relError) {
          console.error("Error fetching relationships:", relError);
          return;
        }
        
        // Extract following IDs
        const followingIds = relationships?.map(rel => rel.following_id) || [];
        
        if (followingIds.length > 0) {
          // Fetch profiles of users being followed
          const { data: followingProfiles, error: profilesError } = await supabase
            .from('profiles')
            .select('*')
            .in('id', followingIds);
            
          if (profilesError) {
            console.error("Error fetching following profiles:", profilesError);
          } else if (followingProfiles) {
            // Randomly assign some users as "live" for demo purposes
            const processedFollowing = followingProfiles.map(profile => ({
              ...profile,
              is_live: Math.random() > 0.7 // 30% chance of being live
            }));
            setFollowingUsers(processedFollowing);
          }
        }
        
        // Fetch suggested users (users not being followed)
        const { data: allProfiles, error: allProfilesError } = await supabase
          .from('profiles')
          .select('*')
          .neq('id', user?.id)
          .limit(10);
          
        if (allProfilesError) {
          console.error("Error fetching suggested profiles:", allProfilesError);
        } else if (allProfiles) {
          const suggested = allProfiles.filter(profile => 
            !followingIds.includes(profile.id)
          ).slice(0, 3);
          
          setSuggestedUsers(suggested);
        }
      } catch (error) {
        console.error("Error in fetchUsers:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [user, isAuthenticated]);
  
  const handleFollowUser = async (userId: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to follow users");
      return;
    }
    
    try {
      // Add relationship to database
      const { error } = await supabase
        .from('relationships')
        .insert([
          { follower_id: user?.id, following_id: userId }
        ]);
        
      if (error) {
        console.error("Error following user:", error);
        toast.error("Failed to follow user");
        return;
      }
      
      // Update local state
      const userToMove = suggestedUsers.find(u => u.id === userId);
      if (userToMove) {
        setFollowingUsers(prev => [...prev, userToMove]);
        setSuggestedUsers(prev => prev.filter(u => u.id !== userId));
        toast.success("User followed successfully!");
      }
    } catch (error) {
      console.error("Error in handleFollowUser:", error);
      toast.error("An error occurred");
    }
  };

  // Provide fallback data when no users are found
  const getFallbackUsers = (type: 'following' | 'suggested') => {
    if (type === 'following') {
      return [
        {
          id: "f1",
          username: "Alex Morgan",
          avatar_url: "https://i.pravatar.cc/150?img=1",
        },
        {
          id: "f2",
          username: "Jamie Chen",
          avatar_url: "https://i.pravatar.cc/150?img=2",
        }
      ];
    } else {
      return [
        {
          id: "s1",
          username: "Emma Watson",
          avatar_url: "https://i.pravatar.cc/150?img=6",
        },
        {
          id: "s2",
          username: "David Beckham",
          avatar_url: "https://i.pravatar.cc/150?img=7",
        }
      ];
    }
  };

  // Use real users if available, otherwise use fallback data
  const displayFollowing = followingUsers.length > 0 ? followingUsers : getFallbackUsers('following');
  const displaySuggested = suggestedUsers.length > 0 ? suggestedUsers : getFallbackUsers('suggested');
  const liveUsers = displayFollowing.filter(user => user.is_live);

  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Following</h1>
        
        {/* Live now section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Live Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <p className="col-span-3 text-center py-4">Loading live users...</p>
            ) : liveUsers.length > 0 ? (
              liveUsers.map(user => (
                <div key={user.id} className="bg-secondary/50 rounded-lg p-4 flex items-center">
                  <div className="relative">
                    <Avatar className="h-14 w-14 mr-4">
                      <AvatarImage src={user.avatar_url} alt={user.username} />
                      <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-pulse-light absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{user.username}</h3>
                    <p className="text-sm text-muted-foreground">@{user.username.toLowerCase().replace(" ", "")}</p>
                  </div>
                  <Button size="sm">Watch</Button>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-muted-foreground">No one is live right now</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Following accounts */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Following</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <p className="col-span-3 text-center py-4">Loading following users...</p>
            ) : displayFollowing.length > 0 ? (
              displayFollowing.map(user => (
                <div key={user.id} className="border border-border/50 rounded-lg p-4 flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={user.avatar_url} alt={user.username} />
                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{user.username}</h3>
                    <p className="text-sm text-muted-foreground">@{user.username.toLowerCase().replace(" ", "")}</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-muted-foreground mb-2">You are not following anyone yet</p>
                <Button variant="outline" onClick={() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})}>
                  Explore Suggested Users
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Suggested accounts */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Suggested for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <p className="col-span-3 text-center py-4">Loading suggested users...</p>
            ) : (
              displaySuggested.map(user => (
                <div key={user.id} className="border border-border/50 rounded-lg p-4 flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={user.avatar_url} alt={user.username} />
                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{user.username}</h3>
                    <p className="text-sm text-muted-foreground">@{user.username.toLowerCase().replace(" ", "")}</p>
                  </div>
                  <Button size="sm" onClick={() => handleFollowUser(user.id)}>Follow</Button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Following;
