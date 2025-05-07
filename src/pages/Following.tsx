
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const followingUsers = [
  {
    id: "f1",
    name: "Alex Morgan",
    username: "@alexmorgan",
    avatar: "https://i.pravatar.cc/150?img=1",
    isLive: true
  },
  {
    id: "f2",
    name: "Jamie Chen",
    username: "@jamiechen",
    avatar: "https://i.pravatar.cc/150?img=2",
    isLive: false
  },
  {
    id: "f3",
    name: "Taylor Swift",
    username: "@taylorswift",
    avatar: "https://i.pravatar.cc/150?img=3",
    isLive: false
  },
  {
    id: "f4",
    name: "Chris Evans",
    username: "@chrisevans",
    avatar: "https://i.pravatar.cc/150?img=4",
    isLive: true
  },
  {
    id: "f5",
    name: "Zoe Smith",
    username: "@zoesmith",
    avatar: "https://i.pravatar.cc/150?img=5",
    isLive: false
  }
];

const suggestedUsers = [
  {
    id: "s1",
    name: "Emma Watson",
    username: "@emmawatson",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: "s2",
    name: "David Beckham",
    username: "@davidbeckham",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: "s3",
    name: "Priyanka Chopra",
    username: "@priyankachopra",
    avatar: "https://i.pravatar.cc/150?img=8",
  }
];

const Following = () => {
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Following</h1>
        
        {/* Live now section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Live Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {followingUsers
              .filter(user => user.isLive)
              .map(user => (
                <div key={user.id} className="bg-secondary/50 rounded-lg p-4 flex items-center">
                  <div className="relative">
                    <Avatar className="h-14 w-14 mr-4">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-pulse-light absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.username}</p>
                  </div>
                  <Button size="sm">Watch</Button>
                </div>
              ))}
          </div>
        </section>
        
        {/* Following accounts */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Following</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {followingUsers.map(user => (
              <div key={user.id} className="border border-border/50 rounded-lg p-4 flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.username}</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            ))}
          </div>
        </section>
        
        {/* Suggested accounts */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Suggested for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedUsers.map(user => (
              <div key={user.id} className="border border-border/50 rounded-lg p-4 flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.username}</p>
                </div>
                <Button size="sm">Follow</Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Following;
