import React, { useContext, useState } from "react";
import Loader from "../../../Shared/Loader/Loader";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../context/AuthProvider";
import Comments from "./Comments";
import { Button, Rating, Textarea, Typography } from "@material-tailwind/react";
import useUser from "../../../../hooks/useUser";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../Shared/Toast/toaster";

const ProductComments = ({ id, ratingRefetch }) => {
  const [commentError, setCommentError] = useState();
  const [rated, setRated] = useState(4);
  const { user } = useContext(AuthContext);
  const [isUser] = useUser(user?.email);

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  // console.log(rated);

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
      const res = await fetch(`https://y-shovon15.vercel.app/comments/${id}`);
      const data = await res.json();
      return data;
    },
  });
  // console.log(comments);

  const handleAddComment = (data) => {
    const userComment = {
      postId: id,
      comment: data.comment,
      rating: rated,
      userImage: isUser?.image,
      userName: isUser?.name,
      userEmail: isUser?.email,
      date: currentDate,
    };
    // console.log(userComment);
    saveComment(userComment);
  };

  const saveComment = (userComment) => {
    fetch("https://y-shovon15.vercel.app/comments", {
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
          showSuccessToast("Review added successfully");
          refetch();
          ratingRefetch();
          reset();
          setRated(4);
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
        <h1 className="font-semibold mx-5 lg:mx-10 ">
          Add first review for this product!
        </h1>
      ) : (
        <h1 className="font-semibold mx-5 lg:mx-12">
          Total {comments.length} people review here
        </h1>
      )}
      <div className="flex flex-col md:mx-10 py-2">
        <div className="w-full md:w-4/12 grid grid-cols-1 gap-5">
          {comments.map((comment) => (
            <Comments key={comment._id} comments={comment}></Comments>
          ))}
        </div>
        <div className="w-full md:w-4/12 mt-5">
          <form onSubmit={handleSubmit(handleAddComment)}>
            <div className="form-control w-full p-5 dark:text-slate-800">
              <label className="label">
                <span className="font-bold text-xl">Review Here</span>
              </label>
              <div className="flex justify-start items-center gap-2 md:m-2">
                <Typography className="font-medium">Review Point:</Typography>
                <Rating value={rated} onChange={(value) => setRated(value)} />
                <Typography color="blue-gray" className="font-medium">
                  {rated}.0 Rated
                </Typography>
              </div>
              <div className="max-w-80">
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
              {commentError && <p className="text-red-600">{commentError}</p>}
              {/* <div className="mb-10 md:mb-0"> */}
              <Button type="submit" className="px-12 bg-primary">
                Send
              </Button>
              {/* </div> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductComments;
