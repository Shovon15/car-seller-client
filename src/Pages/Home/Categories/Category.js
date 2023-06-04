import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import "./categoryCarousel.css";

import { Link } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { BiRightArrowAlt } from "react-icons/bi";

const Category = ({ categories }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);
  // ----------------for reviwe slide number length (-1)--------------------------
  let length = 8;
  if (windowWidth >= 550) {
    length = 4;
  }
  const carouselRef = React.createRef(null);
  let resetTimeout;

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const myArrow = ({ type, onClick, isEdge }) => {
    const leftArrow = <BiLeftArrowAlt className="text-3xl text-black" />;
    const rightArrow = <BiRightArrowAlt className="text-3xl text-black" />;
    const pointer = type === "PREV" ? leftArrow : rightArrow;

    return (
      <Button
        onClick={onClick}
        disabled={isEdge}
        className="px-2 py-2 h-12 flex justify-center items-center my-auto bg-gray-200 border-2 
        rounded-full border-none"
      >
        {pointer}
      </Button>
    );
  };
  const breakPoints = [
    {
      width: 1,
      itemsToShow: 1,
    },
    {
      width: 550,
      itemsToShow: 1,
    },
    {
      width: 768,
      itemsToShow: 5,
    },
    {
      width: 1000,
      itemsToShow: 5,
    },
  ];

  return (
    <Carousel
      breakPoints={breakPoints}
      ref={carouselRef}
      renderArrow={myArrow}
      enableMouseSwipe={true}
      // itemsToShow={5}
      pagination={false}
      enableAutoPlay={true}
      autoPlaySpeed={2500}
      onNextEnd={({ index }) => {
        // console.log("index", index, "length", length);
        if (index === length) {
          clearTimeout(resetTimeout);
          resetTimeout = setTimeout(() => {
            carouselRef?.current?.goTo(0);
          }, 2500); // same time
        }
      }}
    >
      {categories.map((category, i) => (
        <Link
          to={`products/${category.categoryName.toLowerCase()}`}
          key={i}
          className="mx-2 hover:bg-white text-primary rounded-md"
        >
          <img className="rounded-md" src={category.image} alt="..." />
          <Typography variant="h6" className="text-center ">
            {capitalizeFirstLetter(category.categoryName)}
          </Typography>
        </Link>
      ))}
    </Carousel>
  );
};

export default Category;
