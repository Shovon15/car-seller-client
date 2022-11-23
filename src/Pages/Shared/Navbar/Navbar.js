import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";
import { useEffect } from "react";
import toast from "react-hot-toast";

import logo from "../../../assets/images/logo.png";

const Navbar = () => {
    // const { user, logOut } = useContext(AuthContext);

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    // console.log(theme);
    const handleLogOut = () => {
        // logOut()
        //     .than(() => {
        //         toast.success("Logout");
        //     })
        //     .catch((err) => console.log(err));
    };

    const menuItems = (
        <>
            <Link to="/">
                <button className="btn btn-ghost w-full">Home</button>
            </Link>
            <Link to="/">
                <button className="btn btn-ghost w-full">Appointment</button>
            </Link>
            <Link to="/login">
                <button className="btn btn-ghost w-full">Login</button>
            </Link>
            <Link to="/signup">
                <button className="btn btn-ghost w-full">SignUp</button>
            </Link>
            {/* {user?.uid ? (
                <>
                    <Link to="/dashboard">
                        <button className="btn btn-ghost w-full">Dashboard</button>
                    </Link>

                    <button onClick={handleLogOut} className="btn btn-ghost">
                        SignOut
                    </button>
                </>
            ) : (
                <>
                    <Link to="/login">
                        <button className="btn btn-ghost w-full">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="btn btn-ghost w-full">SignUp</button>
                    </Link>
                </>
            )} */}
        </>
    );
    const userItem = (
        <>
            <button onClick={handleThemeSwitch} className="btn btn-ghost p-0 rounded-full bg-slate-400  mr-12">
                {theme === "dark" ? (
                    <span className=" dark:text-white">
                        <FaSun className="w-6 h-6 mx-3" />
                    </span>
                ) : (
                    <span className="">
                        <FaMoon className="w-6 h-6 mx-3" />
                    </span>
                )}
            </button>
            {/* {user?.uid ? (
                <div className="dropdown dropdown-end">
                    <label tabIndex={1} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {user?.photoURL ? <p>ase</p> : <FaUser className="w-8 h-8 m-auto" />}
                        </div>
                    </label>
                    <ul
                        tabIndex={1}
                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                    >
                        <li className="px-2">{user?.displayName}</li>

                        <li>
                            <Link to="/" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">Settings</Link>
                        </li>
                        <li>
                            <Link onClick={handleLogOut}>Logout</Link>
                        </li>
                    </ul>
                </div>
            ) : (
                <></>
            )} */}
        </>
    );

    return (
        <div className="navbar border-b ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-5 h-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    <img src={logo} alt="logo" className="rounded-md" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">{menuItems}</ul>
            </div>
            <div className="navbar-end">{userItem}</div>
            <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-5 h-5 stroke-current"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                </svg>
            </label>
        </div>
    );
};

export default Navbar;
