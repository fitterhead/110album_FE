import React from "react";
import {
  alpha,
  createTheme,
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material";

// import customizeComponents from "./customizations";

const PRIMARY = {
  main: "#5DDF2A",
  dark: "#93EA71",
  light: "#C9F4B8",
};
const SECONDARY = {
  main: "#ED315D",
  dark: "#F58EA6",
  light: "#FAC7D3",
};

const TYPOGRAPHY = {
  body1: {
    fontFamily: "EB Garamond",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "8px",
    lineHeight: "120%",
    // letterSpacing:
  },
  body2: {
    fontFamily: "EB Garamond",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "11px",
    lineHeight: "120%",
    // letterSpacing:
  },
  body3: {
    fontFamily: "EB Garamond",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "120%",
    // letterSpacing:
  },
  body4: {
    fontFamily: "EB Garamond",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "32px",
    lineHeight: "120%",
    // letterSpacing:
  },
  button: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "11px",
    lineHeight: "120%",
    // letterSpacing:
  },
  h1: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "23px",
    lineHeight: "120%",
    // letterSpacing:
  },
  h2: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "32px",
    lineHeight: "120%",
    // letterSpacing:
  },
  h3: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "45px",
    lineHeight: "120%",
    // letterSpacing:
  },
  h4: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "64px",
    lineHeight: "120%",
    // letterSpacing:
  },
  h6: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "90px",
    lineHeight: "120%",
    // letterSpacing:
  },

  h7: {
    fontFamily: "EB Garamond",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "32px",
    lineHeight: "120%",
    // letterSpacing:
  },
};

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
    },
    typography: TYPOGRAPHY,
  };
  const theme = createTheme(themeOptions);

  //   theme.palette = customizeComponents(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
