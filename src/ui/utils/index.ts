import facepaint from "facepaint";
import { breakpoints } from "ui/styles/theme";

export { css, withTheme, keyframes, Global } from "@emotion/react";
export { default as styled } from "@emotion/styled";
export type { Theme } from "ui/styles/theme";

export const isUrlExternal = (url: string) => url[0] !== "/";

export const mq = facepaint(
  breakpoints.map((bp) => `@media (min-width: ${bp})`)
);

 export { default as api } from "./api";
 export { default as salary } from "./salary";
 export { default as getUser } from "./getUser";


