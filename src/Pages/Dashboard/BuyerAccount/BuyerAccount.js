import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
// import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Loader from "../../Shared/Loader/Loader";
import { toast } from "react-toastify";
import { showSuccessToast } from "../../Shared/Toast/toaster";
import { Avatar, Button, Card, Typography } from "@material-tailwind/react";

const BuyerAccount = () => {
  const {
    data: buyers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch("https://y-shovon15.vercel.app/buyers");
      const data = await res.json();
      return data;
    },
  });
  // console.log(buyers[0]._id);

  const [deletingBuyer, setDeletingBuyer] = useState();
  // console.log(deletingBuyer);

  const closeModal = () => {
    setDeletingBuyer(null);
  };

  const handleMakeVerified = (id) => {
    console.log(id);
    fetch(`https://y-shovon15.vercel.app/user/${id}`, {
      method: "PUT",
      headers: {
        // authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          showSuccessToast(" successfully verified.");
          refetch();
        }
      });
  };

  const handleDeleteBuyer = () => {
    fetch(`https://y-shovon15.vercel.app/buyers/${deletingBuyer._id}`, {
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
          showSuccessToast(`User ${deletingBuyer.name} deleted successfully`);
        }
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  const TABLE_HEAD = [
    "No.",
    "Name",
    "Avatar",
    "Email",
    "Verify as Seller",
    "Action",
  ];

  return (
    <>
      <div className="mx-5 mb-5 md:mb-10">
        <h2 className="text-3xl py-5">All User Accounts</h2>
        <div className="overflow-x-auto ">
          <Card className="overflow-scroll h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b  border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {buyers.map((buyer, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-2">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1 + "."}
                      </Typography>
                    </td>
                    <td className="p-2">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {buyer.name}
                      </Typography>
                    </td>
                    <td className="p-2">
                      <Avatar src={buyer.image} alt="..."></Avatar>
                    </td>
                    <td className="p-2">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {buyer.email}
                      </Typography>
                    </td>
                    <td className="p-2">
                      {buyer?.verify !== "true" ? (
                        <Button
                          variant="outlined"
                          size="sm"
                          onClick={() => handleMakeVerified(buyer._id)}
                          className=" text-green-500 border-primary"
                        >
                          Verify seller
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-green-500 text-white font-bold disabled:opacity-100 disabled:cursor-no-drop"
                          disabled
                        >
                          Verified
                        </Button>
                      )}
                    </td>
                    <td className="p-2">
                      <Button
                        variant="outlined"
                        className="focus:ring-0 border-none rounded-full p-3"
                        onClick={() => setDeletingBuyer(buyer)}
                      >
                        <FaTrashAlt className="w-5 h-5 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* <table className="table w-full dark:text-slate-700">
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
                    <PhotoProvider>
                      <PhotoView src={buyer.image}>
                        <img
                          src={buyer.image}
                          alt="car"
                          className="cursor-pointer w-12 h-12 rounded-full"
                        />
                      </PhotoView>
                    </PhotoProvider>
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
          </table> */}
        </div>
      </div>
      {deletingBuyer && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={deletingBuyer.name}
          successAction={handleDeleteBuyer}
          // successButtonName="Delete"
          modalData={deletingBuyer}
          closeModal={closeModal}
          handleOpen
          open
          // title={`Are you sure you want to delete?`}
          // message={`If you delete ${deletingBuyer.name}. It cannot be undone.`}
          // successAction={handleDeleteBuyer}
          // successButtonName="Delete"
          // modalData={deletingBuyer}
          // closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </>
  );
};

export default BuyerAccount;
