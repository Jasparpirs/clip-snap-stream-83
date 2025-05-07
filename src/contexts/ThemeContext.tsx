
import React, { createContext, useContext, useState, useEffect } from "react";
import { themes, Theme } from "@/lib/themes";

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("purple");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Apply theme colors to CSS variables
    const selectedTheme = themes[theme];
    if (selectedTheme) {
      document.documentElement.style.setProperty("--primary", selectedTheme.colors.primary);
      document.documentElement.style.setProperty("--accent", selectedTheme.colors.accent);
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
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, toggleDarkMode }}>
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
