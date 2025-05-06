
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const UserProfilePage = ({ userId }: { userId: string }) => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await supabase.from("users").select("*").eq("id", userId).single();
      if (user) setUserProfile(user);

      const { count: followersCount } = await supabase
        .from("followers")
        .select("*", { count: "exact", head: true })
        .eq("followed_id", userId);

      const { count: followingCount } = await supabase
        .from("followers")
        .select("*", { count: "exact", head: true })
        .eq("follower_id", userId);

      setFollowers(followersCount || 0);
      setFollowing(followingCount || 0);
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const subscription = supabase
      .from(`followers:followed_id=eq.${userId}`)
      .on("*", payload => {
        if (payload.eventType === "INSERT") {
          setFollowers(prev => prev + 1);
        } else if (payload.eventType === "DELETE") {
          setFollowers(prev => prev - 1);
        }
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [userId]);

  const handleFollow = async () => {
    await supabase.from("followers").insert({
      follower_id: "CURRENT_USER_ID",
      followed_id: userId,
    });
  };

  if (!userProfile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{userProfile.username}</h1>
      <p>{followers} Followers</p>
      <p>{following} Following</p>
      <button onClick={handleFollow}>Follow</button>
    </div>
  );
};

export default UserProfilePage;
