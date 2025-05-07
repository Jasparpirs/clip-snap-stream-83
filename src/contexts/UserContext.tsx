import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

// Define user and following types
export type Video = {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  videoUrl?: string;
  views: string;
  timestamp: string;
  isLive?: boolean;
  user: {
    name: string;
    avatar: string;
  }
};

export type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  banner?: string;  // Banner image URL
  isFollowing?: boolean;
  isLive?: boolean;
  bio?: string;
  followers?: string;
  following?: string;
  likes?: string;
  location?: string;
  lastMessage?: string;
  timestamp?: string;
  unread?: boolean;
  online?: boolean;
  videos?: Video[];
};

type UserProfileUpdate = {
  name: string;
  bio?: string;
  location?: string;
  avatar?: string;
  banner?: string;
};

type UserContextType = {
  currentUser: User | null;
  isAuthenticated: boolean;
  followingUsers: User[];
  followers: User[];
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, username: string, password: string) => Promise<boolean>;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  isFollowing: (userId: string) => boolean;
  isFollower: (userId: string) => boolean;
  isMutualFollow: (userId: string) => boolean;
  updateUserProfile: (data: UserProfileUpdate) => Promise<boolean>;
  addUserVideo: (video: Video) => Promise<boolean>;
  getUserVideos: (userId?: string) => Video[];
};

const UserContext = createContext<UserContextType>({
  currentUser: null,
  isAuthenticated: false,
  followingUsers: [],
  followers: [],
  login: () => Promise.resolve(false),
  logout: () => {},
  register: () => Promise.resolve(false),
  followUser: () => {},
  unfollowUser: () => {},
  isFollowing: () => false,
  isFollower: () => false,
  isMutualFollow: () => false,
  updateUserProfile: () => Promise.resolve(false),
  addUserVideo: () => Promise.resolve(false),
  getUserVideos: () => [],
});

// Demo users for local testing
const demoUsers: User[] = [
  {
    id: "f1",
    name: "Alex Morgan",
    username: "@alexmorgan",
    avatar: "https://i.pravatar.cc/150?img=1",
    isLive: true,
    lastMessage: "Hey, did you see my new video?",
    timestamp: "2m ago",
    unread: true,
    online: true
  },
  {
    id: "f2",
    name: "Jamie Chen",
    username: "@jamiechen",
    avatar: "https://i.pravatar.cc/150?img=2",
    isLive: false,
    lastMessage: "Thanks for the feedback on my stream",
    timestamp: "1h ago",
    unread: false,
    online: false
  },
  {
    id: "f3",
    name: "Taylor Swift",
    username: "@taylorswift",
    avatar: "https://i.pravatar.cc/150?img=3",
    isLive: false,
    lastMessage: "I'd love to collaborate on your next project!",
    timestamp: "3h ago",
    unread: true,
    online: true
  },
  {
    id: "f4",
    name: "Chris Evans",
    username: "@chrisevans",
    avatar: "https://i.pravatar.cc/150?img=4",
    isLive: true,
    lastMessage: "That video was amazing",
    timestamp: "1d ago",
    unread: false,
    online: false
  },
  {
    id: "f5",
    name: "Zoe Smith",
    username: "@zoesmith",
    avatar: "https://i.pravatar.cc/150?img=5",
    isLive: false,
    lastMessage: "Let me know when you're free to chat",
    timestamp: "1d ago",
    unread: false,
    online: true
  },
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
  },
  {
    id: "u1",
    name: "Jessica Williams",
    username: "@jessicawill",
    avatar: "https://i.pravatar.cc/300?img=25",
    bio: "Digital creator | Travel enthusiast | Making content that inspires",
    followers: "1.2M",
    following: "345",
    likes: "18.5M",
    location: "Los Angeles, CA"
  }
];

