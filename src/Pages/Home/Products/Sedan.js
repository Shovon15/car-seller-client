import { useQuery } from "@tanstack/react-query";
import React from "react";

const Sedan = () => {
    const {
        data: categories = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/products/sedan");
            const data = await res.json();
            return data;
        },
    });
    console.log(categories);
    return <div></div>;
};

export default Sedan;
