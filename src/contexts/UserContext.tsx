
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

// Define user and following types
export type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
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

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [followingUsers, setFollowingUsers] = useState<User[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);
  
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
        isMutualFollow
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
