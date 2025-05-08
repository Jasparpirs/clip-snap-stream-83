
import React, { createContext, useContext, useState, useEffect } from "react";
import { themes, Theme } from "@/lib/themes";

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  platformFilter: string | null;
  setPlatformFilter: (platform: string | null) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("purple");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [platformFilter, setPlatformFilter] = useState<string | null>(null);

  useEffect(() => {
    // Load theme preferences from localStorage if available
    const savedTheme = localStorage.getItem("preferred-theme");
    const savedDarkMode = localStorage.getItem("dark-mode");
    
    if (savedTheme) setTheme(savedTheme);
    if (savedDarkMode) setIsDarkMode(savedDarkMode === "true");
  }, []);

  useEffect(() => {
    // Apply theme colors to CSS variables
    const selectedTheme = themes[theme];
    if (selectedTheme) {
      document.documentElement.style.setProperty("--primary", selectedTheme.colors.primary);
      document.documentElement.style.setProperty("--accent", selectedTheme.colors.accent);
      
      // Save preferences to localStorage
      localStorage.setItem("preferred-theme", theme);
      localStorage.setItem("dark-mode", String(isDarkMode));
    }
    
    // Apply color scheme
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [theme, isDarkMode]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      isDarkMode, 
      toggleDarkMode, 
      platformFilter,
      setPlatformFilter 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
