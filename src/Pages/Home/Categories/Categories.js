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
        <div className="my-10 ">
            <h1 className="text-center text-2xl font-bold p-5">Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-10">
                {categories.map((category) => (
                    <Category key={category._id} category={category}></Category>
                ))}
            </div>
        </div>
    );
};

export default Categories;
