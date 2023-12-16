import { DarkSpacesTheme } from "./theme";

const themeMap = {
    DarkSpacesTheme,
};

export function themeCreator(theme) {
  return themeMap[theme];
}
