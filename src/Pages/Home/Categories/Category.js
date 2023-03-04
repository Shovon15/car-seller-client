import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
    const { categoryName, image } = category;

    // const handleProducts = (categoryName) => {
    //     console.log(categoryName);
    // };

    return (
        <div className="card card-compact  bg-base-100 dark:bg-slate-600 shadow-xl">
            <figure>
                <PhotoProvider>
                    <PhotoView src={image}>
                        <img src={image} alt="car" className="cursor-pointer" />
                    </PhotoView>
                </PhotoProvider>
            </figure>
            <div className="card-body p-0">
                <div className="card-actions justify-center ">
                    <Link to={`/products/${categoryName.toLowerCase()}`}>
                        <button
                            // onClick={() => handleProducts(categoryName)}
                            className="btn btn-xs sm:btn-sm  btn-outline dark:text-white hover:bg-cyan-700 hover:border-none  glass"
                        >
                            {categoryName.toUpperCase()}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Category;
