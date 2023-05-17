import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Pages/Shared/Footer/Footer";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import Nav from "../../Pages/Shared/Navbar/Nav";

const Main = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
