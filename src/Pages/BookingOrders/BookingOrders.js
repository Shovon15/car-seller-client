import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { GrAddCircle } from "react-icons/gr";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { Button, Card, Typography } from "@material-tailwind/react";

const BookingOrders = () => {
  const { user } = useContext(AuthContext);

  const { data: bookingOrder = [] } = useQuery({
    queryKey: ["bookingOrder"],
    queryFn: async () => {
      const res = await fetch(
        `https://y-shovon15.vercel.app/bookingOrder/${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  // console.log(bookingOrder);
  const TABLE_HEAD = [
    "No.",
    "Booking Person",
    "Model Name",
    "Product Id",
    "Buyer Email",
    "Buyer Contact",
    "Booking Date",
  ];
  return (
    <div className="my-10 min-h-screen">
      <h2 className="text-3xl">My Booked Orders</h2>
      {bookingOrder?.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="py-3 text-center text-xl font-bold">
            You have no order yet! post items to get order.
          </h1>
          <Link to="/dashboard/addItems">
            <Button className="flex items-center">
              Add Items <GrAddCircle className="w-5 h-5 mx-2 text-white" />
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-start text-lg font-bold p-5 uppercase">
            Total {bookingOrder.length}{" "}
            {bookingOrder.length === 1 ? "booking" : "bookings"}
          </h1>
          <Card className="overflow-scroll h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b  border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookingOrder.map((booking, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking.name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking.modelName}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking.productId}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking.email}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        className="font-medium"
                      >
                        {booking.phone}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        className="font-medium"
                      >
                        {booking.bookingDate}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Booking Person</th>
                  <th>Model Name</th>
                  <th>Product Id</th>
                  <th>Buyer Contact</th>

                 
                  <th>Booking Date</th>
                </tr>
              </thead>
              <tbody>
                {bookingOrder.map((booking, i) => (
                  <tr key={booking._id}>
                    <th>{i + 1}</th>
                    <td className="font-bold">{booking.name}</td>
                    <td>{booking.modelName}</td>
                    <td>{booking.productId}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.bookingDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </>
      )}
    </div>
  );
};

export default BookingOrders;
