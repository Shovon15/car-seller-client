import "react-photo-view/dist/react-photo-view.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import ScrollButton from "./Component/Button/ScrollButton";

function App() {
  return (
    <div className="bg-gray-200 dark:bg-slate-700 dark:text-white ">
      <div className="max-w-[1440px] mx-auto ">
        <RouterProvider router={router}/>
        <ToastContainer />
        <ScrollButton/>
      </div>
    </div>
  );
}

export default App;
