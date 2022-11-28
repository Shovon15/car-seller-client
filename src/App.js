import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";

function App() {
    return (
        <div className="max-w-screen-xl mx-auto bg-white dark:bg-slate-500 dark:text-white">
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
        </div>
    );
}

export default App;
