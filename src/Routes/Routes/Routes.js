import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layouts/Main/DashboardLayout/DashboardLayout";
import Main from "../../Layouts/Main/Main";
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
import NotFound from "../../Pages/Shared/NotFound/NotFound";
import Profile from "../../Pages/UserProfile/Profile/Profile";
import AdminRoute from "../AdminRoutes/AdminRoutes";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

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
                path: "/blogs",
                element: <Blogs />,
            },
            {
                path: "/profile",
                element: (
                    <PrivateRoutes>
                        <Profile />
                    </PrivateRoutes>
                ),
            },
            {
                path: "/bookingItems",
                element: (
                    <PrivateRoutes>
                        <BookingsItem />
                    </PrivateRoutes>
                ),
            },
            {
                path: "/bookingOrders",
                element: (
                    <PrivateRoutes>
                        <BookingOrders />
                    </PrivateRoutes>
                ),
            },
            {
                path: "/addItems",
                element: (
                    <PrivateRoutes>
                        <AddItems />
                    </PrivateRoutes>
                ),
            },
            {
                path: "/products/:categoryName",
                element: <Products />,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.categoryName}`),
            },
            {
                path: "/products/:categoryName/:_id",
                element: (
                    <PrivateRoutes>
                        <ProductDetails />
                    </PrivateRoutes>
                ),
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.categoryName}/${params._id}`),
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
                path: "/dashboard",
                element: (
                    <AdminRoute>
                        <BuyerAccount />
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/sellerAccount",
                element: (
                    <AdminRoute>
                        <SellerAccount />
                    </AdminRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
