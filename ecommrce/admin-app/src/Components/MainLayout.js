import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineUser, AiOutlineBgColors } from "react-icons/ai";
import { SiBrandfolder } from "react-icons/si"
import { BiCategoryAlt } from "react-icons/bi"
import { RiCouponLine } from "react-icons/ri"
import { IoIosNotifications } from "react-icons/io"
import { FaClipboardList, FaBloggerB } from "react-icons/fa"
import { ImBlog } from "react-icons/im"
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header, Sider, Content } = Layout;


const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <h2 className='text-white fs-5 text-center py-3 mb-0'>
            <span className='sm-logo'>DC</span>
            <span className='lg-logo '>Dev Corner</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === 'signout') {

            } else {
              navigate(key)
            }
          }}
          items={[
            {
              key: '1',
              icon: <AiOutlineDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className='fs-4' />,
              label: 'Customers',
            },
            {
              key: 'Catalog',
              icon: <AiOutlineShoppingCart className='fs-4' />,
              label: 'Catalog',
              children: [
                {
                  key: 'Product',
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Add Product',
                },
                {
                  key: 'Product-list',
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Brand',
                },
                {
                  key: 'brand-list',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <BiCategoryAlt className='fs-4' />,
                  label: 'Category',
                },
                {
                  key: 'list-category',
                  icon: <BiCategoryAlt className='fs-4' />,
                  label: 'Category List ',
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Color',
                },
                {
                  key: 'color-list',
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Color List ',
                }
              ]
            },
            {
              key: 'orders',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Orders',
            },

            {
              key: 'marketing',
              icon: <FaBloggerB className='fs-4' />,
              label: 'Marketing',
              children: [
                {
                  key: 'coupon',
                  icon: <RiCouponLine className='fs-4' />,
                  label: 'Add Coupon',
                },
                {
                  key: 'coupon-list',
                  icon: <RiCouponLine className='fs-4' />,
                  label: 'Coupon List',
                },
                
              ]
            },
            {
              key: 'blogs',
              icon: <FaBloggerB className='fs-4' />,
              label: 'Blogs',
              children: [
                {
                  key: 'blog',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaClipboardList className='fs-4' />,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <FaClipboardList className='fs-4' />,
                  label: 'Blog caregory List',
                },
              ]
            },
            {
              key: 'enquaries',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Enquaries',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className='d-flex justify-content-between ps-1 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div className=' d-flex gap-4 align-items-center'>
            <div className='position-relative'>
              <IoIosNotifications className='fs-5' />
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span>
            </div>
            <div className='d-flex gap-3 align-items-center dropdown'>
              <div>
                <img src='https://themeon.net/nifty/v3.0.1/assets/img/profile-photos/1.png' style={{ height: "32px", width: "32px" }} alt='' />
              </div>
              <div role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                <h5 className='mb-0'>Sourav Bhukta</h5>
                <p className='mb-0'>souravbhukta8@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><Link className="dropdown-item py-1 mb-1" style={{ height: "auto", lineHeight: "20px" }} to="/">View Profile</Link></li>
                <li><Link className="dropdown-item py-1 mb-1" style={{ height: "auto", lineHeight: "20px" }} to="/">SignOut</Link></li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;