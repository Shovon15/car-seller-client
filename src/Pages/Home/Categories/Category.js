import React from "react";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
    const { categoryName, image } = category;

    const handleProducts = (categoryName) => {
        console.log(categoryName);
    };

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure>
                <img src={image} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{categoryName}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-center ">
                    <Link to={`/products/${categoryName.toLowerCase()}`}>
                        <button onClick={() => handleProducts(categoryName)} className="btn btn-primary px-12">
                            See all items
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Category;
