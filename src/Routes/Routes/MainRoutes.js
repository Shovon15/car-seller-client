import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../../hooks/ScrollToTop";
import Main from "../../Layouts/Main/Main";
import Home from "../../Pages/Home/Home/Home";
import ProductsFilterPage from "../../Pages/ProductPage/ProductsFilterPage";
import Blogs from "../../Pages/Blogs/Blogs";
import Faq from "../../Pages/FAQ/Faq";
import About from "../../Pages/About/About";
import Login from "../../Pages/Login/Login/Login";
import SignUp from "../../Pages/Login/SignUp/SignUp";
import Products from "../../Pages/Home/Products/Products";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import ProductDetails from "../../Pages/Home/Products/ProductDetails";
import DashboardLayout from "../../Layouts/Main/DashboardLayout/DashboardLayout";
import UserProfile from "../../Pages/Dashboard/UserProfile/UserProfile";
import BookingsItem from "../../Pages/BookingsItem/BookingsItem";
import BookingOrders from "../../Pages/BookingOrders/BookingOrders";
import AddItems from "../../Pages/AddItems/AddItems";
import PostItems from "../../Pages/PostItems/PostItems";
import AdminRoute from "../AdminRoutes/AdminRoutes";
import AddBlog from "../../Pages/Blogs/AddBlog";
import BuyerAccount from "../../Pages/Dashboard/BuyerAccount/BuyerAccount";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import NotFound from "../../Pages/Shared/NotFound/NotFound";

import React from "react";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* ---------------------------public route--------------------- */}
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductsFilterPage />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products/:category" element={<Products />} />
          <Route
            path="/products/:category/:id"
            element={
              // <PrivateRoutes>
              <ProductDetails />
              // </PrivateRoutes>
            }
          />
        </Route>
        {/* ----------------------------dashboard route---------------- */}
        <Route
          element={
            <PrivateRoutes>
              <DashboardLayout></DashboardLayout>
            </PrivateRoutes>
          }
        >
          <Route path="/dashboard" element={<UserProfile />} />
          <Route path="/dashboard/bookingItems" element={<BookingsItem />} />
          <Route path="/dashboard/bookingOrders" element={<BookingOrders />} />
          <Route path="/dashboard/addItems" element={<AddItems />} />
          <Route path="/dashboard/managePost" element={<PostItems />} />
          <Route
            path="/dashboard/manageBlog"
            element={
              <AdminRoute>
                <AddBlog />
              </AdminRoute>
            }
          />
          <Route
            path="/dashboard/buyerAccount"
            element={
              <AdminRoute>
                <BuyerAccount />
              </AdminRoute>
            }
          />
          <Route path="/dashboard/payment/:id" element={<Payment />} />
        </Route>
        {/* ------------------------- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
