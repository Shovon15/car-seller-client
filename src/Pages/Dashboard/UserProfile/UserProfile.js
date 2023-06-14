import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useUser from "../../../hooks/useUser";
import { Button } from "@material-tailwind/react";
import { FiLogOut } from "react-icons/fi";
import UpdateProfileModal from "./UpdateProfileModal";
import { useQuery } from "@tanstack/react-query";
import { showSuccessToast } from "../../Shared/Toast/toaster";
import Loader from "../../Shared/Loader/Loader";

const UserProfile = () => {
  const { user, logOut } = useContext(AuthContext);

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        `https://y-shovon15.vercel.app/users/${user?.email}`
      );
      // const data = await res.json();
      const data = await res.json();
      // console.log(data, "data from queryfn");
      return data;
    },
  });
  // const [isUser] = useUser(user?.email);
  // console.log(isUser);
  const { name, userRole, image } = users;
  const handleLogOut = () => {
    logOut()
      .then(() => {
        showSuccessToast("logout");
      })
      .catch((error) => console.error(error));
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  function capitalizeFirstLetter(word) {
    return word?.charAt(0).toUpperCase() + word?.slice(1);
  }
  if (isLoading) {
    return <Loader />;
  }
  console.log( user, "user");

  return (
    <div className="mx-5 md:mx-10 mb-5 md:mb-10 min-h-max">
      <h1 className="text-center font-bold text-xl p-5">User Profile</h1>
      <div className=" ">
        <div className="flex flex-col md:flex-row gap-3 md:mb-5">
          <img
            src={image}
            alt="avatar"
            className="w-32 h-32 rounded-full ring-2 ring-green-500"
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold  text-primary">
              Name: {capitalizeFirstLetter(name)}
            </h1>
            <h1 className="text-xl ">
              Role: {capitalizeFirstLetter(userRole)}
            </h1>
          </div>
        </div>

        <div className="flex flex-col mt-6 md:mt-0 gap-2 w-44">
          <Button onClick={handleOpen} variant="outlined">
            Update Photo
          </Button>
          <Button
            onClick={handleLogOut}
            // variant="contained"
            className="bg-red-500 flex gap-2 justify-center items-center"
          >
            Logout
            <FiLogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div>
        <UpdateProfileModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          user={users}
          refetch={refetch}
        ></UpdateProfileModal>
      </div>
    </div>
  );
};

export default UserProfile;
