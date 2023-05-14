import { ThemeProvider } from "@emotion/react";
import { ThemeProvider as ThemeProviderOld } from "emotion-theming";
import React, { FunctionComponent } from "react";
import { Global } from "./utils";
import global from "ui/styles/global";
import defaultTheme from "ui/styles/theme";

const UIProvider: FunctionComponent = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    <ThemeProviderOld theme={defaultTheme}>
      <Global styles={global} />
      {children}
    </ThemeProviderOld>
  </ThemeProvider>
);

export default UIProvider;
