import { ThemeProvider } from "@mui/material";
import { createContext } from "react";
import { DarkSpacesTheme } from "./theme";
export const ThemeContext = createContext((_themeName) => {});

const ThemeProviderWrapper = (props) => {
  return (
    <ThemeContext.Provider value={DarkSpacesTheme}>
      <ThemeProvider theme={DarkSpacesTheme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
