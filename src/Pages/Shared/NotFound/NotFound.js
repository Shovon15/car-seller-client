import { Button } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <Link to="/">
        <Button variant="outlined" className="border-primary text-primary">
          Home Page
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
