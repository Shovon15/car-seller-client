import React from "react";
import "./cardSkeleton.css";

const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mx-10 my-5">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-48 rounded-lg animate-skeleton"></div>
        </div>
        <div className="mt-4 animate-pulse">
          <div className="h-4 bg-gray-300 rounded animate-skeleton"></div>
          <div className="h-6 mt-2 bg-gray-300 rounded animate-skeleton"></div>
        </div>
        <div className="mt-4 animate-pulse">
          <div className="flex items-center justify-center bg-gray-300 rounded-lg h-10 w-24 animate-skeleton"></div>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-48 rounded-lg animate-skeleton"></div>
        </div>
        <div className="mt-4 animate-pulse">
          <div className="h-4 bg-gray-300 rounded animate-skeleton"></div>
          <div className="h-6 mt-2 bg-gray-300 rounded animate-skeleton"></div>
        </div>
        <div className="mt-4 animate-pulse">
          <div className="flex items-center justify-center bg-gray-300 rounded-lg h-10 w-24 animate-skeleton"></div>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-48 rounded-lg animate-skeleton"></div>
        </div>
        <div className="mt-4 animate-pulse">
          <div className="h-4 bg-gray-300 rounded animate-skeleton"></div>
          <div className="h-6 mt-2 bg-gray-300 rounded animate-skeleton"></div>
        </div>
        <div className="mt-4 animate-pulse">
          <div className="flex items-center justify-center bg-gray-300 rounded-lg h-10 w-24 animate-skeleton"></div>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-48 rounded-lg animate-skeleton"></div>
        </div>
        <div className="mt-4 animate-pulse">
          <div className="h-4 bg-gray-300 rounded animate-skeleton"></div>
          <div className="h-6 mt-2 bg-gray-300 rounded animate-skeleton"></div>
        </div>
        <div className="mt-4 animate-pulse">
          <div className="flex items-center justify-center bg-gray-300 rounded-lg h-10 w-24 animate-skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
