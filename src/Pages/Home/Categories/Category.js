import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
    const { categoryName, title, image } = category;

    const handleProducts = (categoryName) => {
        console.log(categoryName);
    };

    return (
        <div className="card card-compact  bg-base-100 dark:bg-slate-600 shadow-xl">
            <figure>
                <PhotoProvider>
                    <PhotoView src={image}>
                        <img src={image} alt="car" />
                    </PhotoView>
                </PhotoProvider>
            </figure>
            <div className="card-body">
                <h2 className="text-2xl font-bold">{categoryName.toUpperCase()}</h2>
                <h2 className="font-medium">{title}</h2>
                <div className="card-actions justify-center pt-4">
                    <Link to={`/products/${categoryName.toLowerCase()}`}>
                        <button
                            onClick={() => handleProducts(categoryName)}
                            className="btn btn-outline dark:text-white hover:bg-cyan-700 hover:border-none px-12"
                        >
                            See all items
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Category;
