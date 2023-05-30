import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthProvider";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../../../Shared/Toast/toaster";

const BookingModal = ({ product, open, handleOpen }) => {
  const { modelName, _id, sellerName, sellerEmail } = product;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log(product);
  const {
    register,
    handleSubmit,
    // isLoading,
    formState: { errors },
  } = useForm();

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  const handleBooking = (data) => {
    // const formData = new FormData();
    data.name = user?.displayName;
    data.email = user?.email;
    data.bookingDate = currentDate;
    data.modelName = modelName;
    data.sellerName = sellerName;
    data.sellerEmail = sellerEmail;
    data.productId = _id;
    console.log(data);

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          showSuccessToast("Booking confirmed");
          // refetch();
          navigate("/dashboard/bookingItems");
        } else {
          showErrorToast(data.message);
        }
      });
  };
 

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handleSubmit(handleBooking)}>
          <Card className="mx-auto w-full ">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-12 place-items-center"
            >
              <Typography variant="h4" color="white">
                {product.modelName}
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <div>
                <Input
                  size="lg"
                  label="Name"
                  type="text"
                  value={user?.displayName}
                  disabled
                  {...register("name")}
                />
              </div>
              <div>
                <Input
                  size="lg"
                  label="Email"
                  type="text"
                  value={user?.email}
                  disabled
                  {...register("email")}
                />
              </div>
              <div>
                <Input
                  size="lg"
                  label="Phone"
                  type="text"
                  {...register("phone", {
                    required: "phone Number is Required",
                  })}
                />
                {errors.phone && (
                  <span className="text-red-500">{errors.phone.message}</span>
                )}
              </div>
              <div>
                <Input
                  size="lg"
                  label="Location"
                  type="text"
                  {...register("location", {
                    required: "location is Required",
                  })}
                />
                {errors.location && (
                  <span className="text-red-500">
                    {errors.location.message}
                  </span>
                )}
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" value="Submit" fullWidth>
                Booking
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
};

export default BookingModal;
