import { colors, font, lineHeights } from "ui/styles";
import { ThemeScale } from "ui/types";
import components from "./components";

// export const breakpoints = ["576px", "992px", "1200px", "1300px"];
export const breakpoints = ["576px", "992px", "1200px", "1367px","1643px","1920px"];

const theme = {
  breakpoints,
  colors,
  fontSizes: [
    "0.75rem",
    "1rem",
    "1.125rem",
    "1.375rem",
    "1.813rem",
  ] as Array<string> & Record<ThemeScale, string>,
  space: [
    "0.5rem",
    "0.75rem",
    "1rem",
    "1.5rem",
    "1.75rem",
    "2rem",
    "2.5rem",
    "3rem",
    "3.5rem",
    "3.875rem",
    "4.375rem",
    "4.5rem",
    "5rem",
    "6rem",
    "12rem",
    "13rem",
  ] as Array<string> & Record<ThemeScale, string> & Record<"unset", string>,
  font,
  lineHeights,
  components,
  radii: [24, 25, 28, 33, 34, 38],
  fonts: {
    primary: font.family.miloOT,
    secondary: font.family.lovelace,
    tertiary: font.family.lovelaceText,
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
    extraBold: 800,
  },
};

//aliases
theme.fontSizes.small = theme.fontSizes[1];
theme.fontSizes.normal = theme.fontSizes[2];
theme.fontSizes.medium = theme.fontSizes[3];
theme.fontSizes.large = theme.fontSizes[4];

theme.space.small = theme.space[2];
theme.space.normal = theme.space[3];
theme.space.medium = theme.space[4];
theme.space.large = theme.space[5];
theme.space.xlarge = theme.space[7];
theme.space.xxlarge = theme.space[11];

type DefaultTheme = typeof theme;

export type Theme = DefaultTheme;

export default theme;

declare module "@emotion/react" {
  export interface Theme extends DefaultTheme {}
}
