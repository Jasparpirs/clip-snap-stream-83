
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("Failed to create account");
    }

    return {
      id: data.user.id,
      email: data.user.email || "",
      name: name || email.split("@")[0],
    };
  },

  logout(): void {
    supabase.auth.signOut();
  },

  getCurrentUser(): User | null {
    const session = supabase.auth.getSession();
    const user = supabase.auth.getUser();

    // Return null if we don't have a user
    if (!user) {
      return null;
    }

    // This is a temporary approach since the actual user might be loaded asynchronously
    // We'll return a placeholder that will be updated when the real user is loaded in AuthContext
    return {
      id: "loading",
      email: "loading",
      name: "loading",
    };
  },
};
