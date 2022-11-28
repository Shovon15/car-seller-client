import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const SellerAccount = () => {
    const { data: sellers = [], refetch } = useQuery({
        queryKey: ["sellers"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/sellers");
            const data = await res.json();
            return data;
        },
    });

    const [deletingSeller, setDeletingSeller] = useState();
    // console.log(sellers);

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
                    toast.success(" successfully verified.");
                    refetch();
                }
            });
    };

    const handleDeleteSeller = () => {
        fetch(`http://localhost:5000/users/${deletingSeller._id}`, {
            method: "DELETE",
            headers: {
                // authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Seller ${deletingSeller.name} deleted successfully`);
                }
            });
    };

    const closeModal = () => {
        setDeletingSeller(null);
    };

    return (
        <div>
            <h2 className="text-3xl py-5">All Sellers</h2>
            <div className="overflow-x-auto">
                <table className="table w-full dark:text-slate-800">
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
                                    <label
                                        onClick={() => setDeletingSeller(seller)}
                                        htmlFor="confirmation-modal"
                                        className="btn btn-outline border-none text-red-600 hover:text-slate-100  hover:bg-red-600"
                                    >
                                        <FaTrashAlt className="w-6 h-6" />
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {deletingSeller && (
                <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingSeller.name}. It cannot be undone.`}
                    successAction={handleDeleteSeller}
                    successButtonName="Delete"
                    modalData={deletingSeller}
                    closeModal={closeModal}
                ></ConfirmationModal>
            )}
        </div>
    );
};

export default SellerAccount;
