import React from "react";
import { BrowserRouter , Routes , Route} from "react-router-dom"
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home";
import Ourstore from "./pages/Ourstore";

import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Singnup from "./pages/Singnup";
import ResetPassword from "./pages/ResetPassword";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndCondition from "./pages/TermAndCondition";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { PrivateRoutes } from "./routing/PrivateRoute";
import { OpenRoutes } from "./routing/OpenRoutes";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="product" element={<Ourstore />} />
          <Route path="product/:id" element={<SingleProduct />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog/:id" element={<SingleBlog />} />
          <Route path="cart" element={<PrivateRoutes><Cart /></PrivateRoutes>} />
          <Route path="my-profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
          <Route path="my-orders" element={<PrivateRoutes><Orders /></PrivateRoutes>} />
          <Route path="checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>} />
          <Route path="Wishlist" element={<PrivateRoutes><Wishlist /></PrivateRoutes>} />
          <Route path="Login" element={<OpenRoutes><Login /></OpenRoutes>} />
          <Route path="forgot-password" element={<Forgotpassword />} />
          <Route path="signup" element={<OpenRoutes><Singnup /></OpenRoutes>} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
          <Route path="shipping-policy" element={<ShippingPolicy />} />
          <Route path="term-conditions" element={<TermAndCondition />} />


          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
