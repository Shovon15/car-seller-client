import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    console.log(product);
    const { categoryName, brandName, image, price, _id } = product;
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
                <img src={image} alt="img" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{brandName}</h2>
                <p>Category: {categoryName}</p>
                <p>Price: {price}</p>
                <div className="card-actions justify-center">
                    <Link to={`/products/${categoryName}/${_id}`}>
                        <button className="btn btn-primary px-12">Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
