import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../Shared/Loader/Loader";
import Category from "./Category";
import SliderSkeleton from "../../Shared/Skeleton/SliderSkeleton";

const Categories = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("https://y-shovon15.vercel.app/carCategory");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <SliderSkeleton />;
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
