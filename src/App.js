import "react-photo-view/dist/react-photo-view.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import ScrollButton from "./Component/Button/ScrollButton";
import ScrollToTop from "./hooks/ScrollToTop";
import Main from "./Layouts/Main/Main";
import Home from "./Pages/Home/Home/Home";
import DashboardLayout from "./Layouts/Main/DashboardLayout/DashboardLayout";
import PrivateRoutes from "./Routes/PrivateRoutes/PrivateRoutes";
import UserProfile from "./Pages/Dashboard/UserProfile/UserProfile";
import ProductsFilterPage from "./Pages/ProductPage/ProductsFilterPage";
import Blogs from "./Pages/Blogs/Blogs";
import Faq from "./Pages/FAQ/Faq";
import BookingsItem from "./Pages/BookingsItem/BookingsItem";
import BookingOrders from "./Pages/BookingOrders/BookingOrders";
import AddItems from "./Pages/AddItems/AddItems";
import PostItems from "./Pages/PostItems/PostItems";
import AddBlog from "./Pages/Blogs/AddBlog";
import NotFound from "./Pages/Shared/NotFound/NotFound";
import AdminRoute from "./Routes/AdminRoutes/AdminRoutes";
import BuyerAccount from "./Pages/Dashboard/BuyerAccount/BuyerAccount";
import Payment from "./Pages/Dashboard/Payment/Payment";
import Login from "./Pages/Login/Login/Login";
import SignUp from "./Pages/Login/SignUp/SignUp";
import ProductDetails from "./Pages/Home/Products/ProductDetails";
import Products from "./Pages/Home/Products/Products";
import About from "./Pages/About/About";

function App() {
  return (
    <div className="bg-gray-200 dark:bg-slate-700 dark:text-white ">
      <div className="max-w-[1440px] mx-auto ">
        {/* <RouterProvider router={router}>
          <ScrollToTop />
        </RouterProvider> */}
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
                  <PrivateRoutes>
                    <ProductDetails />
                  </PrivateRoutes>
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
              <Route
                path="/dashboard/bookingItems"
                element={<BookingsItem />}
              />
              <Route
                path="/dashboard/bookingOrders"
                element={<BookingOrders />}
              />
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
              <Route
                path="/dashboard/payment/:id"
                element={<Payment />}
                // loader={({ params }) =>
                //   fetch(`https://y-shovon15.vercel.app/booking/${params.id}`)
                // }
              />
            </Route>
            {/* ------------------------- */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        <ToastContainer />
        <ScrollButton />
      </div>
    </div>
  );
}

export default App;
