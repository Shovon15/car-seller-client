import React from "react";
import "./Banner.css";

const BannerItem = ({ slide }) => {
    const { image, id, prev, next } = slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className="carousel-img flex items-end">
                <img src={image} alt="" className="w-full rounded-xl  h-[600px]" />
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
                <h1 className="text-6xl font-bold text-white">
                    Make Your <br />
                    Dreams Come <br />
                    True
                </h1>
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 w-2/5 left-24 top-1/2">
                <p className="text-xl text-white">
                    Choose your car with best price.Make the best buying experience with us.
                </p>
            </div>
            <div className="absolute flex justify-start transform -translate-y-1/2 w-2/5 left-24 top-3/4">
                <button className="btn btn-outline btn-warning">Categories</button>
            </div>
            <div className="absolute flex justify-center transform -translate-y-1/2 left-5 right-5 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle mr-5">
                    ❮
                </a>
                <a href={`#slide${next}`} className="btn btn-circle">
                    ❯
                </a>
            </div>
        </div>
    );
};

export default BannerItem;
