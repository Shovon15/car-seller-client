import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import ConfirmationModal from "../Shared/ConfirmationModal/ConfirmationModal";
import Loader from "../Shared/Loader/Loader";
import { Button, Card, Typography } from "@material-tailwind/react";
import { showSuccessToast } from "../Shared/Toast/toaster";

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
      const res = await fetch(
        `http://localhost:5000/sellerPost/${user?.email}`
      );
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  const closeModal = () => {
    setDeletingPost(null);
  };

  const handleDeletePost = () => {
    fetch(`http://localhost:5000/sellerPost/${deletingPost._id}`, {
      method: "DELETE",
      headers: {
        // authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          closeModal();
          showSuccessToast(
            `Post ${deletingPost.modelName} deleted successfully`
          );
        }
      });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }
  const TABLE_HEAD = [
    "No.",
    "Post name",
    "Post image",
    "Post Category",
    "Product Id",
    "Post Date",
    "Edit",
    "Delete",
  ];

  // console.log(postedItems);
  return (
    <div className="my-10 min-h-screen ">
      <h2 className="text-3xl font-bold ml-8">My Posted items</h2>
      {postedItems?.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="py-3 text-center text-xl font-bold">
            You have no Post yet! Please add items.
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
            You have posted Total {postedItems.length}{" "}
            {postedItems.length === 1 ? "post" : "posts"}
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
                        className="font-bold leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {postedItems.map((post, i) => (
                  <tr key={i} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i + 1}
                      </Typography>
                    </td>

                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {post.modelName}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <PhotoProvider>
                        <PhotoView src={post.image}>
                          <img
                            src={post.image}
                            alt="car"
                            className="cursor-pointer w-12 h-12 rounded-lg"
                          />
                        </PhotoView>
                      </PhotoProvider>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {post.categoryName}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {post._id}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {post.date}
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
                        Edit
                      </Typography>
                    </td>
                    <td className="p-4">
                      <label
                        onClick={() => setDeletingPost(post)}
                        htmlFor="confirmation-modal"
                        className="btn btn-outline border-none text-red-600 hover:text-slate-100  hover:bg-red-600"
                      >
                        <FaTrashAlt className="w-6 h-6 cursor-pointer" />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}

      {deletingPost && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={deletingPost.modelName}
          successAction={handleDeletePost}
          // successButtonName="Delete"
          modalData={deletingPost}
          closeModal={closeModal}
          handleOpen
          open
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default PostItems;
