import React from "react";

const SlideCard = ({ item }) => {
  return (
    <div>
      <img className="rounded-md" src={item.img} alt="..." />
    </div>
  );
};

export default SlideCard;
