import { Button } from "@material-tailwind/react";
import React from "react";

const PrimaryButton = ({ className, children }) => {
  return <Button className={`${className} bg-primary `}>{children}</Button>;
};

export default PrimaryButton;
