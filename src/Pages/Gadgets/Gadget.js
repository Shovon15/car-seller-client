import React from "react";
import { Link } from "react-router-dom";

const Gadget = ({ gadget }) => {
    const { gadgetName, brandName, image, price, color, details } = gadget;

    const handleGadgets = () => {};
    return (
        <div className="card card-compact  bg-base-100 dark:bg-slate-600 shadow-xl">
            <figure className="w-72 h-72 ">
                <img src={image} alt="gadget" className="mx-auto" />
            </figure>
            <div className="card-body">
                <h2 className="text-2xl font-bold">{gadgetName.toUpperCase()}</h2>
                <h2 className="font-medium">{details}</h2>
                <h2 className="font-medium">Brand: {brandName}</h2>
                <h2 className="font-medium">BDT {price}</h2>
                <h2 className="font-medium">Color: {color}</h2>
                <div className="card-actions justify-center pt-4">
                    <Link to="/">
                        <button
                            onClick={handleGadgets}
                            className="btn btn-outline dark:text-white hover:bg-cyan-700 hover:border-none px-12"
                        >
                            details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Gadget;
