import { useState, useEffect, useContext, useRef } from "react";
import "./nav.css";
import {
  Navbar,
  Button,
  IconButton,
  Tooltip,
  Avatar,
  Collapse,
} from "@material-tailwind/react";

import logo from "../../../assets/logo/logo_carXchange.png";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useUser from "../../../hooks/useUser";
import userPng from "../../../assets/sticker/user.png";
// import { useQuery } from "@tanstack/react-query";
import { FcSettings } from "react-icons/fc";

const Nav = () => {
  const [openNav, setOpenNav] = useState(false);
  const { user } = useContext(AuthContext);

  const [isUser] = useUser(user?.email);
  // const { data: users = [], refetch } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: async () => {
  //     const res = await fetch(`https://y-shovon15.vercel.app/users/${isUser?.email}`);
  //     const data = await res.json();
  //     return data;
  //   },
  // });
  // refetch();
  // console.log(user?.email);
  // console.log(isUser?.image);
  // console.log(users?.email);
  // console.log(users);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  // ---------for click outside nav close--------------------
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenNav(false);
        // console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const navList = (
    <ul className="mb-4 mt-4 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row items-start lg:items-center">
      <NavLink
        to="/"
        className="text-gray-800 font-bold duration-500 cursor-pointer p-1"
      >
        Home
      </NavLink>

      <NavLink
        to="/product"
        className="text-gray-800 font-bold  duration-500 cursor-pointer p-1"
      >
        Porducts
      </NavLink>
      <NavLink
        to="/blog"
        className="text-gray-800 font-bold  duration-500 cursor-pointer p-1"
      >
        Blog
      </NavLink>
      <NavLink
        to="/faq"
        className="text-gray-800 font-bold  duration-500 cursor-pointer p-1"
      >
        FAQ
      </NavLink>
    </ul>
  );

  return (
    <Navbar
      className="sticky inset-0 z-30 h-max max-w-full bg-gray-300 rounded-none shadow-none border-none px-4 py-2"
      ref={menuRef}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/" className="cursor-pointer px-2">
          <img className="w-36" src={logo} alt="..." />
        </Link>
        <div className="flex items-center gap-2">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <span>
            <ion-icon name="accessibility-outline" />
          </span>
          {user?.uid ? (
            <>
              {isUser?.image === undefined ? (
                <div className="flex gap-2 items-center">
                  <Tooltip content="user">
                    <Avatar src={userPng} alt="avatar" />
                  </Tooltip>
                  <Tooltip content="dashboard">
                    <Link to="/dashboard/">
                      <FcSettings className="w-8 h-8 transition  hover:rotate-45" />
                    </Link>
                  </Tooltip>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <Tooltip content={isUser?.name}>
                    <Avatar src={isUser?.image} alt="avatar" />
                  </Tooltip>
                  <Tooltip content="dashboard">
                    <Link to="/dashboard/">
                      <FcSettings className="w-8 h-8 transition  hover:rotate-45" />
                    </Link>
                  </Tooltip>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="bg-primary hidden lg:inline-block">
                  Login
                </Button>
              </Link>
            </>
          )}

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse className="flex flex-col text-black text-start" open={openNav}>
        {navList}
        {user?.uid ? (
          <></>
        ) : (
          <Link to="/login">
            <Button
              fullWidth
              className="rounded-md bg-primary text-sm  lg:inline-block"
            >
              Login
            </Button>
          </Link>
        )}
      </Collapse>
    </Navbar>
  );
};

export default Nav;
