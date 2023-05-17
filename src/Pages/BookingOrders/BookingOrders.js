import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { GrAddCircle } from "react-icons/gr";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const BookingOrders = () => {
  const { user } = useContext(AuthContext);

  const { data: bookingOrder = [] } = useQuery({
    queryKey: ["bookingOrder"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bookingOrder/${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="my-10 min-h-screen">
      <h2 className="text-3xl">My Booked Orders</h2>
      {bookingOrder?.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="py-3 text-center text-xl font-bold">
            You have no order yet! post items to get order.
          </h1>
          <Link to="/addItems">
            <button className="btn btn-info font-bold">
              Add Items <GrAddCircle className="w-5 h-5 mx-2" />
            </button>
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-start text-lg font-bold p-5 uppercase">
            Total {bookingOrder.length}{" "}
            {bookingOrder.length === 1 ? "booking" : "bookings"}
          </h1>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Booking Person</th>
                  <th>Model Name</th>
                  <th>Product Id</th>
                  <th>Buyer Contact</th>

                  {/* <th>Admin</th> */}
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
          </div>
        </>
      )}
    </div>
  );
};

export default BookingOrders;
