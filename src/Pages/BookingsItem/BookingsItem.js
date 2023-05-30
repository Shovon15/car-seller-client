import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Button, Card, Typography } from "@material-tailwind/react";
import { GrAddCircle } from "react-icons/gr";
import { Link } from "react-router-dom";

const BookingsItem = () => {
  const { user } = useContext(AuthContext);

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/bookings/${user?.email}`);
      const data = await res.json();
      return data;
    },
  });
  const TABLE_HEAD = [
    "No.",
    "Model Name",
    "Seller Name",
    "Seller Email",
    "Phone",
    "Booking Date",
    "Payment Status",
  ];

  console.log(bookings?.length, "..............................");
  return (
    <div className="my-10">
      <h2 className="text-3xl py-5">Booking Items</h2>
      {bookings?.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="py-3 text-center text-xl font-bold">
            You have no Booking Order yet! Please add items.
          </h1>
          <Link to="/dashboard/addItems">
            <Button className="btn btn-info font-bold flex">
              Add Items <GrAddCircle className="w-4 h-4 mx-2 text-white" />
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-start text-lg font-bold p-5 uppercase">
            You have posted Total {bookings.length}{" "}
            {bookings.length === 1 ? "post" : "posts"}
          </h1>
          <Card className="overflow-scroll h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
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
                        className="font-normal leading-none opacity-70"
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
                        {booking.modelName}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking.sellerName}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking.sellerEmail}
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
                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue"
                        className="font-medium"
                      >
                        pay now
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
