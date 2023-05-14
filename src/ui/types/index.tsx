import { colors } from "ui/styles";

export type ThemeScale =
  | "small"
  | "normal"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";

export type BackgroundType = keyof typeof colors.backgrounds;
