
import MainLayout from "@/components/layout/MainLayout";
import { Radio } from "lucide-react";

const Live = () => {
  return (
    <MainLayout>
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Live Streams</h1>
        <p className="text-xl text-muted-foreground mb-8">
          We're working on bringing live streams to ClipSnap. Stay tuned!
        </p>
        <div className="p-12 border border-dashed border-muted-foreground/50 rounded-md max-w-lg mx-auto">
          <Radio 
            size={64}
            className="mx-auto mb-6 text-muted-foreground"
          />
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
