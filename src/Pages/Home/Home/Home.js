import React from "react";
import Gadgets from "../../Gadgets/Gadgets";
import Categories from "../Categories/Categories";
import Banner from "./Banner";
import CarSlider from "./CarSlider";

const Home = () => {
  return (
    <div>
      {/* <Banner /> */}
      <CarSlider />
      <Categories />
      {/* <Gadgets /> */}
    </div>
  );
};

export default Home;