// Demo videos
const demoVideos: { [userId: string]: Video[] } = {
  "u1": [
    {
      id: "vid-1",
      title: "A day in my life as a content creator",
      description: "Follow me around as I create content and share my creative process!",
      thumbnail: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      views: "1.8M views",
      timestamp: "1 week ago",
      user: {
        name: "Jessica Williams",
        avatar: "https://i.pravatar.cc/300?img=25"
      }
    },
    {
      id: "vid-2",
      title: "5 tips to grow your social media in 2025",
      description: "Learn how to grow your social media presence with these proven tips!",
      thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      views: "954K views",
      timestamp: "3 weeks ago",
      user: {
        name: "Jessica Williams",
        avatar: "https://i.pravatar.cc/300?img=25"
      }
    },
    {
      id: "vid-3",
      title: "Exploring hidden beaches in Bali | Travel vlog",
      description: "Join me as I discover the most beautiful hidden beaches in Bali!",
      thumbnail: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
      views: "2.4M views",
      timestamp: "1 month ago",
      user: {
        name: "Jessica Williams",
        avatar: "https://i.pravatar.cc/300?img=25"
      }
    }
  ]
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [followingUsers, setFollowingUsers] = useState<User[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);
  const [userVideos, setUserVideos] = useState<{ [userId: string]: Video[] }>(demoVideos);
  
  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      
      // Load following data
      const savedFollowing = localStorage.getItem('following');
      if (savedFollowing) {
        const followingIds = JSON.parse(savedFollowing);
        setFollowingUsers(
          demoUsers.filter(user => followingIds.includes(user.id))
        );
      }
      
      // Load followers data
      const savedFollowers = localStorage.getItem('followers');
      if (savedFollowers) {
        const followerIds = JSON.parse(savedFollowers);
        setFollowers(
          demoUsers.filter(user => followerIds.includes(user.id))
        );
      }
    }
    
    // Load videos from localStorage if available
    const savedVideos = localStorage.getItem('userVideos');
    if (savedVideos) {
      try {
        setUserVideos(JSON.parse(savedVideos));
      } catch (error) {
        console.error("Error parsing saved videos:", error);
      }
    }
  }, []);
  
  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple mock login - in a real app this would verify credentials with a server
    const user = demoUsers.find(u => u.username === username);
    
    if (user && password === "password") { // Simple password check for demo
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Load any previously followed users
      const savedFollowing = localStorage.getItem('following');
      if (savedFollowing) {
        const followingIds = JSON.parse(savedFollowing);
        setFollowingUsers(
          demoUsers.filter(u => followingIds.includes(u.id))
        );
      }
      
      // Load any followers
      const savedFollowers = localStorage.getItem('followers');
      if (savedFollowers) {
        const followerIds = JSON.parse(savedFollowers);
        setFollowers(
          demoUsers.filter(u => followerIds.includes(u.id))
        );
      }
      
      toast.success(`Welcome back, ${user.name}!`);
      return true;
    }
    
    toast.error("Invalid username or password");
    return false;
  };
  
  const register = async (name: string, username: string, password: string): Promise<boolean> => {
    // Check if username already exists
    if (demoUsers.some(u => u.username === username)) {
      toast.error("Username already exists");
      return false;
    }
    
    // Create a new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      username,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      followers: "0",
      following: "0",
      likes: "0"
    };
    
    // In a real app, you would send this to a server
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('following', JSON.stringify([]));
    localStorage.setItem('followers', JSON.stringify([]));
    setFollowingUsers([]);
    setFollowers([]);
    
    toast.success("Account created successfully!");
    return true;
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast.info("You have been logged out");
  };
  
  const followUser = (userId: string) => {
    if (!currentUser) {
      toast.error("Please log in to follow users");
      return;
    }
    
    const userToFollow = demoUsers.find(u => u.id === userId);
    if (!userToFollow) return;
    
    // Add to following list
    setFollowingUsers(prev => {
      if (prev.some(u => u.id === userId)) return prev;
      return [...prev, userToFollow];
    });
    
    // Save to localStorage
    const followingIds = followingUsers.map(u => u.id);
    if (!followingIds.includes(userId)) {
      followingIds.push(userId);
      localStorage.setItem('following', JSON.stringify(followingIds));
    }
    
    // Simulate the other user following back 50% of the time for demo purposes
    if (Math.random() > 0.5 && !isFollower(userId)) {
      addFollower(userId);
      toast.success(`${userToFollow.name} followed you back!`);
    }
    
    toast.success(`You are now following ${userToFollow.name}`);
  };
  
  const unfollowUser = (userId: string) => {
    setFollowingUsers(prev => prev.filter(user => user.id !== userId));
    
    // Update localStorage
    const followingIds = followingUsers.map(u => u.id).filter(id => id !== userId);
    localStorage.setItem('following', JSON.stringify(followingIds));
    
    const userToUnfollow = demoUsers.find(u => u.id === userId);
    if (userToUnfollow) {
      toast.info(`You unfollowed ${userToUnfollow.name}`);
    }
  };
  
  // Method to add a follower (simulated for the demo)
  const addFollower = (userId: string) => {
    const follower = demoUsers.find(u => u.id === userId);
    if (!follower || followers.some(f => f.id === userId)) return;
    
    setFollowers(prev => [...prev, follower]);
    
    // Save to localStorage
    const followerIds = followers.map(f => f.id);
    if (!followerIds.includes(userId)) {
      followerIds.push(userId);
      localStorage.setItem('followers', JSON.stringify(followerIds));
    }
  };
  
  const isFollowing = (userId: string): boolean => {
    return followingUsers.some(user => user.id === userId);
  };
  
  const isFollower = (userId: string): boolean => {
    return followers.some(user => user.id === userId);
  };
  
  const isMutualFollow = (userId: string): boolean => {
    return isFollowing(userId) && isFollower(userId);
  };
  
  const updateUserProfile = async (data: UserProfileUpdate): Promise<boolean> => {
    if (!currentUser) return false;
    
    try {
      // Try to update in Supabase if available
      try {
        await supabase
          .from('users')
          .update(data)
          .eq('id', currentUser.id);
      } catch (error) {
        console.log("Supabase update failed, updating locally", error);
      }
      
      // Update locally regardless
      const updatedUser = { ...currentUser, ...data };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error("Error updating user profile:", error);
      return false;
    }
  };
  
  const addUserVideo = async (video: Video): Promise<boolean> => {
    if (!currentUser) return false;
    
    try {
      // Try to add to Supabase if available
      try {
        await supabase
          .from('videos')
          .insert([{ ...video, user_id: currentUser.id }]);
      } catch (error) {
        console.log("Supabase video insert failed, updating locally", error);
      }
      
      // Update locally regardless
      const userId = currentUser.id;
      const updatedVideos = { ...userVideos };
      
      if (!updatedVideos[userId]) {
        updatedVideos[userId] = [];
      }
      
      updatedVideos[userId] = [video, ...updatedVideos[userId]];
      setUserVideos(updatedVideos);
      localStorage.setItem('userVideos', JSON.stringify(updatedVideos));
      return true;
    } catch (error) {
      console.error("Error adding video:", error);
      return false;
    }
  };
  
  const getUserVideos = (userId?: string): Video[] => {
    const id = userId || currentUser?.id;
    if (!id) return [];
    
    return userVideos[id] || [];
  };
  
  return (
    <UserContext.Provider 
      value={{ 
        currentUser, 
        isAuthenticated: !!currentUser,
        followingUsers,
        followers,
        login, 
        logout,
        register,
        followUser,
        unfollowUser,
        isFollowing,
        isFollower,
        isMutualFollow,
        updateUserProfile,
        addUserVideo,
        getUserVideos
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
