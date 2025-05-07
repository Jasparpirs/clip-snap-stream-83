
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { User } from "@/contexts/UserContext";
import MainLayout from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DiscoverPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.from("users").select("*").limit(20);
        if (data) {
          setUsers(data as User[]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        // Fallback to demo data if there's an error
        setUsers([
          {
            id: "f1",
            name: "Alex Morgan",
            username: "@alexmorgan",
            avatar: "https://i.pravatar.cc/150?img=1",
            bio: "Sports enthusiast | Content creator | Living my best life",
            followers: "2.5M",
            following: "450",
            likes: "12.8M",
            location: "New York, NY"
          },
          {
            id: "f2",
            name: "Jamie Chen",
            username: "@jamiechen",
            avatar: "https://i.pravatar.cc/150?img=2",
            bio: "Tech reviewer | Gaming content | Web developer",
            followers: "1.8M",
            following: "320",
            likes: "9.3M",
            location: "San Francisco, CA"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const viewProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Discover Users</h1>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-card rounded-lg p-4 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-secondary rounded-full"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-secondary rounded w-3/4"></div>
                    <div className="h-3 bg-secondary rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
              <div key={user.id} className="bg-card rounded-lg p-4 hover:bg-card/80 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4" onClick={() => viewProfile(user.id)} style={{ cursor: 'pointer' }}>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.username}</p>
                    </div>
                  </div>
                  <Button onClick={() => viewProfile(user.id)} size="sm" variant="outline">View</Button>
                </div>
                {user.bio && <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{user.bio}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DiscoverPage;
