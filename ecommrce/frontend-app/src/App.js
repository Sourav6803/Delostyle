import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout";
import About from "./pages/About";
import Home from "./pages/Home";



import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Singnup from "./pages/Singnup";
import ResetPassword from "./pages/ResetPassword";
import { PrivateRoutes } from "./routing/PrivateRoute";
import { OpenRoutes } from "./routing/OpenRoutes";
import Profile from "./pages/Profile";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<Home />} /> */}
            <Route index element={<Login />} />
            <Route path="about" element={<About />} />
            <Route path="my-profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
            <Route path="Login" element={<OpenRoutes><Login /></OpenRoutes>} />
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="signup" element={<OpenRoutes><Singnup /></OpenRoutes>} />
            <Route path="reset-password/:token" element={<ResetPassword />} />



          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
