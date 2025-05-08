
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Maximize2, Minimize2, MessageCircle, Users, Share } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const MultiStream = () => {
  const [chatOpen, setChatOpen] = useState(true);
  const [layout, setLayout] = useState<"grid" | "main">("grid");
  
  const streams = [
    {
      id: "1",
      title: "Minecraft Championship Season 3",
      platform: "Twitch",
      viewers: "15.2K",
      creator: {
        name: "GamerPro",
        avatar: "https://i.pravatar.cc/150?img=10"
      }
    },
    {
      id: "2",
      title: "React Conference Live",
      platform: "YouTube",
      viewers: "8.7K",
      creator: {
        name: "TechTalks",
        avatar: "https://i.pravatar.cc/150?img=11"
      }
    }
  ];
  
  const chatMessages = [
    {
      id: "1",
      user: "GameFan123",
      avatar: "https://i.pravatar.cc/150?img=30",
      message: "That last round was amazing!",
      timestamp: "2m ago"
    },
    {
      id: "2",
      user: "CodeMaster",
      avatar: "https://i.pravatar.cc/150?img=31",
      message: "Anyone else watching both streams? This is so convenient!",
      timestamp: "1m ago"
    },
    {
      id: "3",
      user: "StreamLover",
      avatar: "https://i.pravatar.cc/150?img=32",
      message: "The new multistream feature is awesome",
      timestamp: "30s ago"
    }
  ];

  return (
    <MainLayout withSidebar={false}>
      <div className="h-[calc(100vh-56px)] flex flex-col md:flex-row">
        <div className={cn(
          "flex-1 p-4",
          chatOpen ? "md:w-3/4" : "w-full"
        )}>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">MultiStream</h1>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setChatOpen(!chatOpen)}>
                <MessageCircle className="h-4 w-4 mr-1" />
                {chatOpen ? "Hide Chat" : "Show Chat"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setLayout(layout === "grid" ? "main" : "grid")}>
                {layout === "grid" ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className={cn(
            "grid gap-4 h-[calc(100%-60px)]",
            layout === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          )}>
            {streams.map((stream, index) => (
              <Card key={stream.id} className={cn(
                "overflow-hidden relative h-full border-none bg-background/60",
                layout === "main" && index === 0 ? "md:col-span-2 md:row-span-2" : ""
              )}>
                <div className="absolute top-0 left-0 w-full p-2 bg-gradient-to-b from-black/60 to-transparent flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      className={cn(
                        stream.platform === "Twitch" ? "bg-purple-600" : "bg-red-600"
                      )}
                    >
                      {stream.platform}
                    </Badge>
                    <div className="flex items-center space-x-1 bg-black/40 px-2 py-1 rounded text-xs">
                      <Users className="h-3 w-3" />
                      <span>{stream.viewers}</span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="text-white hover:bg-black/20">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="aspect-video w-full h-full bg-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={stream.creator.avatar} />
                        <AvatarFallback>{stream.creator.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{stream.creator.name}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{stream.title}</p>
                    <Button variant="outline" className="mt-4">Connect Stream</Button>
                  </div>
                </div>
              </Card>
            ))}
            
            <Card className="overflow-hidden relative h-full border-none bg-background/30 flex items-center justify-center">
              <div className="text-center">
                <Button variant="outline" size="lg" className="rounded-full">
                  <Plus className="h-5 w-5 mr-1" />
                  Add Stream
                </Button>
                <p className="text-muted-foreground text-sm mt-2">Add another stream to your view</p>
              </div>
            </Card>
          </div>
        </div>
        
        {chatOpen && (
          <div className="md:w-1/4 border-l border-border p-4 glass-effect">
            <h2 className="font-medium mb-4 flex justify-between items-center">
              <span>Watch Party Chat</span>
              <Badge variant="outline" className="font-normal">{chatMessages.length}</Badge>
            </h2>
            
            <ScrollArea className="h-[calc(100vh-180px)]">
              <div className="space-y-4 pr-4">
                {chatMessages.map(message => (
                  <div key={message.id} className="flex space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-sm">{message.user}</span>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="mt-4">
              <Input 
                placeholder="Type a message..." 
                className="glass-effect"
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MultiStream;
