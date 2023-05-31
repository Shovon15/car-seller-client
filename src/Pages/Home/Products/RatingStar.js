import React from "react";
import starFill from "../../../assets/images/star (1).png";
import starNull from "../../../assets/images/star null.png";
import starHalf from "../../../assets/images/star half.png";

const RatingStar = ({ rating }) => {
  // console.log(rating);
  const renderRatingStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <img src={starFill} alt="..." className="w-6 h-6" key={i} />
        );
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(
          <img src={starHalf} alt="..." className="w-6 h-6" key={i} />
        );
      } else {
        stars.push(
          <img src={starNull} alt="..." className="w-6 h-6" key={i} />
        );
      }
    }

    return stars;
  };

  return (
    <div className="flex justify-center items-center gap-3">
      <div className="rating-star flex gap-1 ">
        {renderRatingStars()}
      </div>
      <p className="font-bold">
        {Math.floor(rating) + (rating % 1 ? 0.5 : 0)} Rated
      </p>
    </div>
  );
};

export default RatingStar;
