
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Upload, Download, Share } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ClipCreator = () => {
  return (
    <MainLayout>
      <div className="content-container py-6 animate-fade-in">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <Badge className="mb-2">Beta Feature</Badge>
          <h1 className="text-3xl font-bold mb-3">Cross-Platform Clip Creator</h1>
          <p className="text-muted-foreground">
            Create, edit and share clips from any platform. Combine content from different sources into a 
            single video that you can share anywhere.
          </p>
        </div>
        
        <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center">
              <Upload className="mr-2 h-6 w-6" />
              Upload Content
            </CardTitle>
            <CardDescription>
              Drag and drop videos or import from your connected platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-6">
              <Button variant="outline" className="h-20 flex flex-col" disabled>
                <Scissors className="h-6 w-6 mb-1" />
                <span>New Clip</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col" disabled>
                <Upload className="h-6 w-6 mb-1" />
                <span>Upload Files</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col" disabled>
                <Download className="h-6 w-6 mb-1" />
                <span>Import from Platforms</span>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Coming soon! This feature is currently in development.
            </p>
            
            <Button className="gap-2">
              <Share className="h-4 w-4" />
              Join Beta Waitlist
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ClipCreator;
