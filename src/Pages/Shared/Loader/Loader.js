import { Spinner } from "@material-tailwind/react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-24 min-h-screen">
      <Spinner color="red" className=" w-12 h-12"></Spinner>
    </div>
  );
};

export default Loader;
