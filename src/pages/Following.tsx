
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser, User } from "@/contexts/UserContext"; 
import LoginModal from "@/components/auth/LoginModal";
import { toast } from "sonner";

const suggestedUsers: User[] = [
  {
    id: "s1",
    name: "Emma Watson",
    username: "@emmawatson",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: "s2",
    name: "David Beckham",
    username: "@davidbeckham",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: "s3",
    name: "Priyanka Chopra",
    username: "@priyankachopra",
    avatar: "https://i.pravatar.cc/150?img=8",
  }
];

const Following = () => {
  const { isAuthenticated, currentUser, followingUsers, followUser, unfollowUser, isFollowing } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Show the live users from the following list
  const liveUsers = followingUsers.filter(user => user.isLive);
  
  // Filter users based on search term
  const filteredFollowing = followingUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredSuggested = suggestedUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFollowClick = (userId: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to follow users");
      return;
    }
    followUser(userId);
  };

  const handleUnfollowClick = (userId: string) => {
    unfollowUser(userId);
  };
  
  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Following</h1>
          
          {!isAuthenticated ? (
            <LoginModal 
              trigger={
                <Button size="sm">Login to Follow</Button>
              } 
            />
          ) : (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{currentUser?.name}</span>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 border border-border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Live now section */}
        {isAuthenticated && liveUsers.length > 0 && (
          <section className="mb-8 animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">Live Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveUsers.map(user => (
                <div key={user.id} className="bg-secondary/50 rounded-lg p-4 flex items-center">
                  <div className="relative">
                    <Avatar className="h-14 w-14 mr-4">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-pulse-light absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.username}</p>
                  </div>
                  <Button size="sm">Watch</Button>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Following accounts */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Following</h2>
          
          {isAuthenticated && filteredFollowing.length === 0 && (
            <div className="text-center py-8 bg-secondary/20 rounded-lg">
              <p className="text-muted-foreground">
                {searchTerm ? "No results found" : "You aren't following anyone yet"}
              </p>
              {!searchTerm && (
                <p className="mt-2 text-sm">
                  Follow some accounts from the suggested section below
                </p>
              )}
            </div>
          )}
          
          {(!isAuthenticated || filteredFollowing.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {isAuthenticated ? (
                filteredFollowing.map(user => (
                  <div key={user.id} className="border border-border/50 rounded-lg p-4 flex items-center animate-fade-in">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.username}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleUnfollowClick(user.id)}
                    >
                      Unfollow
                    </Button>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 bg-secondary/20 rounded-lg">
                  <p className="text-muted-foreground mb-3">
                    Login to see who you're following
                  </p>
                  <LoginModal 
                    trigger={<Button size="sm">Login</Button>} 
                  />
                </div>
              )}
            </div>
          )}
        </section>
        
        {/* Suggested accounts */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Suggested for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSuggested.length > 0 ? (
              filteredSuggested.map(user => (
                <div key={user.id} className="border border-border/50 rounded-lg p-4 flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.username}</p>
                  </div>
                  {isAuthenticated ? (
                    isFollowing(user.id) ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleUnfollowClick(user.id)}
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => handleFollowClick(user.id)}
                      >
                        Follow
                      </Button>
                    )
                  ) : (
                    <LoginModal 
                      trigger={<Button size="sm">Follow</Button>} 
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 bg-secondary/20 rounded-lg">
                <p className="text-muted-foreground">No suggested users match your search</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Following;
