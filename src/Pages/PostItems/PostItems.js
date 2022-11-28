import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import ConfirmationModal from "../Shared/ConfirmationModal/ConfirmationModal";
import Loader from "../Shared/Loader/Loader";

const PostItems = () => {
    const { user } = useContext(AuthContext);

    const [deletingPost, setDeletingPost] = useState();
    const {
        data: postedItems = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["postedItems"],
        queryFn: async () => {
            const res = await fetch(`https://y-liart-nine.vercel.app/sellerPost/${user?.email}`);
            const data = await res.json();
            return data;
        },
    });

    const closeModal = () => {
        setDeletingPost(null);
    };

    const handleDeletePost = () => {
        fetch(`https://y-liart-nine.vercel.app/sellerPost/${deletingPost._id}`, {
            method: "DELETE",
            headers: {
                // authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Post ${deletingPost.modelName} deleted successfully`);
                }
            });
    };

    if (isLoading) {
        return <Loader></Loader>;
    }

    // console.log(postedItems);
    return (
        <div className="my-10">
            <h2 className="text-3xl">My Posted items</h2>
            {postedItems?.length === 0 ? (
                <h1 className="py-3 text-center font-bold">you have no Post yet! Please add items.</h1>
            ) : (
                <>
                    <h1 className="text-start text-lg font-bold p-5 uppercase">
                        You have posted Total {postedItems.length} {postedItems.length === 1 ? "post" : "posts"}
                    </h1>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Post name</th>
                                    <th>Post image</th>
                                    <th>Post Category</th>
                                    <th>Product Id</th>
                                    <th>Post Date</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postedItems.map((post, i) => (
                                    <tr key={post._id}>
                                        <th>{i + 1}</th>
                                        <td className="font-bold">{post.modelName}</td>
                                        <td>
                                            <img src={post.image} alt="post_Image" className="w-18 h-12 rounded-lg" />
                                        </td>
                                        <td>{post.categoryName}</td>
                                        <td>{post._id}</td>
                                        <td>{post.date}</td>
                                        <td>
                                            <label
                                                onClick={() => setDeletingPost(post)}
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
                </>
            )}
            {deletingPost && (
                <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingPost.name}. It cannot be undone.`}
                    successAction={handleDeletePost}
                    successButtonName="Delete"
                    modalData={deletingPost}
                    closeModal={closeModal}
                ></ConfirmationModal>
            )}
        </div>
    );
};

export default PostItems;
