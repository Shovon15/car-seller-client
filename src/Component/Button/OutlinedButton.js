import { Button } from "@material-tailwind/react";
import React from "react";

const OutlinedButton = ({ className, children }) => {
  return (
    <Button
      variant="outlined"
      className={`${className} border-primary text-primary font-extrabold focus:ring-0`}
    >
      {children}
    </Button>
  );
};

export default OutlinedButton;
