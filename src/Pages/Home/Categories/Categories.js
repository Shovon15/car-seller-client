import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import Category from "./Category";

const Categories = () => {
    const {
        data: categories = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/carCategory");
            const data = await res.json();
            return data;
        },
    });
    // console.log(categories);
    return (
        <div>
            <h1 className="text-center text-2xl font-bold">Categories</h1>
            <div className="grid grid-cols-3 mx-10">
                {categories.map((category) => (
                    <Category key={category._id} category={category}></Category>
                ))}
            </div>

            <Link to="/sedan">
                <button className="btn">sedan</button>
            </Link>
        </div>
    );
};

export default Categories;
