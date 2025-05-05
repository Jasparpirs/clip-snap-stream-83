
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoCard from "./VideoCard";

// Sample video data
const videos = [
  {
    id: "1",
    title: "How to Make Perfect Pasta Every Time",
    thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    views: "1.2M views",
    timestamp: "3 days ago",
    user: {
      name: "Chef Mario",
      avatar: "https://i.pravatar.cc/150?img=11"
    }
  },
  {
    id: "2",
    title: "Epic Mountain Biking Trail Ride 2024",
    thumbnail: "https://images.unsplash.com/photo-1594739692769-8675aabdbb31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    views: "872K views",
    timestamp: "2 weeks ago",
    user: {
      name: "Extreme Sports",
      avatar: "https://i.pravatar.cc/150?img=12"
    }
  },
  {
    id: "3",
    title: "Learn React in 30 Minutes - Beginner Tutorial",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    views: "2.5M views",
    timestamp: "1 month ago",
    user: {
      name: "Code Masters",
      avatar: "https://i.pravatar.cc/150?img=13"
    }
  },
  {
    id: "4",
    title: "Day in the Life of a Software Engineer",
    thumbnail: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    views: "1.8M views",
    timestamp: "5 days ago",
    user: {
      name: "Tech Life",
      avatar: "https://i.pravatar.cc/150?img=14"
    }
  },
  {
    id: "5",
    title: "Morning Routine for Productivity",
    thumbnail: "https://images.unsplash.com/photo-1484627147104-f5197bcd6651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    views: "3.1M views",
    timestamp: "2 months ago",
    user: {
      name: "Lifestyle Plus",
      avatar: "https://i.pravatar.cc/150?img=15"
    }
  },
  {
    id: "6",
    title: "Secret Travel Gems in Europe You Must Visit",
    thumbnail: "https://images.unsplash.com/photo-1473951574080-01fe45ec8643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    views: "1.5M views",
    timestamp: "3 weeks ago",
    user: {
      name: "Travel Diaries",
      avatar: "https://i.pravatar.cc/150?img=16"
    }
  }
];

export default function VideoFeed() {
  const [layout, setLayout] = useState<"grid" | "feed">("grid");

  return (
    <div className="container py-6">
      <Tabs defaultValue="for-you" className="mb-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2">
            <Button
              variant={layout === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setLayout("grid")}
            >
              Grid
            </Button>
            <Button
              variant={layout === "feed" ? "default" : "outline"}
              size="sm"
              onClick={() => setLayout("feed")}
            >
              Feed
            </Button>
          </div>
        </div>
        
        <TabsContent value="for-you" className="mt-4">
          <div className={layout === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-6"
          }>
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} layout={layout} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trending" className="mt-4">
          <div className={layout === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-6"
          }>
            {/* Show some different videos in the trending tab */}
            {videos.slice().reverse().map((video) => (
              <VideoCard key={video.id} video={video} layout={layout} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="live" className="mt-4">
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">Live streams coming soon!</h3>
            <p className="text-muted-foreground">
              We're working on bringing live streams to ClipSnap. Stay tuned!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Import Button since it's used in this file
import { Button } from "../ui/button";
