import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const BookingsItem = () => {
    const { user } = useContext(AuthContext);

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings/${user?.email}`);
            const data = await res.json();
            return data;
        },
    });

    console.log(bookings);
    return (
        <div className="my-10">
            <h2 className="text-3xl py-5">Booking Items</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Model Name</th>
                            <th>Seller Name</th>
                            <th>Seller Email</th>
                            <th>Phone</th>
                            {/* <th>Admin</th> */}
                            <th>Booking Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, i) => (
                            <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.modelName}</td>
                                <td>{booking.sellerName}</td>
                                <td>{booking.sellerEmail}</td>
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

export default BookingsItem;
