import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { HelmetProvider } from "react-helmet-async"
import { AuthProvider } from "./context/AuthContext.jsx"
import { CartProvider } from "./context/CartContext.jsx"
import { ProductProvider } from "./context/ProductContext.jsx"
import { WishlistProvider } from "./context/WishlistContext.jsx"
import "./styles/ThemeToggle.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
