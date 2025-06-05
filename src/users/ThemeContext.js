
import React, { createContext, useContext, useState } from "react";
import { themes } from "./themes";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState("light");
  const theme = themes[themeName];

  const setTheme = (name) => {
    setThemeName(name);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
