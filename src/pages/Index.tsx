
import MainLayout from "@/components/layout/MainLayout";
import VideoFeed from "@/components/video/VideoFeed";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Tv, Scissors, Share2, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    // Welcome toast when user first visits
    toast.success("Welcome to ClipSnap!", {
      description: "Discover videos, follow creators, and share your world across multiple platforms.",
      duration: 5000,
    });
  }, []);
  
  const features = [
    {
      title: "MultiStream View",
      description: "Watch multiple streams at once from different platforms",
      icon: Tv,
      path: "/multi-stream",
      color: "bg-blue-500/20"
    },
    {
      title: "AI Content Summaries",
      description: "Get AI-generated highlights of long videos and streams",
      icon: Share2,
      path: "/ai-summaries",
      color: "bg-purple-500/20"
    },
    {
      title: "Cross-Platform Clip Creator",
      description: "Create clips from multiple sources and share anywhere",
      icon: Scissors,
      path: "/clip-creator",
      color: "bg-green-500/20"
    },
    {
      title: "Creator Analytics",
      description: "Track your performance across all platforms",
      icon: BarChart2,
      path: "/creator-dashboard",
      color: "bg-orange-500/20"
    }
  ];
  
  return (
    <MainLayout>
      <div className="content-container py-6 animate-fade-in space-y-10">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">New Features</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/ai-summaries" className="flex items-center">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:border-primary/50 transition-all duration-200">
                <CardHeader className="pb-2">
                  <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center mb-2`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={feature.path}>Try it now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recommended Videos</h2>
          </div>
          <VideoFeed />
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
