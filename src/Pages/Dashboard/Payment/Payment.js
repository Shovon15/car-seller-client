import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import Loader from "../../Shared/Loader/Loader";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
// console.log(stripePromise);
const Payment = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(productData, "data");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/booking/${id}`
        );
        const data = await response.json();

        setBookingData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!bookingData) {
    return <div className="text-red-500 p-5">Error: Unable to fetch data.</div>;
  }
  // const booking = useLoaderData();
  // console.log(booking);
  return (
    <div className="min-h-max w-96 my-5 md:my-10 flex flex-col gap-5">
      <p className="text-primary font-bold text-2xl">
        Payment for {bookingData.modelName}
      </p>
      <p className=" font-bold text-2xl">Total Price: {bookingData.price} BDT</p>
      <Elements stripe={stripePromise}>
        <CheckOutForm booking={bookingData} />
      </Elements>
    </div>
  );
};

export default Payment;
