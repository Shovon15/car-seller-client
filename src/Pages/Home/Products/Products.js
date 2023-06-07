import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../../Component/Card/ProductCard";
import Loader from "../../Shared/Loader/Loader";

const Products = () => {
  const { category } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(productData, "data");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `https://y-shovon15.vercel.app/products/${category}`
        );
        const data = await response.json();

        setProductData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [category]);

  if (loading) {
    return <Loader />;
  }

  if (!productData) {
    return <div className="text-red-500 p-5">Error: Unable to fetch data.</div>;
  }

  return (
    <div className="mx-10">
      {productData.length > 0 && (
        <h1 className="text-start text-primary text-lg font-bold p-2 uppercase">
          Total {productData.length}{" "}
          {productData.length === 1 ? "product" : "products"} for{" "}
          {productData[0].categoryName}
        </h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-5  mt-2 mb-5 md:mx-10">
        {productData.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
<h1>Products</h1>;
