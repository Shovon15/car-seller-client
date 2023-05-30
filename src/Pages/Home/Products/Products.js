import React from "react";
import { useLoaderData } from "react-router-dom";
import Product from "./Product";
import ProductCard from "../../../Component/Card/ProductCard";

const Products = () => {
  const products = useLoaderData();

  return (
    <div className="mx-10">
      {products.length > 0 && (
        <h1 className="text-start text-lg font-bold p-5 uppercase">
          Total {products.length}{" "}
          {products.length === 1 ? "product" : "products"} for{" "}
          {products[0].categoryName}
        </h1>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-5 my-5 md:mx-10">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
<h1>Products</h1>;
