import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { DashboardContext } from "../../../context/DashboardContext";
import Sidebar from "../../../Pages/Dashboard/Sidebar";
import Footer from "../../../Pages/Shared/Footer/Footer";
import Nav from "../../../Pages/Shared/Navbar/Nav";

const DashboardLayout = () => {
  const { openSidebar } = useContext(DashboardContext);
  return (
    <>
      {/* <Navbar /> */}
      <Nav />
      <div className="flex">
        <div
          className={`${
            openSidebar ? "w-[100px] md:w-[365px]" : "w-[100px] md:w-[85px]"
          } duration-500`}
        >
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="min-h-max pl-2 md:pl-5">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </>
    // <div>
    //   <Navbar></Navbar>
    //   <div className="drawer drawer-mobile ">
    //     <input
    //       id="dashboard-drawer"
    //       type="checkbox"
    //       className="drawer-toggle"
    //     />
    //     <div className="drawer-content ">
    //       <Outlet></Outlet>
    //     </div>
    //     <div className="drawer-side ">
    //       <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
    //       <ul className="menu p-4 w-80 bg-slate-200 dark:bg-slate-700 text-base-content dark:text-white font-bold text-lg">
    //         <li>
    //           <Link to="/dashboard/">user Accounts</Link>
    //         </li>
    //         <li>
    //           <Link to="/dashboard/sellerAccount">Seller Accounts</Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
};

export default DashboardLayout;
