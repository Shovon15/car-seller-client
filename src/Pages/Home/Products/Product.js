import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    console.log(product);
    const { categoryName, modelName, image, price, _id } = product;
    return (
        <div className="card card-compact bg-base-100 dark:bg-slate-600 shadow-2xl mb-10">
            <PhotoProvider>
                <PhotoView src={image}>
                    <img src={image} alt="car" className="cursor-pointer" />
                </PhotoView>
            </PhotoProvider>
            <div className="card-body">
                <p className="text-2xl font-bold">{modelName}</p>
                <p className="text-xl  font-medium text-cyan-700 dark:text-slate-300">BDT: {price}</p>
                <div className="card-actions justify-center pt-4">
                    <Link to={`/products/${categoryName}/${_id}`}>
                        <button className="btn btn-outline dark:text-white hover:bg-cyan-700 hover:border-none px-12">
                            Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
