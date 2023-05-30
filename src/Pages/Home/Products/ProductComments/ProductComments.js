import React, { useContext, useState } from "react";
import Loader from "../../../Shared/Loader/Loader";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../context/AuthProvider";
import Comments from "./Comments";
import { Button, Textarea } from "@material-tailwind/react";
import useUser from "../../../../hooks/useUser";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../Shared/Toast/toaster";

const ProductComments = ({ id }) => {
  const [commentError, setCommentError] = useState();
  const { user } = useContext(AuthContext);
  const [isUser] = useUser(user?.email);

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  // console.log(isUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: comments = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/comments/${id}`);
      const data = await res.json();
      return data;
    },
  });
  console.log(comments);

  const handleAddComment = (data) => {
    const userComment = {
      postId: id,
      comment: data.comment,
      userImage: isUser?.image,
      userName: isUser?.name,
      userEmail: isUser?.email,
      date: currentDate,
    };
    console.log(userComment);
    saveComment(userComment);
  };

  const saveComment = (userComment) => {
    fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userComment),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("saveItem", data);
        if (data.acknowledged) {
          showSuccessToast("Comment added successfully");
          refetch();
          reset();
        } else {
          setCommentError(data.message);
          showErrorToast(data.message);
        }
      });
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {comments.length === 0 ? (
        <h1 className="font-semibold mx-5 lg:mx-10 my-5">No comment add yet</h1>
      ) : (
        <h1 className="font-semibold mx-5 lg:mx-10 my-5">
          Total {comments.length} people comment here
        </h1>
      )}
      <div className="flex flex-col-reverse md:flex-row mx-5 md:mx-10 p-10">
        <div className="w-full md:w-4/12 grid grid-cols-1 gap-5">
          {comments.map((comment) => (
            <Comments key={comment._id} comments={comment}></Comments>
          ))}
        </div>
        <div className="w-full md:w-8/12 ">
          <form onSubmit={handleSubmit(handleAddComment)}>
            <div className="form-control w-full  dark:text-slate-800">
              <label className="label">
                <span className="font-bold text-xl">Comment Here</span>
              </label>
              <div className="w-96">
                <Textarea
                  label="Message"
                  {...register("comment", {
                    required: "please add something",
                  })}
                />
                {errors.comment && (
                  <p className="text-red-500">{errors.comment.message}</p>
                )}
              </div>
             
            </div>
            {commentError && <p className="text-red-600">{commentError}</p>}
            <div className="mb-10 md:mb-0">
             
              <Button type="submit">Send</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductComments;
