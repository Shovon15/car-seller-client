import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const BookingOrders = () => {
    const { user } = useContext(AuthContext);

    const { data: bookingOrder = [] } = useQuery({
        queryKey: ["bookingOrder"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookingOrder/${user?.email}`);
            const data = await res.json();
            return data;
        },
    });
    return (
        <div className="my-10">
            <h2 className="text-3xl py-5">My Booked Orders</h2>
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
        </div>
    );
};

export default BookingOrders;
