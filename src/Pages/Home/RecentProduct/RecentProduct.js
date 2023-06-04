import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../Shared/Loader/Loader";
import ProductCard from "../../../Component/Card/ProductCard";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../../Component/Button/PrimaryButton";

const RecentProduct = () => {
  const { data: recentProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://y-shovon15.vercel.app/products");
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }
  // console.log(recentProducts);
  return (
    <div>
      <h1 className="font-bold text-2xl text-center pt-5">Recent Products</h1>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-10 my-5">
          {recentProducts.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))}
        </div>
        <div className="text-center mb-5">
          <Link to="/product">
            <PrimaryButton>See More</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentProduct;
