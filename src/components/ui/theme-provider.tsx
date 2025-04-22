import * as React from "react";
import { themes, type Theme } from "@/lib/themes";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme["class"];
};

type ThemeProviderState = {
  theme: Theme["class"];
  setTheme: (theme: Theme["class"]) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

export const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme["class"]>(defaultTheme);

  React.useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme class
    themes.forEach((t) => {
      root.classList.remove(t.class);
    });
    
    // Add current theme class
    root.classList.add(theme);
  }, [theme]);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);
  
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  
  return context;
};
