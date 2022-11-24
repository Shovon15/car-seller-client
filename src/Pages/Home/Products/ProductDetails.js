import React from "react";
import { useLoaderData } from "react-router-dom";

const ProductDetails = () => {
    const product = useLoaderData();
    console.log(product);

    const { brandName, categoryName, image, price, specification } = product;
    const { Features, color, mileage } = specification;
    return (
        <div>
            <h1 className="text-center font-bold text-2xl p-5">Product Details</h1>

            <div className="card card-compact bg-base-100 shadow-xl">
                <figure>
                    <img src={image} alt="img" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{brandName}</h2>
                    <p>Category: {categoryName}</p>
                    <p>Price: {price}</p>
                </div>
                <div className="card-body">
                    <h2 className="card-title"> Features: {Features}</h2>
                    <p>color: {color}</p>
                    <p> mileage: {mileage}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
