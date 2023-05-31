// import React, { useContext } from "react";
import { useContext, useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useUser from "../../../hooks/useUser";
import { BsSpeedometer2 } from "react-icons/bs";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import "./productDetails.css";

import BookingModal from "./BookingModal/BookingModal";
import engineImg from "../../../assets/icons/car-engine.png";
import fuelImg from "../../../assets/icons/fuel.png";
import seatImg from "../../../assets/icons/car-seat.png";
import {
  Button,
  Card,
  CardBody,
  Rating,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import ProductComments from "./ProductComments/ProductComments";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Shared/Loader/Loader";
import RatingStar from "./RatingStar";

const ProductDetails = () => {
  const product = useLoaderData();

  const { user } = useContext(AuthContext);
  // const { rating, setRating } = useState(0);
  const [isUser] = useUser(user?.email);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const {
    _id,
    modelName,
    date,
    image,
    mileage,
    sellerImage,
    sellerName,
    sellerEmail,
    carInfo,
  } = product;
  // console.log(product);

  const [rating, setRating] = useState(0);

  const {
    data: postRating = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["postRating"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/rating/${_id}`);
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      setRating(data.rating);
      // console.log(data.rating,"data");
    },
  });

  // console.log(rating,"rating");

  const carSpecification = (
    <div className="flex justify-center gap-10">
      <Card>
        <CardBody className="flex flex-col justify-center items-center">
          <BsSpeedometer2 className="text-3xl text-black" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Mileage
          </Typography>
          <Typography>{carInfo.mileagePerl} Kpl</Typography>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="flex flex-col justify-center items-center">
          <img src={fuelImg} alt="..." className="w-10" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {carInfo.fuelType}
          </Typography>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="flex flex-col justify-center items-center">
          <img src={engineImg} alt="..." className="w-10" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Engine
          </Typography>
          <Typography>{mileage}cc</Typography>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="flex flex-col justify-center items-center">
          <img src={seatImg} alt="..." className="w-10" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Seating
            <br /> Capacity
          </Typography>
          <Typography>{carInfo.seatCapacity} Seater</Typography>
        </CardBody>
      </Card>
    </div>
  );
  const sellerInfo = (
    <div>
      <div className="flex gap-5 items-center">
        <img
          src={sellerImage}
          alt="...."
          className="w-20 h-20 rounded-full ring-2 ring-blue-500"
        />
        <div className="flex flex-col">
          <p className="font-bold">{sellerName}</p>
          <p>{sellerEmail}</p>
        </div>
      </div>

      <p className=""> Post Date: {date}</p>
      <p>{sellerName}</p>
      <div>
        <BsFillChatRightDotsFill />
      </div>
    </div>
  );
  const data = [
    {
      no: 1,
      label: "Specifications",
      value: "specifications",
      desc: carSpecification,
    },
    {
      no: 2,
      label: "Specific",
      value: "specific",
      desc: carSpecification,
    },

    {
      no: 3,
      label: "Description",
      value: "description",
      desc: carInfo.description,
    },
    {
      no: 4,
      label: "Seller Info",
      value: "seller",
      desc: sellerInfo,
    },
  ];

  return (
    <div>
      <h2 className="text-center font-bold text-2xl ">{modelName}</h2>
      <div className="flex justify-start gap-5 items-center">
        <PhotoProvider>
          <PhotoView src={image}>
            <img src={image} alt="..." className="w-[500px] rounded-md m-10" />
          </PhotoView>
        </PhotoProvider>
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl">{modelName}</h1>
          <div className="flex gap-2">
            {/* <Rating value={rating} readonly /> */}
            <RatingStar rating={rating} />
            {/* <p>{Math.ceil(rating.toFixed(2))} Rated</p> */}
            {/* <p className="text-sm">rating 4.5</p> */}
          </div>
          <p className=" font-bold">
            Price<span className="text-primary"> {carInfo.price}</span> BDT
          </p>

          {sellerEmail !== isUser?.email && (
            <Button
              variant="outlined"
              onClick={handleOpen}
              className="px-12 border-primary text-primary"
            >
              Booking Now
            </Button>
          )}
        </div>
      </div>
      <div>
        {/* <ProductDetailTab /> */}
        <Tabs
          id="custom-animation"
          value="specifications"
          className="m-5 md:m-10 bg-white rounded-md"
        >
          <TabsHeader>
            {data.map(({ label, value, no }) => (
              <Tab key={value} value={value} className="font-bold">
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
      <div>
        <ProductComments ratingRefetch={refetch} id={_id} />
      </div>
      <BookingModal
        open={open}
        handleOpen={handleOpen}
        product={product}
      ></BookingModal>
    </div>
  );
};

export default ProductDetails;
