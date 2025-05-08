
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock } from "lucide-react";

const AiSummaries = () => {
  const summaries = [
    {
      id: "1",
      title: "3-Hour Minecraft Stream Highlights",
      thumbnail: "https://images.unsplash.com/photo-1600861194942-f883de0dba97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      originalDuration: "3h 12m",
      summaryDuration: "4m 30s",
      platform: "Twitch",
      creator: {
        name: "MinecraftMaster",
        avatar: "https://i.pravatar.cc/150?img=33"
      }
    },
    {
      id: "2",
      title: "Full iOS 18 Walkthrough - All Features Explained",
      thumbnail: "https://images.unsplash.com/photo-1517336277864-8c02f49ef022?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2626&q=80",
      originalDuration: "1h 45m",
      summaryDuration: "5m 15s",
      platform: "YouTube",
      creator: {
        name: "TechGuru",
        avatar: "https://i.pravatar.cc/150?img=68"
      }
    },
    {
      id: "3",
      title: "React 19 Complete Tutorial",
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      originalDuration: "4h 23m",
      summaryDuration: "7m 40s",
      platform: "YouTube",
      creator: {
        name: "CodeNinja",
        avatar: "https://i.pravatar.cc/150?img=12"
      }
    },
    {
      id: "4",
      title: "Summer Vlog Compilation",
      thumbnail: "https://images.unsplash.com/photo-1536759808958-ecd96893f3bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      originalDuration: "32m",
      summaryDuration: "2m 10s",
      platform: "TikTok",
      creator: {
        name: "TravelWithMe",
        avatar: "https://i.pravatar.cc/150?img=23"
      }
    }
  ];

  return (
    <MainLayout>
      <div className="content-container py-6 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI-Generated Summaries</h1>
          <p className="text-muted-foreground">Watch longer content in minutes with AI-generated summaries and highlights</p>
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="glass-effect mb-6">
            <TabsTrigger value="all">All Platforms</TabsTrigger>
            <TabsTrigger value="twitch">Twitch</TabsTrigger>
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
            <TabsTrigger value="tiktok">TikTok</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {summaries.map(summary => (
                <Card key={summary.id} className="overflow-hidden border-none bg-background/60">
                  <div className="relative">
                    <img 
                      src={summary.thumbnail} 
                      alt={summary.title} 
                      className="aspect-video w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-primary">{summary.platform}</Badge>
                        <div className="flex items-center space-x-1 bg-background/80 px-2 py-1 rounded-md text-xs">
                          <Clock className="h-3 w-3" />
                          <span>{summary.originalDuration} → {summary.summaryDuration}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full" size="icon">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-2">{summary.title}</CardTitle>
                    <CardDescription className="flex items-center space-x-2 mt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={summary.creator.avatar} alt={summary.creator.name} />
                        <AvatarFallback>{summary.creator.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{summary.creator.name}</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardFooter>
                    <div className="flex justify-between w-full">
                      <Button variant="outline" size="sm">Watch Summary</Button>
                      <Button variant="ghost" size="sm">Original Video</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="twitch">
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold">Twitch Summaries</h3>
              <p className="text-muted-foreground mt-2">Automatically generated from your favorite Twitch streamers</p>
            </div>
          </TabsContent>
          
          <TabsContent value="youtube">
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold">YouTube Summaries</h3>
              <p className="text-muted-foreground mt-2">Get the key points from lengthy YouTube tutorials</p>
            </div>
          </TabsContent>
          
          <TabsContent value="tiktok">
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold">TikTok Compilations</h3>
              <p className="text-muted-foreground mt-2">The best TikTok content summarized for you</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AiSummaries;
