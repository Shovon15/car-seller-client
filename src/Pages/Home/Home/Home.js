import React from "react";
import Gadgets from "../../Gadgets/Gadgets";
import Categories from "../Categories/Categories";
import Banner from "./Banner";

const Home = () => {
    return (
        <div>
            <Banner />
            <Categories />
            <Gadgets />
        </div>
    );
};

export default Home;
