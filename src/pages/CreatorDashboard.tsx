
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, BarChart3, Users, Star, Play, MessageSquare } from "lucide-react";

const CreatorDashboard = () => {
  return (
    <MainLayout>
      <div className="content-container py-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Creator Dashboard</h1>
            <p className="text-muted-foreground">Track your performance across all platforms</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            Connect More Platforms
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Views" 
            value="1.2M" 
            change={+12.5}
            icon={<Play className="h-4 w-4" />}
          />
          <StatCard 
            title="Subscribers" 
            value="85.4K" 
            change={+5.3}
            icon={<Users className="h-4 w-4" />}
          />
          <StatCard 
            title="Engagement" 
            value="24.8%" 
            change={-2.1}
            icon={<Star className="h-4 w-4" />}
          />
          <StatCard 
            title="Comments" 
            value="14.3K" 
            change={+18.7}
            icon={<MessageSquare className="h-4 w-4" />}
          />
        </div>
        
        <Tabs defaultValue="analytics">
          <TabsList className="glass-effect mb-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="monetization">Monetization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Platform Breakdown</CardTitle>
                <CardDescription>
                  View your performance metrics across different platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Connect your creator accounts to see analytics here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content">
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">Content Management</h3>
              <p className="text-muted-foreground">Coming soon! Manage all your content in one place.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="audience">
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">Audience Insights</h3>
              <p className="text-muted-foreground">Coming soon! Understand your audience across all platforms.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="monetization">
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">Monetization Tools</h3>
              <p className="text-muted-foreground">Coming soon! Track and manage your revenue streams.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className="bg-secondary/40 p-2 rounded-full">
            {icon}
          </div>
        </div>
        <div className={`flex items-center mt-4 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? (
            <ArrowUp className="h-3 w-3 mr-1" />
          ) : (
            <ArrowDown className="h-3 w-3 mr-1" />
          )}
          <span>{Math.abs(change)}% from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatorDashboard;
