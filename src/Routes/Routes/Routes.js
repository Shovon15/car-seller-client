import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layouts/Main/DashboardLayout/DashboardLayout";
import Main from "../../Layouts/Main/Main";
import About from "../../Pages/About/About";
import AddItems from "../../Pages/AddItems/AddItems";
import Blogs from "../../Pages/Blogs/Blogs";
import BookingOrders from "../../Pages/BookingOrders/BookingOrders";
import BookingsItem from "../../Pages/BookingsItem/BookingsItem";
import BuyerAccount from "../../Pages/Dashboard/BuyerAccount/BuyerAccount";
import SellerAccount from "../../Pages/Dashboard/SellerAccount/SellerAccount";
import Home from "../../Pages/Home/Home/Home";
import ProductDetails from "../../Pages/Home/Products/ProductDetails";
import Products from "../../Pages/Home/Products/Products";
import Login from "../../Pages/Login/Login/Login";
import SignUp from "../../Pages/Login/SignUp/SignUp";
import PostItems from "../../Pages/PostItems/PostItems";
import NotFound from "../../Pages/Shared/NotFound/NotFound";
// import Profile from "../../Pages/UserProfile/Profile/Profile";
import AdminRoute from "../AdminRoutes/AdminRoutes";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import UserProfile from "../../Pages/Dashboard/UserProfile/UserProfile";
import Faq from "../../Pages/FAQ/Faq";
import ProductsFilterPage from "../../Pages/ProductPage/ProductsFilterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/blog",
        element: <Blogs />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/product",
        element: <ProductsFilterPage />,
        // loader: () => fetch("http://localhost:5000/products"),
      },
      // {
      //   path: "/profile",
      //   element: (
      //     <PrivateRoutes>
      //       <Profile />
      //     </PrivateRoutes>
      //   ),
      // },

      {
        path: "/products/:categoryName",
        element: (
          <PrivateRoutes>
            <Products />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.categoryName}`),
      },
      {
        path: "/products/:categoryName/:_id",
        element: (
          <PrivateRoutes>
            <ProductDetails />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/products/${params.categoryName}/${params._id}`
          ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/dashboard/",
        element: <UserProfile />,
      },
      {
        path: "/dashboard/bookingItems",
        element: <BookingsItem />,
      },
      {
        path: "/dashboard/bookingOrders",
        element: <BookingOrders />,
      },
      {
        path: "/dashboard/addItems",
        element: <AddItems />,
      },
      {
        path: "/dashboard/managePost",
        element: <PostItems />,
      },
      {
        path: "/dashboard/buyerAccount",
        element: (
          <AdminRoute>
            <BuyerAccount />
          </AdminRoute>
        ),
      },
      // {
      //   path: "/dashboard/sellerAccount",
      //   element: (
      //     <AdminRoute>
      //       <SellerAccount />
      //     </AdminRoute>
      //   ),
      // },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
