
export type Theme = {
  name: string;
  label: string;
  colors: {
    primary: string;
    accent: string;
    background?: string;
    foreground?: string;
  };
}

export const themes: Record<string, Theme> = {
  purple: {
    name: "purple",
    label: "Purple",
    colors: {
      primary: "263 75% 63%",
      accent: "264 42% 45%",
    }
  },
  blue: {
    name: "blue",
    label: "Blue",
    colors: {
      primary: "215 90% 57%",
      accent: "215 70% 40%"
    }
  },
  green: {
    name: "green",
    label: "Green",
    colors: {
      primary: "142 71% 45%",
      accent: "142 51% 38%"
    }
  },
  red: {
    name: "red",
    label: "Red",
    colors: {
      primary: "0 84% 60%",
      accent: "0 72% 51%"
    }
  },
  orange: {
    name: "orange",
    label: "Orange",
    colors: {
      primary: "25 95% 53%",
      accent: "25 80% 45%"
    }
  },
  pink: {
    name: "pink",
    label: "Pink",
    colors: {
      primary: "330 90% 65%",
      accent: "330 70% 50%"
    }
  },
  teal: {
    name: "teal",
    label: "Teal",
    colors: {
      primary: "180 70% 45%",
      accent: "180 80% 30%"
    }
  },
  dark: {
    name: "dark",
    label: "Dark Mode",
    colors: {
      primary: "263 75% 63%",
      accent: "264 42% 45%",
      background: "240 10% 3.9%",
      foreground: "0 0% 98%"
    }
  },
  light: {
    name: "light",
    label: "Light Mode",
    colors: {
      primary: "263 75% 63%",
      accent: "264 42% 45%",
      background: "0 0% 100%",
      foreground: "240 10% 3.9%"
    }
  }
};

// Platform-specific colors for future integrations
export const platformColors = {
  twitch: "purple",
  youtube: "red",
  tiktok: "dark",
  snapchat: "yellow",
};
