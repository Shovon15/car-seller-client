import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Button, Card, Typography } from "@material-tailwind/react";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "../Shared/Loader/Loader";

const BookingsItem = () => {
  const { user } = useContext(AuthContext);

  // const { data: bookings = [] } = useQuery({
  //   queryKey: ["bookings"],
  //   queryFn: async () => {
  //     const res = await fetch(`https://y-shovon15.vercel.app/bookings/${user?.email}`);
  //     const data = await res.json();
  //     return data;
  //   },
  // });
  const headers = {
    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Content-Type": "application/json",
  };

  const {
    data: bookings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(
        `https://y-shovon15.vercel.app/bookings/${user?.email}`,
        {
          headers,
        }
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    <Loader />;
  }
  const TABLE_HEAD = [
    "No.",
    "Model Name",
    "Seller Name",
    "Seller Email",
    "Phone",
    "Booking Date",
    "price",
    "Payment Status",
    "Transection Id",
  ];

  console.log(bookings, "..............................");
  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold text-primary py-5">
        Product You Have Booked
      </h2>
      {bookings?.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="py-3 text-center text-xl font-bold">
            You have no Booking items yet! Please book items.
          </h1>
          <Link to="/product">
            <Button className="btn btn-info font-bold flex">
              view Items{" "}
              <MdOutlineProductionQuantityLimits className="w-4 h-4 mx-2 text-white" />
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-start text-lg font-bold p-5 uppercase">
            You have booked Total {bookings.length}{" "}
            {bookings.length === 1 ? "product" : "products"}
          </h1>
          <Card className="overflow-scroll h-full w-full">
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-2">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className="p-2">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking.modelName}
                      </Typography>
                    </td>
                    <td className="p-2">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking.sellerName}
                      </Typography>
                    </td>
                    <td className="p-2">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking.sellerEmail}
                      </Typography>
                    </td>
                    <td className="p-2">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        className="font-medium"
                      >
                        {booking.phone}
                      </Typography>
                    </td>
                    <td className="p-2">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        className="font-medium"
                      >
                        {booking.bookingDate}
                      </Typography>
                    </td>
                    <td className="p-2">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        className="font-bold"
                      >
                        {booking.price}
                      </Typography>
                    </td>
                    <td className="p-2">
                      {booking.price && !booking.paid && (
                        <Link to={`/dashboard/payment/${booking._id}`}>
                          <Button
                            variant="outlined"
                            className="p-2 border-primary text-primary"
                          >
                            Pay Now
                          </Button>
                        </Link>
                      )}
                      {booking.price && booking.paid && (
                        <Button
                          variant="outlined"
                          className="text-green-800 border-green-800 p-2"
                          disabled
                        >
                          Paid
                        </Button>
                      )}
                    </td>
                    <td className="p-2">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        className="font-medium"
                      >
                        {booking?.transactionId ? (
                          <>{booking.transactionId}</>
                        ) : (
                          <>N/A</>
                        )}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}
    </div>
  );
};

export default BookingsItem;
