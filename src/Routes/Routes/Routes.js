import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import SignUpBuyer from "../../Pages/Login/SignUpBuyer/SignUpBuyer";
import SignUpSeller from "../../Pages/Login/SignUpSeller/SignUpSeller";
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
                path: "/signupBuyer",
                element: <SignUpBuyer />,
            },
            {
                path: "/signupSeller",
                element: <SignUpSeller />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
