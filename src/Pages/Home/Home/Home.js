import React from "react";
import Gadgets from "../../Gadgets/Gadgets";
import Categories from "../Categories/Categories";
import Banner from "./Banner";
import CarSlider from "./CarSlider";
import SearchSection from "../SearchSection/SearchSection";
import RecentProduct from "../RecentProduct/RecentProduct";

const Home = () => {
  return (
    <div>
      {/* <Banner /> */}
      <CarSlider />
      <Categories />
      {/* <SearchSection /> */}
      <RecentProduct />
    </div>
  );
};

export default Home;
