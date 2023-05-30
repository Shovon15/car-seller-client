import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../Shared/Loader/Loader";
import Category from "./Category";

const Categories = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/carCategory");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  // console.log(categories);
  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold pb-3">Car Categories</h1>
      <Category categories={categories}></Category>
    </div>
  );
};

export default Categories;
