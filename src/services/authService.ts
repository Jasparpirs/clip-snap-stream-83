
import { supabase } from "@/integrations/supabase/client";

export interface User {
  id: string;
  email: string;
  name: string;
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("User not found");
    }

    return {
      id: data.user.id,
      email: data.user.email || "",
      name: data.user.user_metadata?.name || email.split("@")[0],
    };
  },

  async register(name: string, email: string, password: string): Promise<User> {
    // Set emailRedirectTo to the current window location to handle redirects properly
    const redirectUrl = `${window.location.origin}/auth`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("Failed to create account");
    }

    // After registration, check if a profile exists for this user and create one if not
    await this.createProfileIfNotExists(data.user.id, name, email);

    // Log the user in immediately even if email is not verified
    return {
      id: data.user.id,
      email: data.user.email || "",
      name: name || email.split("@")[0],
    };
  },

  logout(): void {
    supabase.auth.signOut();
  },

  async getCurrentUser(): Promise<User | null> {
    const { data, error } = await supabase.auth.getSession();
    
    if (error || !data.session?.user) {
      return null;
    }
    
    const user = data.session.user;
    
    return {
      id: user.id,
      email: user.email || "",
      name: user.user_metadata?.name || user.email?.split("@")[0] || "",
    };
  },

  // Helper method to create a profile for a user if it doesn't exist
  async createProfileIfNotExists(userId: string, name: string, email: string): Promise<void> {
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select()
      .eq('id', userId)
      .single();

    if (!existingProfile) {
      const { error } = await supabase
        .from('profiles')
        .insert([
          { 
            id: userId, 
            username: name || email.split("@")[0],
            bio: "Hello, I'm new here!",
            avatar_url: `https://i.pravatar.cc/300?u=${userId}`
          }
        ]);

      if (error) {
        console.error("Error creating profile:", error);
      }
    }
  }
};
