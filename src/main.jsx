import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext.jsx"
import { ProductProvider } from "./context/ProductContext.jsx"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)

