
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser, User } from "@/contexts/UserContext";
import MainLayout from "@/components/layout/MainLayout";
import OtherUserProfile from "@/components/profile/OtherUserProfile";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { isAuthenticated } = useUser();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Demo users for local testing
  const demoUsers = [
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
    },
    {
      id: "f3",
      name: "Taylor Swift",
      username: "@taylorswift",
      avatar: "https://i.pravatar.cc/150?img=3",
      bio: "Music lover | Sharing moments | Creating memories",
      followers: "5.2M",
      following: "215",
      likes: "22.7M",
      location: "Nashville, TN"
    },
    {
      id: "f4",
      name: "Chris Evans",
      username: "@chrisevans",
      avatar: "https://i.pravatar.cc/150?img=4",
      bio: "Actor | Director | Fitness enthusiast",
      followers: "3.7M",
      following: "185",
      likes: "15.1M",
      location: "Los Angeles, CA"
    },
    {
      id: "f5",
      name: "Zoe Smith",
      username: "@zoesmith",
      avatar: "https://i.pravatar.cc/150?img=5",
      bio: "Travel vlogger | Photographer | Adventure seeker",
      followers: "980K",
      following: "412",
      likes: "7.4M",
      location: "Sydney, Australia"
    },
    {
      id: "s1",
      name: "Emma Watson",
      username: "@emmawatson",
      avatar: "https://i.pravatar.cc/150?img=6",
      bio: "Actress | Activist | Book lover",
      followers: "4.3M",
      following: "125",
      likes: "18.9M",
      location: "London, UK"
    },
    {
      id: "s2",
      name: "David Beckham",
      username: "@davidbeckham",
      avatar: "https://i.pravatar.cc/150?img=7",
      bio: "Former athlete | Entrepreneur | Family man",
      followers: "6.8M",
      following: "150",
      likes: "25.2M",
      location: "London, UK"
    },
    {
      id: "s3",
      name: "Priyanka Chopra",
      username: "@priyankachopra",
      avatar: "https://i.pravatar.cc/150?img=8",
      bio: "Actress | Producer | Global citizen",
      followers: "3.9M",
      following: "275",
      likes: "17.3M",
      location: "Mumbai, India"
    },
    {
      id: "u1",
      name: "Jessica Williams",
      username: "@jessicawill",
      avatar: "https://i.pravatar.cc/300?img=25",
      bio: "Digital creator | Travel enthusiast | Making content that inspires",
      followers: "1.2M",
      following: "345",
      likes: "18.5M",
      location: "Los Angeles, CA"
    }
  ];

  useEffect(() => {
    if (!userId) return;
    
    const fetchUser = async () => {
      setLoading(true);
      
      try {
        // Try to fetch from Supabase
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();
          
        if (error || !user) {
          // Fall back to demo data
          const demoUser = demoUsers.find(u => u.id === userId);
          
          if (demoUser) {
            setUserProfile(demoUser);
          } else {
            toast.error("User not found");
            setUserProfile(null);
          }
        } else {
          setUserProfile(user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId]);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container py-6 flex justify-center">
          <div className="animate-pulse flex flex-col items-center w-full max-w-3xl">
            <div className="w-full h-48 bg-secondary rounded-md mb-16"></div>
            <div className="h-24 w-24 bg-secondary rounded-full -mt-28 mb-8"></div>
            <div className="h-6 w-40 bg-secondary rounded mb-2"></div>
            <div className="h-4 w-24 bg-secondary rounded mb-6"></div>
            <div className="h-4 w-64 bg-secondary rounded mb-8"></div>
            <div className="flex gap-8 mb-8">
              <div className="h-12 w-20 bg-secondary rounded"></div>
              <div className="h-12 w-20 bg-secondary rounded"></div>
              <div className="h-12 w-20 bg-secondary rounded"></div>
            </div>
            <div className="w-full h-64 bg-secondary rounded-md"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!userProfile) {
    return (
      <MainLayout>
        <div className="container py-6 text-center">
          <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
          <p className="text-muted-foreground">
            The user you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <OtherUserProfile user={userProfile} />
      </div>
    </MainLayout>
  );
};

export default UserProfilePage;
