
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
};
