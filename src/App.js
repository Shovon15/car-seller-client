import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import "react-photo-view/dist/react-photo-view.css";

function App() {
    return (
        // <div className="max-w-screen-xl mx-auto bg-white dark:bg-slate-500 dark:text-white">
        //     <RouterProvider router={router}></RouterProvider>
        //     <Toaster />
        // </div>

        <div className="bg-slate-100 dark:bg-slate-700 dark:text-white ">
            <div className="max-w-[1440px] mx-auto ">
                <RouterProvider router={router}></RouterProvider>
                <Toaster />
            </div>
        </div>
    );
}

export default App;
