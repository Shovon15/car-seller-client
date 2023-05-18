import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";
import { RiSteering2Fill } from "react-icons/ri";
import { AiOutlineCar } from "react-icons/ai";
import OutlinedButton from "../../../Component/Button/OutlinedButton";
const Product = ({ product }) => {
  // console.log(product);
  const { categoryName, modelName, image, price, _id } = product;
  return (
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
            <p>Automatic</p>
          </div>
          <div className="flex gap-2">
            <AiOutlineCar className="text-primary text-xl" />
            <p>10.15km /L</p>
          </div>
          <div className="flex gap-2">
            <RiSteering2Fill className="text-primary text-xl" />
            <p>Automatic</p>
          </div>
          <div className="flex gap-2">
            <AiOutlineCar className="text-primary text-xl" />
            <p>10.15km /L</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="p-2 flex justify-center items-center gap-5">
        <p className="text-primary font-bold">৳ {price}BDT</p>
        <Link to={`/products/${categoryName}/${_id}`}>
          <OutlinedButton>Details</OutlinedButton>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Product;
