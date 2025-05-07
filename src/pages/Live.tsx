
import MainLayout from "@/components/layout/MainLayout";
import { Radio, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Live = () => {
  return (
    <MainLayout>
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Live Streams</h1>
        <p className="text-xl text-muted-foreground mb-8">
          We're working on bringing live streams to ClipSnap. Stay tuned!
        </p>
        <div className="p-12 border border-dashed border-muted-foreground/50 rounded-md max-w-lg mx-auto">
          <div className="relative mx-auto w-16 h-16 mb-6">
            <Radio 
              size={64}
              className="text-muted-foreground"
            />
            <Badge variant="destructive" className="absolute -top-2 -right-2 animate-pulse">LIVE</Badge>
          </div>
          <p className="text-muted-foreground">
            Live streaming functionality will be available soon.
            <br />Check back for updates!
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Live;
