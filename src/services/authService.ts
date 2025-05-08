
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface StoredUser extends User {
  password: string;
}

// In a real app, this would be stored in a database
const USERS_STORAGE_KEY = 'snipster-users';

export const authService = {
  // Register a new user
  register: async (name: string, email: string, password: string): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get existing users
    const existingUsersJSON = localStorage.getItem(USERS_STORAGE_KEY);
    const existingUsers: StoredUser[] = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

    // Check if email already exists
    if (existingUsers.some(user => user.email === email)) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: StoredUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password, // In a real app, we would hash this password
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
    };

    // Add to "database"
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

    // Return user (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  // Login a user
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get existing users
    const existingUsersJSON = localStorage.getItem(USERS_STORAGE_KEY);
    const existingUsers: StoredUser[] = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

    // Find user by email
    const user = existingUsers.find(u => u.email === email);

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }

    // Store current user in session
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('snipster-current-user', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  },

  // Check if user is logged in
  getCurrentUser: (): User | null => {
    const userJSON = localStorage.getItem('snipster-current-user');
    return userJSON ? JSON.parse(userJSON) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('snipster-current-user');
  }
};
