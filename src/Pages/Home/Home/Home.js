import React from "react";
import Categories from "../Categories/Categories";
import CarSlider from "./CarSlider";
import RecentProduct from "../RecentProduct/RecentProduct";

const Home = () => {
  return (
    <div>
      <CarSlider />
      <Categories />
      <RecentProduct />
    </div>
  );
};

export default Home;
