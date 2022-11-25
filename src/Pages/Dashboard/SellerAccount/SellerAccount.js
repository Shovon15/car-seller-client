import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const SellerAccount = () => {
    const { data: sellers = [], refetch } = useQuery({
        queryKey: ["sellers"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/sellers");
            const data = await res.json();
            return data;
        },
    });
    console.log(sellers);

    const handleMakeVerified = (id) => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: "PUT",
            headers: {
                // authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success("Make admin successful.");
                    refetch();
                }
            });
    };
    return (
        <div>
            <h2 className="text-3xl py-5">All Sellers</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verify</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller, i) => (
                            <tr key={seller._id}>
                                <th>{i + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>
                                    {seller?.verify !== "true" ? (
                                        <button
                                            onClick={() => handleMakeVerified(seller._id)}
                                            className="btn btn-xs btn-primary"
                                        >
                                            Verify seller
                                        </button>
                                    ) : (
                                        <p className="btn  btn-sm">Verified</p>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-xs btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerAccount;
