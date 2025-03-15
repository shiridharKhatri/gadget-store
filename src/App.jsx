import "./styles/App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./routes/Home"
import Products from "./routes/Products"
import ProductDetails from "./routes/ProductDetails"
import About from "./routes/About"
import Contact from "./routes/Contact"
import Cart from "./routes/Cart"
import Login from "./routes/Login"
import Signup from "./routes/Signup"
import ForgotPassword from "./routes/ForgotPassword"
import Checkout from "./routes/Checkout"
import NotFound from "./routes/NotFound"
import UserProfile from "./routes/UserProfile"
import Wishlist from "./routes/Wishlist"
import SearchResults from "./routes/SearchResults"
import ResetPassword from "./routes/ResetPassword"
import Categories from "./routes/Categories"
import Deals from "./routes/Deals"
import Orders from "./routes/Orders"
import PrivacyPolicy from "./routes/PrivacyPolicy"
import TermsAndConditions from "./routes/TermsAndConditions"

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/categories",
      element: <Categories />,
    },
    {
      path: "/categories/:category",
      element: <Products />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/products/:id",
      element: <ProductDetails />,
    },
    {
      path: "/deals",
      element: <Deals />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/profile",
      element: <UserProfile />,
    },
    {
      path: "/orders",
      element: <Orders />,
    },
    {
      path: "/wishlist",
      element: <Wishlist />,
    },
    {
      path: "/search",
      element: <SearchResults />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/privacy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/terms",
      element: <TermsAndConditions />,
    },
  ])

  return <RouterProvider router={router} />
}

export default App

