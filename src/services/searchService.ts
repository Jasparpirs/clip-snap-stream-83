
import { supabase } from "@/integrations/supabase/client";

// Types for search results
export interface SearchResult {
  id: string;
  title: string;
  type: 'video' | 'user' | 'channel';
  thumbnail?: string;
  platform?: 'youtube' | 'twitch' | 'tiktok' | 'snapchat';
  views?: string;
  timestamp?: string;
  user?: {
    name: string;
    avatar: string;
  };
}

// Mock data for video and channel results
const mockSearchData: SearchResult[] = [
  {
    id: "s1",
    title: "How to Make Perfect Pasta Every Time",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    views: "1.2M views",
    timestamp: "3 days ago",
    platform: "youtube",
    user: {
      name: "Chef Mario",
      avatar: "https://i.pravatar.cc/150?img=11"
    }
  },
  {
    id: "s2",
    title: "Mountain Biking Trail Ride 2024",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1594739692769-8675aabdbb31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    views: "872K views",
    timestamp: "2 weeks ago",
    platform: "twitch",
    user: {
      name: "Extreme Sports",
      avatar: "https://i.pravatar.cc/150?img=12"
    }
  },
  {
    id: "s3",
    title: "TechLife",
    type: "channel",
    platform: "youtube",
    thumbnail: "https://i.pravatar.cc/150?img=14",
    user: {
      name: "Tech Life",
      avatar: "https://i.pravatar.cc/150?img=14"
    }
  },
  {
    id: "s5",
    title: "Gaming with Alex",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    views: "405K views",
    timestamp: "1 week ago",
    platform: "youtube",
    user: {
      name: "Alex Gaming",
      avatar: "https://i.pravatar.cc/150?img=15"
    }
  },
  {
    id: "s7",
    title: "Cooking Masterclass",
    type: "channel",
    platform: "twitch",
    thumbnail: "https://i.pravatar.cc/150?img=22",
    user: {
      name: "Chef Michael",
      avatar: "https://i.pravatar.cc/150?img=22"
    }
  },
];

// Function to search through users in Supabase and mock content
export const searchContent = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) return [];
  
  const results: SearchResult[] = [];
  const lowercaseQuery = query.toLowerCase();
  
  try {
    // Search for users in the auth system
    const { data: users, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error("Error fetching users:", error);
      // If we can't access users through admin (which requires more permissions),
      // we'll fall back to mock data for user results
    } else if (users) {
      // Convert matching users to search results
      users.users.forEach(user => {
        const userName = user.user_metadata?.name || user.email?.split('@')[0] || "";
        const userEmail = user.email || "";
        
        if (userName.toLowerCase().includes(lowercaseQuery) || 
            userEmail.toLowerCase().includes(lowercaseQuery)) {
          results.push({
            id: user.id,
            title: user.user_metadata?.name || userEmail.split('@')[0] || "User",
            type: "user",
            platform: "tiktok", // Default platform for users
            user: {
              name: user.user_metadata?.name || userEmail.split('@')[0] || "User",
              avatar: user.user_metadata?.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`
            }
          });
        }
      });
    }
  } catch (error) {
    console.error("Error in user search:", error);
  }

  // Filter mock data based on query for videos and channels
  const mockResults = mockSearchData.filter(item => 
    item.title.toLowerCase().includes(lowercaseQuery) || 
    item.user?.name.toLowerCase().includes(lowercaseQuery) ||
    // Match by first letter of words for more flexible search
    item.title.split(' ').some(word => word.toLowerCase()[0] === lowercaseQuery[0]) ||
    (item.user?.name && item.user.name.split(' ').some(word => word.toLowerCase()[0] === lowercaseQuery[0]))
  );
  
  return [...results, ...mockResults];
};
