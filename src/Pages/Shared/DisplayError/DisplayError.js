import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { showSuccessToast } from "../Toast/toaster";
import { Button } from "@material-tailwind/react";

const DisplayError = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const { logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        showSuccessToast("logout");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="flex flex-col justify-center mt-5 gap-2">
      <p className="text-red-500">something error</p>
      <p>
        Please{" "}
        <Button
          variant="outlined"
          className="border-primary text-primary"
          onClick={handleLogOut}
        >
          Logout
        </Button>{" "}
        and login again !!!
      </p>
      <p className="text-red-500">{error.statusText || error.message}</p>
    </div>
  );
};

export default DisplayError;
