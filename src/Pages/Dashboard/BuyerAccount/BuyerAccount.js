import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
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
            const res = await fetch("https://y-liart-nine.vercel.app/buyers");
            const data = await res.json();
            return data;
        },
    });

    const [deletingBuyer, setDeletingBuyer] = useState();
    // console.log(deletingBuyer);

    const closeModal = () => {
        setDeletingBuyer(null);
    };

    const handleDeleteBuyer = () => {
        fetch(`https://y-liart-nine.vercel.app/buyers/${deletingBuyer._id}`, {
            method: "DELETE",
            headers: {
                // authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Buyer ${deletingBuyer.name} deleted successfully`);
                }
            });
    };

    if (isLoading) {
        return <Loader></Loader>;
    }

    return (
        <>
            <div className="mx-5">
                <h2 className="text-3xl py-5">All Buyers</h2>
                <div className="overflow-x-auto ">
                    <table className="table w-full dark:text-slate-700">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Avatar</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buyers.map((buyer, i) => (
                                <tr key={buyer._id}>
                                    <th>{i + 1}</th>
                                    <td className="font-bold">{buyer.name}</td>
                                    <td>
                                        <img src={buyer.image} alt="user-avatar" className="w-12 h-12 rounded-full" />
                                    </td>
                                    <td>{buyer.email}</td>
                                    <td>
                                        <label
                                            onClick={() => setDeletingBuyer(buyer)}
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
