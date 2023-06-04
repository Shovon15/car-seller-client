import React from "react";
import Carousel from "react-elastic-carousel";
import SlideCard from "../../../Component/SlideCard";
import "./Slider.css";
import img1 from "../../../assets/banner/image1.png";
import img2 from "../../../assets/banner/image2.png";
import img3 from "../../../assets/banner/image3.jpg";
import img4 from "../../../assets/banner/image4.jpg";
import img5 from "../../../assets/banner/image5.png";
import img6 from "../../../assets/banner/image6.png";
import img7 from "../../../assets/banner/image7.png";
import img8 from "../../../assets/banner/image8.png";
import img9 from "../../../assets/banner/image9.png";
import img10 from "../../../assets/banner/image10.png";
import img11 from "../../../assets/banner/image11.png";
import img12 from "../../../assets/banner/image12.png";

// import img7 from "../../../assets/banner/image2.png";
// import img8 from "../../../assets/banner/img-2-wrangler-jeep.jpg";
// import img9 from "../../../assets/banner/image6.jpg";
// import img10 from "../../../assets/banner/nissan-car-removebg-preview.png";
// import img11 from "../../../assets/banner/image5.png";
// import img12 from "../../../assets/banner/pickup-removebg-preview.png";
// import img13 from "../../../assets/banner/sedan.png";
// import img14 from "../../../assets/banner/sports-car-red.png";
import PrimaryButton from "../../../Component/Button/PrimaryButton";
import { Link } from "react-router-dom";

const CarSlider = () => {
  const carouselRef = React.createRef(null);
  let resetTimeout;
  //   const breakPoints = [
  //     {
  //       width: 1,
  //       itemsToShow: 1,
  //     },
  //     {
  //       width: 550,
  //       itemsToShow: 2,
  //     },
  //     {
  //       width: 768,
  //       itemsToShow: 2,
  //     },
  //     {
  //       width: 1000,
  //       itemsToShow: 3,
  //     },
  //   ];
  const items = [
    {
      img: img1,
    },
    {
      img: img2,
    },
    {
      img: img3,
    },
    {
      img: img4,
    },
    {
      img: img5,
    },
    {
      img: img6,
    },
    {
      img: img7,
    },
    {
      img: img8,
    },
    {
      img: img9,
    },
    {
      img: img10,
    },
    {
      img: img11,
    },
    {
      img: img12,
    },
  ];
  return (
    <div className="flex flex-col-reverse md:flex-row min-h-96 p-5">
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 md:pr-5">
        <h1 className="text-3xl md:text-5xl text-textPrimary font-extrabold mt-0 md:mt-0">
          One-Stop Destination for Buying and Selling Quality Cars.
        </h1>
        <p className="text-lg text-justify">
          Welcome to our premier car selling website! Buy or sell reconditioned
          and new cars effortlessly. Our user-friendly platform allows you to
          create selling posts and manage them with ease. We value your
          feedback, fostering a trustworthy and transparent community. Join us
          and be part of a vibrant community of car enthusiasts.
        </p>
        <div className="flex flex-col items-center md:flex-row gap-2">
          <Link to="product">
            <PrimaryButton className=" px-12">Products</PrimaryButton>
          </Link>
          <Link to="/about">
            <PrimaryButton className=" px-12">About Us</PrimaryButton>
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <Carousel
          //   breakPoints={breakPoints}
          ref={carouselRef}
          enableMouseSwipe={true}
          itemsToShow={1}
          itemsToScroll={1}
          // renderArrow={myArrow}
          pagination={false}
          // renderPagination={myPagination}
          enableAutoPlay={true}
          autoPlaySpeed={3500}
          onNextEnd={({ index }) => {
            // console.log("index", index, "length", items.length);
            if (index === 11) {
              clearTimeout(resetTimeout);
              resetTimeout = setTimeout(() => {
                carouselRef?.current?.goTo(0);
              }, 3500); // same time
            }
          }}
        >
          {items.map((item, i) => (
            <SlideCard key={i} item={item} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarSlider;
