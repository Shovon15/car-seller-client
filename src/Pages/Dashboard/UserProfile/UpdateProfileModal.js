import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../../Shared/Toast/toaster";
import { DashboardContext } from "../../../context/DashboardContext";

const UpdateProfileModal = ({ user, open, setOpen, handleOpen, refetch }) => {
  const { windowWidth } = useContext(DashboardContext);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const imageHostKey = process.env.REACT_APP_img_KEY;

  const handleUpdateProfile = (data) => {
    const image = data.image[0];
    // console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        // console.log(imgData);
        if (imgData.success) {
          saveUpdateUser(imgData.data.url);
        }
      });
  };

  const saveUpdateUser = (data) => {
    console.log(user?.email, data);
    const imageUrl = {
      image: data,
    };

    fetch(`https://y-shovon15.vercel.app/users/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(imageUrl),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("userSaveDb", data);
        if (data.acknowledged) {
          showSuccessToast("Profile Updated");
          refetch();
          setOpen(false);
        } else {
          showErrorToast(data.message);
        }
      });
  };
  let size = "xl";
  if (windowWidth > 920) {
    size = "xs";
  }

  return (
    <>
      <Dialog
        size={size}
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <Card className="mx-auto w-full ">
            <CardHeader
              variant="gradient"
              color="red"
              className="mb-4 grid h-12 place-items-center"
            >
              <h1 className="font-bold text-2xl">{user?.name}</h1>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <div>
                <input
                  type="file"
                  {...register("image", {
                    required: "Photo is Required",
                  })}
                  className="input input-bordered w-full  py-2 border border-gray-500 rounded-md"
                />
                {errors.image && (
                  <p className="text-red-500">{errors.image.message}</p>
                )}
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" className="mt-6">
                Update
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
};

export default UpdateProfileModal;
