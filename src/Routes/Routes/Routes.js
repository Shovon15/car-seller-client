import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main/Main";
import Home from "../../Pages/Home/Home/Home";
import Products from "../../Pages/Home/Products/Products";
import Sedan from "../../Pages/Home/Products/Sedan";
import Login from "../../Pages/Login/Login/Login";
import SignUp from "../../Pages/Login/SignUp/SignUp";
import NotFound from "../../Pages/Shared/NotFound/NotFound";

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
                path: "/sedan",
                element: <Sedan />,
            },
            {
                path: "/products/:categoryName",
                element: <Products />,
                // loader: ({ params }) => fetch(`http://localhost:5000/products/${params.categoryName}`),
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.categoryName}`),
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
