import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../Shared/Loader/Loader";
import Gadget from "./Gadget";

const Gadgets = () => {
    const { data: gadgets = [], isLoading } = useQuery({
        queryKey: ["gadgets"],
        queryFn: async () => {
            const res = await fetch("https://y-liart-nine.vercel.app/gadgets");
            const data = await res.json();
            return data;
        },
    });

    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className="my-10 ">
            <h1 className="text-center text-2xl font-bold p-5">Car Accessories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-10">
                {gadgets.map((gadget) => (
                    <Gadget key={gadget._id} gadget={gadget}></Gadget>
                ))}
            </div>
        </div>
    );
};

export default Gadgets;
