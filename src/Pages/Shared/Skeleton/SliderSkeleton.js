import React from "react";
import "./cardSkeleton.css";

const SliderSkeleton = () => {
  return (
    <div className="flex  justify-center gap-5 mx-10 ">
      <div className="h-full flex items-center justify-center animate-pulse">
        <div className="h-40 w-40 bg-gray-400 rounded-lg"></div>
      </div>

      <div className="h-full md:flex items-center hidden  justify-center animate-pulse">
        <div className="h-40 w-40 bg-gray-400 rounded-lg"></div>
      </div>

      <div className="h-full md:flex items-center hidden justify-center animate-pulse">
        <div className="h-40 w-40 bg-gray-400 rounded-lg"></div>
      </div>
      <div className="h-full md:flex items-center hidden justify-center animate-pulse">
        <div className="h-40 w-40 bg-gray-400 rounded-lg"></div>
      </div>

      <div className="h-full md:flex items-center hidden justify-center animate-pulse">
        <div className="h-40 w-40 bg-gray-400 rounded-lg"></div>
      </div>

      <div className="h-full md:flex items-center hidden justify-center animate-pulse">
        <div className="h-40 w-40 bg-gray-400 rounded-lg"></div>
      </div>
      <div className="h-full md:flex items-center hidden justify-center animate-pulse">
        <div className="h-40 w-40 bg-gray-400 rounded-lg"></div>
      </div>
    </div>
  );
};

export default SliderSkeleton;
