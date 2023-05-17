// import React, { useContext } from "react";
import { useContext, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useUser from "../../../hooks/useUser";
import { BsSpeedometer2 } from "react-icons/bs";
import { GiCarSeat } from "react-icons/gi";

import BookingModal from "./BookingModal/BookingModal";
import engineImg from "../../../assets/icons/car-engine.png";
import fuelImg from "../../../assets/icons/fuel.png";
import seatImg from "../../../assets/icons/car-seat.png";
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

const ProductDetails = () => {
  const product = useLoaderData();

  const { user } = useContext(AuthContext);
  const [isUser] = useUser(user?.email);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const {
    categoryName,
    modelName,
    color,
    condition,
    date,
    description,
    image,
    location,
    mileage,
    phone,
    price,
    purchaseYear,
    sellerImage,
    sellerName,
    sellerVerification,
  } = product;

  const carSpecification = (
    <div className="flex justify-center gap-10">
      <Card>
        <CardBody className="flex flex-col justify-center items-center">
          <BsSpeedometer2 className="text-3xl text-black" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Mileage
          </Typography>
          <Typography>{mileage}Kpl</Typography>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="flex flex-col justify-center items-center">
          <img src={fuelImg} alt="..." className="w-10" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Fuel Type
          </Typography>
          <Typography>{mileage}Kpl</Typography>
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
          <Typography>{mileage} Seater</Typography>
        </CardBody>
      </Card>
    </div>
  );
  const sellerInfo = (
    <div>
      <img src={sellerImage} alt="...." className="w-20 h-20 rounded-full" />
      <p>{sellerName}</p>
      <p>{sellerName}</p>
      <p>{sellerName}</p>
      <p>{sellerName}</p>
    </div>
  );
  const data = [
    {
      label: "HTML",
      value: "html",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Specifications",
      value: "specifications",
      desc: carSpecification,
    },

    {
      label: "Description",
      value: "description",
      desc: description,
    },
    {
      label: "Seller Info",
      value: "seller",
      desc: sellerInfo,
    },
  ];

  return (
    <div>
      <h2 className="text-center font-bold text-2xl ">{modelName}</h2>
      <div className="flex justify-start gap-5 items-center">
        <img src={image} alt="..." className="w-[600px]" />
        <div>
          <p>{price}</p>
          <p>ratting</p>
          <Button
            onClick={handleOpen}
            variant="outlined"
            className="focus:ring-none"
          >
            Booking Now
          </Button>
        </div>
      </div>
      <div>
        <Tabs id="custom-animation" value="html" className="m-5 md:m-10">
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
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
      <BookingModal
        open={open}
        handleOpen={handleOpen}
        product={product}
      ></BookingModal>
    </div>
  );
};

export default ProductDetails;
