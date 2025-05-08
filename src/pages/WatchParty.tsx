
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Video, Share, Users, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";

const WatchParty = () => {
  return (
    <MainLayout>
      <div className="content-container py-6 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Watch Party</h1>
          <p className="text-muted-foreground">
            Watch videos together with friends in real-time, synced across all devices
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Create a Watch Party</CardTitle>
              <CardDescription>
                Start a new session and invite friends to watch together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Party Name</label>
                  <Input placeholder="My awesome watch party" />
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">Video URL</label>
                  <Input placeholder="YouTube, Twitch or TikTok URL" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="private" className="rounded" />
                  <label htmlFor="private" className="text-sm">Make this party private</label>
                </div>
                
                <Button className="w-full">
                  <Video className="h-4 w-4 mr-2" />
                  Create Watch Party
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Join a Watch Party</CardTitle>
              <CardDescription>
                Enter an invite code to join an existing party
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Invite Code</label>
                  <Input placeholder="Enter party code (e.g., PARTY-123)" />
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Ask your friend to share their party code, or use a link they sent you.
                </p>
                
                <Button className="w-full" variant="outline">
                  Join Party
                </Button>
                
                <div className="pt-4 mt-4 border-t">
                  <h4 className="font-medium mb-2">Active Watch Parties</h4>
                  <div className="space-y-2">
                    <WatchPartyItem 
                      name="Movie Night: Inception" 
                      participants={8} 
                      isPrivate={false} 
                    />
                    <WatchPartyItem 
                      name="Gaming Stream Watch-along" 
                      participants={24} 
                      isPrivate={false} 
                    />
                    <WatchPartyItem 
                      name="Friend's Birthday Stream" 
                      participants={5} 
                      isPrivate={true} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

interface WatchPartyItemProps {
  name: string;
  participants: number;
  isPrivate: boolean;
}

const WatchPartyItem = ({ name, participants, isPrivate }: WatchPartyItemProps) => {
  return (
    <div className="flex justify-between items-center p-3 hover:bg-secondary/20 rounded-md transition-colors">
      <div className="flex items-center">
        {isPrivate && <Lock className="h-3 w-3 mr-2 text-muted-foreground" />}
        <span>{name}</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center text-xs text-muted-foreground">
          <Users className="h-3 w-3 mr-1" />
          <span>{participants}</span>
        </div>
        <Button size="sm" variant="ghost" disabled={isPrivate}>Join</Button>
      </div>
    </div>
  );
};

export default WatchParty;
