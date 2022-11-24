import React from "react";

const Product = ({ product }) => {
    console.log(product);
    const { categoryName, brandName, image, price } = product;
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure>
                <img src={image} alt="img" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{brandName}</h2>
                <p>Category: {categoryName}</p>
                <p>Price: {price}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Product;
