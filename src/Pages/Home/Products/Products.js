import React from "react";
import { useLoaderData } from "react-router-dom";
import Product from "./Product";

const Products = () => {
    const products = useLoaderData();
    console.log(products);
    // const { categoryName } = products;

    return (
        <div>
            {products.length > 0 && (
                <h1 className="text-center font-bold p-5">
                    {products.length} products for {products[0].categoryName}
                </h1>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 md:mx-10">
                {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                ))}
            </div>
        </div>
    );
};

export default Products;
<h1>Products</h1>;
