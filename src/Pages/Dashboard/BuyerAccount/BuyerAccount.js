import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Loader from "../../Shared/Loader/Loader";

const BuyerAccount = () => {
    const {
        data: buyers = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["buyers"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/buyers");
            const data = await res.json();
            return data;
        },
    });

    const [deletingBuyer, setDeletingBuyer] = useState();

    const closeModal = () => {
        setDeletingBuyer(null);
    };

    const handleDeleteBuyer = () => {
        fetch(`http://localhost:5000/buyers/${deletingBuyer._id}`, {
            method: "DELETE",
            headers: {
                // authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Buyer ${buyers.name} deleted successfully`);
                }
            });
    };

    if (isLoading) {
        return <Loader></Loader>;
    }

    return (
        <>
            <div>
                <h2 className="text-3xl py-5">All Buyers</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buyers.map((buyer, i) => (
                                <tr key={buyer._id}>
                                    <th>{i + 1}</th>
                                    <td>{buyer.name}</td>
                                    <td>{buyer.email}</td>
                                    <td>
                                        <label
                                            onClick={() => setDeletingBuyer(buyer)}
                                            htmlFor="confirmation-modal"
                                            className="btn btn-sm btn-error"
                                        >
                                            Delete
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {deletingBuyer && (
                <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingBuyer.name}. It cannot be undone.`}
                    successAction={handleDeleteBuyer}
                    successButtonName="Delete"
                    modalData={deletingBuyer}
                    closeModal={closeModal}
                ></ConfirmationModal>
            )}
        </>
    );
};

export default BuyerAccount;
