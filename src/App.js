import "react-photo-view/dist/react-photo-view.css";
import "react-toastify/dist/ReactToastify.css";
import ScrollButton from "./Component/Button/ScrollButton";
import { ToastContainer } from "react-toastify";
import MainRoutes from "./Routes/Routes/MainRoutes";

function App() {
  return (
    <div className="bg-gray-200 min-h-screen dark:bg-slate-700 dark:text-white ">
      <div className="max-w-[1490px] mx-auto ">
        <MainRoutes />
        <ToastContainer />
        <ScrollButton />
      </div>
    </div>
  );
}

export default App;
