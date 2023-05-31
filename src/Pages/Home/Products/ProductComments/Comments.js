import { Rating } from "@material-tailwind/react";
import React from "react";

const Comments = ({ comments }) => {
  const { userName, userImage, comment, date, rating } = comments;
  return (
    <div className="rounded-lg p-2 mx-3 bg-white">
      <div className="flex flex-row gap-2 relative">
        <img src={userImage} alt="user" className="rounded-full w-12 h-12" />
        <div className="">
          <h1 className="font-bold text-primary">{userName}</h1>
          <h1 className="text-gray-600">{date}</h1>
        </div>
        <Rating className="absolute right-0 p-2" value={rating} readonly />
      </div>
      <h1 className="px-2 py-2 font-semibold">{comment}</h1>
    </div>
  );
};

export default Comments;
