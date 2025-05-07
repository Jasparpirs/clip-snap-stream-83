
export type Theme = {
  name: string;
  label: string;
  colors: {
    primary: string;
    accent: string;
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
  }
};
