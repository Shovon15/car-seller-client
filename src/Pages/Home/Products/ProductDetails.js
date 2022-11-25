import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const ProductDetails = () => {
    const product = useLoaderData();
    console.log(product);

    const { brandName, categoryName, image, price, specification } = product;
    const { Features, color, mileage } = specification;
    return (
        <div>
            <h1 className="text-center font-bold text-2xl p-5">Product Details</h1>

            <div className="mx-5 md:mx-10">
                <div className="flex flex-col-reverse md:flex-row">
                    <div className="w-full md:w-4/12 flex flex-col justify-center px-12 my-5 md:my-0 space-y-2 font-medium">
                        <h2 className="font-bold text-2xl">{brandName}</h2>
                        <p>Category: {categoryName}</p>
                        <p>Price: {price}</p>
                    </div>
                    <div className="w-full md:w-8/12">
                        <img src={image} alt="img" className="rounded-xl" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between my-5 md:my-10">
                    <div className="w-full md:w-4/12 font-medium">
                        <h2 className="font-bold py-5">Details Information</h2>
                        <h2> Features: {Features}</h2>
                        <p>color: {color}</p>
                        <p> mileage: {mileage}</p>
                    </div>
                    <div className="w-full md:w-8/12 flex justify-center items-center my-5 md:my-0">
                        <Link>
                            <button className="btn btn-outline px-12">buy now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
