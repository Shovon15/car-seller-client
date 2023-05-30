import React from "react";
import { Link } from "react-router-dom";
import SearchPage from "./SearchPage";
import Ex from "./Ex";
import Search from "./Search";

const About = () => {
  return (
    <div className="min-h-screen">
      <h1>About</h1>
      {/* <Search /> */}
      <SearchPage />
      {/* <Ex /> */}
    </div>
  );
};

export default About;
