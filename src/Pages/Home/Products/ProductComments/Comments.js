import React from "react";

const Comments = ({ comments }) => {
  const { userName, userImage, comment, date } = comments;
  return (
    <div className="rounded-lg p-2 mx-3">
      <div className="flex flex-row  ">
        <img src={userImage} alt="user" className="rounded-full w-12 h-12" />
        <div className="">
          <h1 className="font-bold">{userName}</h1>
          <h1>{date}</h1>
        </div>
      </div>
      <h1 className="px-2 py-2 font-semibold">{comment}</h1>
    </div>
  );
};

export default Comments;
