
import { createClient } from '@supabase/supabase-js';

// Use default values if environment variables are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'your-anon-key';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper functions for user management
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) return null;
  return data.session.user;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
};

export const searchUsers = async (searchTerm: string) => {
  if (!searchTerm || searchTerm.trim() === '') return [];
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .or(`username.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%`)
    .limit(20);
    
  if (error) {
    console.error('Error searching users:', error);
    return [];
  }
  
  return data || [];
};

export const followUser = async (followerId: string, followedId: string) => {
  const { data, error } = await supabase
    .from('followers')
    .insert([{ follower_id: followerId, followed_id: followedId }]);
    
  return { data, error };
};

export const unfollowUser = async (followerId: string, followedId: string) => {
  const { data, error } = await supabase
    .from('followers')
    .delete()
    .match({ follower_id: followerId, followed_id: followedId });
    
  return { data, error };
};

export const getFollowerCount = async (userId: string) => {
  const { count, error } = await supabase
    .from('followers')
    .select('*', { count: 'exact', head: true })
    .eq('followed_id', userId);
    
  if (error) {
    console.error('Error getting follower count:', error);
    return 0;
  }
  
  return count || 0;
};

export const getFollowingCount = async (userId: string) => {
  const { count, error } = await supabase
    .from('followers')
    .select('*', { count: 'exact', head: true })
    .eq('follower_id', userId);
    
  if (error) {
    console.error('Error getting following count:', error);
    return 0;
  }
  
  return count || 0;
};

export const isFollowing = async (followerId: string, followedId: string) => {
  const { data, error } = await supabase
    .from('followers')
    .select('*')
    .match({ follower_id: followerId, followed_id: followedId })
    .single();
    
  if (error) {
    return false;
  }
  
  return !!data;
};
