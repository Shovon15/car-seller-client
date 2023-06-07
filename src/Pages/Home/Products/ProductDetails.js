// import React, { useContext } from "react";
import { useContext, useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useUser from "../../../hooks/useUser";
import { BsSpeedometer2 } from "react-icons/bs";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { IoColorPaletteOutline } from "react-icons/io5";
import { BsShieldFillCheck } from "react-icons/bs";
import BookingModal from "./BookingModal/BookingModal";
import engineImg from "../../../assets/icons/car-engine.png";
import fuelImg from "../../../assets/icons/fuel.png";
import seatImg from "../../../assets/icons/car-seat.png";
import carImg from "../../../assets/icons/car.png";
import "./productDetails.css";

import {
  Button,
  Card,
  CardBody,
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
  const { category, id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [isUser] = useUser(user?.email);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const handleOpen = () => setOpen((cur) => !cur);

  const { data: postRating = {}, refetch } = useQuery({
    queryKey: ["postRating"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/rating/${id}`);
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      setRating(data.rating);
      // console.log(data.rating,"data");
    },
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/products/${category}/${id}`
        );
        const data = await response.json();

        setProductData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [category, id]);

  if (loading) {
    return <Loader />;
  }

  if (!productData) {
    return (
      <div className="text-red-500 p-5">Error: Unable to fetch product data.</div>
    );
  }
  // console.log(productData, "productData from product details");

  // --------------------------------------------------------

  const {
    _id,
    modelName,
    categoryName,
    date,
    image,
    sellerVerification,
    color,
    condition,
    modelYear,
    sellerImage,
    sellerName,
    sellerEmail,
    carInfo,
  } = productData;
  // console.log(product);

  const carSpecification = (
    <div className="flex flex-col md:flex-row justify-center gap-5">
      <Card>
        <CardBody className="flex flex-col justify-center items-center">
          <BsFileEarmarkSpreadsheet className="text-3xl  text-black" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Condition
          </Typography>
          <Typography className="text-primary font-semibold">
            {condition}
          </Typography>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="flex flex-col justify-center items-center">
          <img src={carImg} alt="..." className="w-10" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Model Year
          </Typography>
          <Typography className="text-primary font-semibold">
            {modelYear}
          </Typography>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="flex flex-col justify-center items-center">
          <IoColorPaletteOutline className="text-3xl text-black" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Car Color
          </Typography>
          <Typography className="text-primary font-semibold">
            {color}
          </Typography>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="flex flex-col justify-center items-center">
          <BsSpeedometer2 className="text-3xl text-black" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Mileage
          </Typography>
          <Typography className="text-primary font-semibold">
            {carInfo.mileagePerl} Kpl
          </Typography>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="flex flex-col justify-center items-center">
          <img src={fuelImg} alt="..." className="w-8" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Fuel Type
          </Typography>
          <Typography className="text-primary font-semibold">
            {carInfo.fuelType}
          </Typography>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="flex flex-col justify-center items-center">
          <img src={engineImg} alt="..." className="w-10" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            transmission
          </Typography>
          <Typography className="text-primary font-semibold">
            {carInfo.transmission}
          </Typography>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="flex flex-col justify-center items-center">
          <img src={seatImg} alt="..." className="w-10" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Seating
            <br /> Capacity
          </Typography>
          <Typography className="text-primary font-semibold">
            {carInfo.seatCapacity} Seater
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
  const sellerInfo = (
    <div>
      <div className="flex  gap-5 items-center">
        <img
          src={sellerImage}
          alt="...."
          className="w-20 h-20 rounded-full ring-2 ring-blue-500"
        />
        <div className="flex flex-col">
          <p className="font-bold text-2xl text-primary">{sellerName}</p>
          <p className="font-bold">{sellerEmail}</p>
          {sellerVerification === "true" && (
            <div className="flex gap-2 text-blue-500 items-center">
              <p className="font-bold ">verified Seller</p>
              <BsShieldFillCheck className="font-bold w-6 h-6" />
            </div>
          )}
        </div>
      </div>
      <p className=""> Post Date: {date}</p>
    </div>
  );

  const carDescription = (
    <p className="text-lg indent-8 ">{carInfo.description}</p>
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
      label: "Description",
      value: "description",
      desc: carDescription,
    },
    {
      no: 3,
      label: "Seller Info",
      value: "seller",
      desc: sellerInfo,
    },
  ];

  function capitalizeFirstLetter(word) {
    return word?.charAt(0).toUpperCase() + word?.slice(1);
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-start gap-5 items-center">
        <PhotoProvider>
          <PhotoView src={image}>
            <img
              src={image}
              alt="..."
              className="w-[500px] rounded-md md:p-5"
            />
          </PhotoView>
        </PhotoProvider>
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-primary">
            {capitalizeFirstLetter(modelName)}
          </h1>
          <h1 className="font-bold text-xl ">
            Category: {capitalizeFirstLetter(categoryName)}
          </h1>
          <div className="flex gap-2">
            <RatingStar rating={rating} />
          </div>
          <p className=" font-bold">
            Price<span className="text-primary"> {carInfo.price}</span> BDT
          </p>

          {sellerEmail !== isUser?.email && isUser?.userRole !== "admin" && (
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
        product={productData}
      ></BookingModal>
    </div>
  );
};

export default ProductDetails;
