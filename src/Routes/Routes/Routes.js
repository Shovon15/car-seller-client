import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main/Main";
import Home from "../../Pages/Home/Home/Home";
import ProductDetails from "../../Pages/Home/Products/ProductDetails";
import Products from "../../Pages/Home/Products/Products";
import Login from "../../Pages/Login/Login/Login";
import SignUp from "../../Pages/Login/SignUp/SignUp";
import NotFound from "../../Pages/Shared/NotFound/NotFound";
import Profile from "../../Pages/UserProfile/Profile/Profile";

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
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/products/:categoryName",
                element: <Products />,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.categoryName}`),
            },
            {
                path: "/products/:categoryName/:_id",
                element: <ProductDetails />,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.categoryName}/${params._id}`),
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
