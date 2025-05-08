
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

// Mock data for search results
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
    id: "s4",
    title: "Jessica Williams",
    type: "user",
    platform: "tiktok",
    user: {
      name: "Jessica Williams",
      avatar: "https://i.pravatar.cc/300?img=25"
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
    id: "s6",
    title: "Sarah Johnson",
    type: "user",
    platform: "snapchat",
    user: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=20"
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

// Function to search through mock data
export const searchContent = async (query: string): Promise<SearchResult[]> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!query.trim()) return [];
  
  // Filter mock data based on query - more flexible matching
  const lowercaseQuery = query.toLowerCase();
  return mockSearchData.filter(item => 
    item.title.toLowerCase().includes(lowercaseQuery) || 
    item.user?.name.toLowerCase().includes(lowercaseQuery) ||
    // Match by first letter of words for more flexible search
    item.title.split(' ').some(word => word.toLowerCase()[0] === lowercaseQuery[0]) ||
    (item.user?.name && item.user.name.split(' ').some(word => word.toLowerCase()[0] === lowercaseQuery[0]))
  );
};
