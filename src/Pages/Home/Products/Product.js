import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    console.log(product);
    const { categoryName, modelName, image, price, _id } = product;
    return (
        <div className="card card-compact bg-base-100 shadow-2xl mb-10">
            <figure>
                <img src={image} alt="img" />
            </figure>
            <div className="card-body">
                <p className="text-2xl font-bold">{modelName}</p>
                <p className="text-xl  font-medium text-cyan-700">BDT: {price}</p>
                <div className="card-actions justify-center pt-4">
                    <Link to={`/products/${categoryName}/${_id}`}>
                        <button className="btn btn-outline hover:bg-cyan-700 hover:border-none px-12">Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
