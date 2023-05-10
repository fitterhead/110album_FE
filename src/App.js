import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import ThemeProvider from "./theme";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeColorProvider } from "./contexts/ThemeContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CLIENT_ID } from "./app/config";
import { CartProvider } from "./contexts/CartContext";
import { AlertProvider } from "./contexts/AlertContext";
function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AbrMcVfvpeWKrYvV7d85gx_kCTim-mGa6GNJX48YiZCvvH4kDXyYhIOmnsRT8yYZhxX9ld4g7tTIKsxQ",
        // "client-id": CLIENT_ID,
      }}
    >
      <AlertProvider>
        <AuthProvider>
          <BrowserRouter>
            <CartProvider>
              <ThemeColorProvider>
                <ThemeProvider>
                  <Router />
                </ThemeProvider>
              </ThemeColorProvider>
            </CartProvider>
          </BrowserRouter>
        </AuthProvider>
      </AlertProvider>
    </PayPalScriptProvider>
  );
}

export default App;
