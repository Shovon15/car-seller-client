// import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
// import { AuthContext } from "../../../context/AuthProvider";
// import useUser from "../../../hooks/useUser";
import BookingModal from "./BookingModal/BookingModal";

const ProductDetails = () => {
    const product = useLoaderData();

    // console.log(isUser);
    // console.log(product);

    const {
        categoryName,
        modelName,
        color,
        condition,
        date,
        description,
        image,
        location,
        mileage,
        phone,
        price,
        purchaseYear,
        sellerImage,
        sellerName,
        sellerVerification,
    } = product;
    // const { Features, color, mileage } = specification;
    return (
        <div>
            <h2 className="text-center font-bold text-2xl pt-10">{modelName}</h2>

            <div className="mx-5 md:mx-10">
                <div className="flex flex-col-reverse md:flex-row">
                    <div className="w-full md:w-4/12 flex flex-col justify-center px-4 my-5 md:my-0 space-y-2 font-medium text-lg">
                        <p className="text-2xl py-5">Specification</p>
                        <p>
                            <span className="font-bold">Model:</span> {modelName}
                        </p>
                        <p>
                            <span className="font-bold">Category:</span> {categoryName}{" "}
                        </p>

                        <p>
                            <span className="font-bold">Color:</span> {color}
                        </p>
                        <p>
                            <span className="font-bold">Mileage:</span> {mileage} Km
                        </p>
                        <p>
                            <span className="font-bold">Condition:</span> {condition}
                        </p>
                        <p>
                            <span className="font-bold">Price: BDT </span> {price}
                        </p>
                        <p>
                            <span className="font-bold">Post Date:</span> {date}{" "}
                        </p>
                    </div>
                    <div className="w-full md:w-8/12">
                        <img src={image} alt="img" className="rounded-xl" />
                    </div>
                </div>
                <div className="mt-5">
                    <p className="font-bold">Description:</p>
                    <p className="p-2 font-medium">{description}</p>
                </div>

                <div className="flex flex-col md:flex-row justify-between my-5 md:my-10">
                    <div className="w-full md:w-4/12 ">
                        <h2 className="font-bold text-xl py-5">Seller Information</h2>

                        <img src={sellerImage} alt="seller img" className="w-20 h-20 rounded-full" />
                        <div className="flex  items-center space-x-3">
                            <p>
                                <span className="font-bold">Name:</span> {sellerName}
                            </p>
                            <div>
                                {sellerVerification === "true" && (
                                    <div className="flex">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 text-blue-500"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                            />
                                        </svg>
                                        <p className="text-blue-500">Verified Seller</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p>
                            <span className="font-bold">Location:</span> {location}
                        </p>
                        <p>
                            <span className="font-bold">Car Purchase Year: </span> {purchaseYear}
                        </p>
                        <p>
                            <span className="font-bold">Phone Number:</span> {phone}
                        </p>
                    </div>
                    <div className="w-full md:w-8/12 flex justify-center items-center my-5 md:my-0">
                        <label htmlFor="booking-modal" className="btn">
                            Booking
                        </label>
                    </div>
                </div>
            </div>
            <BookingModal product={product}></BookingModal>
        </div>
    );
};

export default ProductDetails;
