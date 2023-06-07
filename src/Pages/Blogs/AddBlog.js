import { Button, Input, Textarea } from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "../Shared/Toast/toaster";
import { useQuery } from "@tanstack/react-query";
import BlogLists from "./BlogLists";

const AddBlog = () => {



    const { data: blogData = [] } = useQuery({
        queryKey: ["bolgData"],
        queryFn: async () => {
          const res = await fetch("http://localhost:5000/blogs");
          const data = await res.json();
          return data;
        },
      });

  const {
    register,
    formState: { errors },
    handleSubmit,
    isLoading,
    reset,
  } = useForm();

  const imageHostKey = process.env.REACT_APP_img_KEY;
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  const handleAddItems = (data) => {
    // console.log("Test Data", data);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          let image = imgData.data.url;

          const items = {
            date: currentDate,
            image,
            heading: data.heading,
            description: data.description,
          };
          saveItem(items);
          // console.log(items, "items");
        }
      });
  };
  const saveItem = (items) => {
    fetch("http://localhost:5000/blogs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(items),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("saveItem", data);
        // getUserToken(email);
        if (data.acknowledged) {
          showSuccessToast("item added successfully");
          reset();
          //   navigate("/dashboard/managePost");
        } else {
          showErrorToast(data.message);
        }
      });
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary ml-5 mt-5">
        Add Blog Post
      </h1>
      <form onSubmit={handleSubmit(handleAddItems)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          <div>
            <Input
              label="Car Model Name"
              size="lg"
              type="text"
              {...register("heading", {
                required: "Model Name is Required",
              })}
            />
            {errors.heading && (
              <span className="text-red-500">{errors.heading.message}</span>
            )}
          </div>
          <div className="relative">
            <label className="absolute mx-2 px-2 -top-2 text-sm text-blue-500 bg-gray-200">
              Car Image
            </label>
            <input
              labe="image"
              type="file"
              className="w-full py-2 bg-gray-200  border rounded-md cursor-text border-gray-400
               focus:outline-none focus:border-2 focus:border-blue-500"
              {...register("image", {
                required: "Photo is Required",
              })}
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>
        </div>
        <div className="px-5">
          <Textarea
            label="Desciption"
            className="w-full"
            {...register("description", {
              required: "Description is Required",
            })}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div className="flex justify-center pt-5 mb-5 ">
          <Button
            variant="outlined"
            type="submit"
            className="px-12 border-primary text-primary font-extrabold focus:ring-0"
          >
            Add Item
          </Button>
        </div>
      </form>
      <div>
        <h1 className="text-3xl font-bold text-primary ml-5 mt-5">Blog List</h1>
        <BlogLists blogData={blogData}/>
      </div>
    </div>
  );
};

export default AddBlog;
