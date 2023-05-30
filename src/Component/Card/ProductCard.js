import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { RiSteering2Fill } from "react-icons/ri";
import { BsSpeedometer2 } from "react-icons/bs";
import { AiOutlineCar } from "react-icons/ai";
import { Link } from "react-router-dom";
import OutlinedButton from "../Button/OutlinedButton";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { BiGasPump } from "react-icons/bi";

const ProductCard = ({ product }) => {
  // console.log(product, "from product card");
  const {
    categoryName,
    modelName,
    image,
    price,
    _id,
    color,
    condition,
    modelYear,
    carInfo,
  } = product;
  // console.log(product);
  let badgeColor = "purple";
  if (condition === "excellent" || "Excellent") {
    badgeColor = "green";
  } else if (condition === "good" || "Good") {
    badgeColor = "amber";
  } else if (condition === "fiar" || "Fiar") {
    badgeColor = "green";
  }

  return (
    <>
      <Badge color="red" content={condition} className="mr-10 mt-2 px-4">
        <Card className="">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-b-none max-h-44"
          >
            <PhotoProvider>
              <PhotoView src={image}>
                <img src={image} alt="img-blur-shadow" />
              </PhotoView>
            </PhotoProvider>
          </CardHeader>
          <CardBody className="p-2">
            <Typography variant="h5">{modelName}</Typography>
            <div className="grid grid-cols-2 p-2 ">
              <div className="flex gap-2">
                <RiSteering2Fill className="text-primary text-xl" />
                <p>{carInfo.transmission}</p>
              </div>
              <div className="flex gap-2">
                <BsSpeedometer2 className="text-primary text-xl" />

                <p>{carInfo.mileagePerl} Km/L</p>
              </div>
              <div className="flex gap-2">
                <AiOutlineCar className="text-primary text-xl" />

                <p>Model: {modelYear}</p>
              </div>
              <div className="flex gap-2">
                <BiGasPump className="text-primary text-xl" />

                <p>{carInfo.fuelType}</p>
              </div>
            </div>
          </CardBody>
          <CardFooter className="p-2 flex justify-center items-center gap-5">
            <p className="text-primary font-bold">৳ {carInfo.price} BDT</p>
            <Link to={`/products/${categoryName}/${_id}`}>
              <OutlinedButton>Details</OutlinedButton>
            </Link>
          </CardFooter>
        </Card>
      </Badge>
    </>
  );
};

export default ProductCard;
