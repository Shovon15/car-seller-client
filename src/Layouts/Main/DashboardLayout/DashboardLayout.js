import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile ">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side ">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-slate-200 dark:bg-slate-700 text-base-content dark:text-white font-bold text-lg">
                        <li>
                            <Link to="/dashboard">Buyer Accounts</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/sellerAccount">Seller Accounts</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
