import theme from "ui/styles/theme";
import { ThemeScale } from "ui/types";
import {
  TypographyProps as OldTypographyProps,
  SpaceProps as OldSpaceProps,
  ResponsiveValue,
} from "styled-system";

type IndexOrAlias = number | ThemeScale | "unset";

export interface TypographyProps extends OldTypographyProps {
  fontSize?: ResponsiveValue<IndexOrAlias>;
  fontWeight?: ResponsiveValue<keyof typeof theme.fontWeights>;
  fontFamily?: ResponsiveValue<keyof typeof theme.fonts>;
}

export interface SpaceProps extends OldSpaceProps {
  /** Margin on top, left, bottom and right */
  m?: ResponsiveValue<IndexOrAlias | "auto">;
  /** Margin on top, left, bottom and right */
  margin?: ResponsiveValue<IndexOrAlias | "auto">;
  /** Margin on top */
  mt?: ResponsiveValue<IndexOrAlias | "auto">;
  /** Margin on top */
  marginTop?: ResponsiveValue<IndexOrAlias | "auto">;
  /** Margin on right */
  mr?: ResponsiveValue<IndexOrAlias | "auto">;
  /** Margin on right */
  marginRight?: ResponsiveValue<IndexOrAlias | "auto">;
  /** Margin on bottom */
  mb?: ResponsiveValue<IndexOrAlias | "auto">;
  /** Margin on bottom */
  marginBottom?: ResponsiveValue<IndexOrAlias | "auto">;
  /** Margin on left */
  ml?: ResponsiveValue<IndexOrAlias | "auto">;
  /** Margin on left */
  marginLeft?: ResponsiveValue<IndexOrAlias | "auto">;
  /** Margin on left and right */
  mx?: ResponsiveValue<IndexOrAlias | "auto">;
  /** Margin on left and right */
  marginX?: ResponsiveValue<IndexOrAlias | "auto">;
  /** Margin on top and bottom */
  my?: ResponsiveValue<IndexOrAlias | "auto">;
  /** Margin on top and bottom */
  marginY?: ResponsiveValue<IndexOrAlias | "auto">;
  /** Padding on top, left, bottom and right */
  p?: ResponsiveValue<IndexOrAlias>;
  /** Padding on top, left, bottom and right */
  padding?: ResponsiveValue<IndexOrAlias>;
  /** Padding on top */
  pt?: ResponsiveValue<IndexOrAlias>;
  /** Padding on top */
  paddingTop?: ResponsiveValue<IndexOrAlias>;
  /** Padding on right */
  pr?: ResponsiveValue<IndexOrAlias>;
  /** Padding on right */
  paddingRight?: ResponsiveValue<IndexOrAlias>;
  /** Padding on bottom */
  pb?: ResponsiveValue<IndexOrAlias>;
  /** Padding on bottom */
  paddingBottom?: ResponsiveValue<IndexOrAlias>;
  /** Padding on left */
  pl?: ResponsiveValue<IndexOrAlias>;
  /** Padding on left */
  paddingLeft?: ResponsiveValue<IndexOrAlias>;
  /** Padding on left and right */
  px?: ResponsiveValue<IndexOrAlias>;
  /** Padding on left and right */
  paddingX?: ResponsiveValue<IndexOrAlias>;
  /** Padding on top and bottom */
  py?: ResponsiveValue<IndexOrAlias>;
  /** Padding on top and bottom */
  paddingY?: ResponsiveValue<IndexOrAlias>;
}
