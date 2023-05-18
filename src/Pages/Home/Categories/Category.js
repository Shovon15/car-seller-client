import { Typography } from "@material-tailwind/react";
import React from "react";
import Carousel from "react-elastic-carousel";

import { Link } from "react-router-dom";

const Category = ({ categories }) => {
  const carouselRef = React.createRef(null);
  let resetTimeout;

  return (
    <Carousel
      ref={carouselRef}
      enableMouseSwipe={true}
      itemsToShow={7}
      pagination={false}
      enableAutoPlay={true}
      autoPlaySpeed={2500}
      onNextEnd={({ index }) => {
        // console.log("index", index, "length", items.length);
        if (index === 7) {
          clearTimeout(resetTimeout);
          resetTimeout = setTimeout(() => {
            carouselRef?.current?.goTo(0);
          }, 2000); // same time
        }
      }}
    >
      {categories.map((category, i) => (
        <Link
          to={`products/${category.categoryName.toLowerCase()}`}
          key={i}
          className="mx-2"
        >
          <img className="rounded-md" src={category.image} alt="..." />
          <Typography variant="h6" className="text-center ">
            {category.categoryName}
          </Typography>
        </Link>
      ))}
    </Carousel>
  );
};

export default Category;
