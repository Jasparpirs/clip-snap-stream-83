
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchResult, searchContent } from "../services/searchService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Play, Tv } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await searchContent(query);
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [query]);
  
  const videos = results.filter(item => item.type === 'video');
  const channels = results.filter(item => item.type === 'channel');
  const users = results.filter(item => item.type === 'user');
  
  return (
    <MainLayout>
      <div className="content-container py-6 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Search results for "{query}"</h1>
          <p className="text-muted-foreground">Found {results.length} results across platforms</p>
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Results ({results.length})</TabsTrigger>
            <TabsTrigger value="videos">Videos ({videos.length})</TabsTrigger>
            <TabsTrigger value="channels">Channels ({channels.length})</TabsTrigger>
            <TabsTrigger value="people">People ({users.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {loading ? (
              <SearchResultsLoading />
            ) : results.length > 0 ? (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {results.map((result, index) => (
                  <motion.div 
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ResultCard result={result} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground">Try different search terms or filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="videos" className="mt-6">
            {loading ? (
              <SearchResultsLoading />
            ) : videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map(video => (
                  <ResultCard key={video.id} result={video} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No videos found</h3>
                <p className="text-muted-foreground">Try different search terms or filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="channels" className="mt-6">
            {loading ? (
              <SearchResultsLoading />
            ) : channels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {channels.map(channel => (
                  <ResultCard key={channel.id} result={channel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No channels found</h3>
                <p className="text-muted-foreground">Try different search terms or filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="people" className="mt-6">
            {loading ? (
              <SearchResultsLoading />
            ) : users.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                  <ResultCard key={user.id} result={user} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No people found</h3>
                <p className="text-muted-foreground">Try different search terms or filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

const ResultCard = ({ result }: { result: SearchResult }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (result.type === 'user') {
      navigate('/profile');
    } else if (result.type === 'video') {
      // In a real app, you would navigate to the video page
      console.log('Navigating to video:', result.id);
    } else if (result.type === 'channel') {
      // In a real app, you would navigate to the channel page
      console.log('Navigating to channel:', result.id);
    }
  };
  
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors cursor-pointer hover-scale" onClick={handleClick}>
      <CardContent className="p-0">
        {result.type === 'video' && (
          <>
            <div className="relative aspect-video">
              <img src={result.thumbnail} alt={result.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 right-2">
                <Badge variant="secondary" className="opacity-90">
                  {result.platform}
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={result.user?.avatar} alt={result.user?.name} />
                  <AvatarFallback>{result.user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium line-clamp-2">{result.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <span>{result.user?.name}</span>
                    <span className="mx-1">•</span>
                    <span>{result.views}</span>
                    <span className="mx-1">•</span>
                    <span>{result.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {result.type === 'channel' && (
          <div className="p-4 flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Tv className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{result.title}</h3>
              <p className="text-sm text-muted-foreground">Channel • {result.platform}</p>
            </div>
          </div>
        )}
        
        {result.type === 'user' && (
          <div className="p-4 flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={result.user?.avatar} alt={result.user?.name} />
              <AvatarFallback>{result.user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{result.title}</h3>
              <p className="text-sm text-muted-foreground">User • {result.platform}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const SearchResultsLoading = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
