import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";
import { useEffect } from "react";
import toast from "react-hot-toast";

import logo from "../../../assets/images/logo.png";
import { AuthContext } from "../../../context/AuthProvider";
import useUser from "../../../hooks/useUser";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    // console.log(user?.photoURL, );
    const [isUser] = useUser(user?.email);
    // console.log(user, isUser);

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
        logOut()
            .then(() => {
                toast.success("    logout     ");
            })
            .catch((error) => console.error(error));
    };

    const menuItems = (
        <>
            <Link to="/">
                <button className="btn btn-ghost w-full">Home</button>
            </Link>
            {user?.uid ? (
                <>
                    <Link to="/addItems">
                        <button className="btn btn-ghost w-full">Add Items</button>
                    </Link>
                    <Link to="/dashboard">
                        <button className="btn btn-ghost w-full">Dashboard</button>
                    </Link>

                    <Link>
                        <button onClick={handleLogOut} className="btn btn-ghost w-full">
                            logOut
                        </button>
                    </Link>
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
            )}
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
            {user?.uid ? (
                <Link to="/profile" className="cursor-pointer">
                    <div className="tooltip tooltip-left" data-tip={isUser?.name}>
                        <img src={isUser?.image} alt="avatar" className="w-10 h-10 rounded-full mr-5" />
                    </div>
                </Link>
            ) : (
                // <div className="dropdown dropdown-end">
                //     <label tabIndex={1} className="btn btn-ghost btn-circle avatar">
                //         <div className="w-10 rounded-full">
                //             {user?.photoURL ? <p>avatar</p> : <FaUser className="w-8 h-8 m-auto" />}
                //         </div>
                //     </label>
                //     <ul
                //         tabIndex={1}
                //         className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                //     >
                //         <li className="px-2">{user?.displayName}</li>

                //         <li>
                //             <Link to="/profile" className="justify-between">
                //                 Profile
                //             </Link>
                //         </li>

                //         <li>
                //             <Link onClick={handleLogOut}>Logout</Link>
                //         </li>
                //     </ul>
                // </div>
                <></>
            )}
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
