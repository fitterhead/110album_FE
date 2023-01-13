import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import ThemeProvider from "./theme";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeColorProvider } from "./contexts/ThemeContext";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeColorProvider>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </ThemeColorProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
