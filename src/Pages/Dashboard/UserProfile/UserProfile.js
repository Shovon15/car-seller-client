import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useUser from "../../../hooks/useUser";
import { Button } from "@material-tailwind/react";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isUser] = useUser(user?.email);
  console.log(isUser);
  const { name, userRole, image } = isUser;
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("    logout     ");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="mx-5 md:mx-10 ">
      <h1 className="text-center font-bold text-xl p-5">User Profile</h1>
      <div className="flex gap-5">
        <div className="flex flex-col gap-3">
          <img
            src={image}
            alt="avatar"
            className="w-32 h-32 rounded-full ring-2 ring-green-500"
          />
          <Button variant="outlined">Update Photo</Button>

          <Button
            onClick={handleLogOut}
            variant="contained"
            className="bg-red-500 flex gap-2 justify-center items-center"
          >
            Logout
            <FiLogOut className="w-4 h-4" />
          </Button>
        </div>
        <div>
          <h1 className="text-xl font-bold py-5">User Name:{name}</h1>
          <h1 className="text-xl pb-5">User Role:{userRole}</h1>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
