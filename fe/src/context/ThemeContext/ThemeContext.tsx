import React, { createContext, useState, ReactNode } from "react";

interface ThemeContextProps {
  toggle: () => void;
  mode: "light" | "dark";
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: ThemeProviderProps) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const themeStyles =
    mode === "dark" ? "bg-background-bgDark300" : "bg-background-bgLight300";

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme min-h-[100vh] ${themeStyles}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
