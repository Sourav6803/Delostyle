
import './App.css';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import MainLayout from './Components/MainLayout';
import Dashboard from './Pages/Dashboard';
import Resetpassword from './Pages/Resetpassword';
import Enquaries from './Pages/Enquiries';
import Bloglist from './Pages/Bloglist';
import Blogcatlist from './Pages/Blogcatlist';
import Orders from './Pages/Orders';
import Customer from './Pages/Customer';
import Colorlist from './Pages/Colorlist';
import Categorylist from './Pages/Cataegorylist';
import Brandlist from './Pages/Brandlist';
import Productlist from './Pages/Productlist';
import Addblog from './Pages/Addblog';
import Addblogcat from './Pages/Addblogcat';
import Addcolor from './Pages/Addcolor';
import Addcat from './Pages/Addcat';
import Addbrand from './Pages/Addbrand';
import Addproduct from './Pages/Addproduct';
import Couponlist from './Pages/Couponlist';
import AddCoupon from './Pages/AddCoupon';


function App() {
  return <Router>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/reset-password' element={<Resetpassword />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/admin' element={<MainLayout />} >
        <Route index element={<Dashboard />} />
        <Route path='enquaries' element={<Enquaries />}/>
        <Route path='blog-list' element={<Bloglist />}/>
        <Route path='coupon-list' element={<Couponlist />}/>
        <Route path='coupon' element={<AddCoupon />}/>
        <Route path='coupon/:id' element={<AddCoupon />}/>
        <Route path='blog' element={<Addblog />}/>
        <Route path='blog-category-list' element={<Blogcatlist/>}/>
        <Route path='blog-category' element={<Addblogcat/>}/>
        <Route path='orders' element={<Orders/>}/>
        <Route path='customers' element={<Customer/>}/>
        <Route path='color-list' element={<Colorlist/>}/>
        <Route path='color' element={<Addcolor/>}/>
        <Route path='list-category' element={<Categorylist/>}/>
        <Route path='category' element={<Addcat/>}/>
        <Route path='category/:id' element={<Addcat/>}/>
        <Route path='brand-list' element={<Brandlist/>}/>
        <Route path='brand' element={<Addbrand/>}/>
        <Route path="brand/:id" element={<Addbrand/>}/>
        <Route path='product-list' element={<Productlist/>}/>
        <Route path='product' element={<Addproduct/>}/>
      </Route>
      

    </Routes>
  </Router>
}

export default App;
