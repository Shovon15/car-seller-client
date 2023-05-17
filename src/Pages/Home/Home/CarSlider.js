import React from "react";
import Carousel from "react-elastic-carousel";
import SlideCard from "../../../Component/SlideCard";
import "./Slider.css";
import img1 from "../../../assets/banner/image1.jpg";
import img2 from "../../../assets/banner/image2.jpg";
import img3 from "../../../assets/banner/image3.jpg";
import img4 from "../../../assets/banner/image4.jpg";
import img5 from "../../../assets/banner/image5.jpg";
import img6 from "../../../assets/banner/image6.jpg";
import PrimaryButton from "../../../Component/Button/PrimaryButton";

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
  ];
  return (
    <div className="flex flex-col-reverse md:flex-row min-h-96 p-5 md:p-10">
      <div className="w-full md:w-1/2 flex flex-col gap-4 pr-5">
        <h1 className="text-3xl md:text-5xl font-bold mt-5 md:mt-0">
          Make Your Dreams <br /> Come True
        </h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
        <PrimaryButton className="mr-auto">About Us</PrimaryButton>
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
          autoPlaySpeed={2500}
          onNextEnd={({ index }) => {
            console.log("index", index, "length", items.length);
            if (index === 5) {
              clearTimeout(resetTimeout);
              resetTimeout = setTimeout(() => {
                carouselRef?.current?.goTo(0);
              }, 2000); // same time
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
