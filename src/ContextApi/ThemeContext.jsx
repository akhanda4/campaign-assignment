import React, { useState } from "react";
import {
  themeQuartz,
  colorSchemeLightWarm,
  colorSchemeDarkBlue,
} from "ag-grid-community";

const ThemeContext = React.createContext();
const ThemeToggleContext = React.createContext();

export const useTheme = () => {
  return React.useContext(ThemeContext);
};
export const useThemeUpdate = () => {
  return React.useContext(ThemeToggleContext);
};

const themeLight = themeQuartz.withPart(colorSchemeLightWarm);
const themeDark = themeQuartz.withPart(colorSchemeDarkBlue);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeLight);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === themeLight ? themeDark : themeLight
    );
  };

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeToggleContext.Provider value={toggleTheme}>
        {children}
      </ThemeToggleContext.Provider>
    </ThemeContext.Provider>
  );
};
