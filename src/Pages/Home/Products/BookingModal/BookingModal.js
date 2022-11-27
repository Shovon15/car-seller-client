import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthProvider";

const BookingModal = ({ product }) => {
    const { modelName, _id, sellerName, sellerEmail } = product;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(product);

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    const handleBooking = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = user?.displayName;
        const email = user?.email;
        const phone = form.phone.value;
        const location = form.location.value;

        // [3, 4, 5].map((value, i) => console.log(value))
        const booking = {
            name,
            email,
            phone,
            location,
            modelName,
            sellerName,
            sellerEmail,
            bookingDate: currentDate,
            productId: _id,
        };

        console.log(booking);

        // TODO: send data to the server
        // and once data is saved then close the modal
        // and display success toast

        fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(booking),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.acknowledged) {
                    // setTreatment(null);
                    toast.success("Booking confirmed");
                    // refetch();
                    navigate("/bookingItems");
                } else {
                    toast.error(data.message);
                }
            });
    };

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
                        ✕
                    </label>
                    <h3 className="text-lg font-bold">{modelName}</h3>
                    <form onSubmit={handleBooking} className="grid grid-cols-1 gap-3 mt-10">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            name="name"
                            value={user?.displayName}
                            type="text"
                            className="input w-full input-bordered"
                            disabled
                        />
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            name="email"
                            value={user?.email}
                            type="email"
                            className="input w-full input-bordered"
                            disabled
                        />
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input
                            name="phone"
                            type="text"
                            placeholder="Phone Number"
                            className="input w-full input-bordered"
                        />
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input
                            name="location"
                            type="text"
                            placeholder="Your location"
                            className="input w-full input-bordered"
                        />
                        <br />
                        <input className="btn btn-accent w-full" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;
