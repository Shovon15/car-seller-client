import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useUser from "../../hooks/useUser";
import { Spinner } from "@material-tailwind/react";
//
const AddItems = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    isLoading,
  } = useForm();
  const { user } = useContext(AuthContext);
  const [isUser] = useUser(user?.email);

  const navigate = useNavigate();
  const imageHostKey = process.env.REACT_APP_img_KEY;
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  const handleAddItems = (data) => {
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
          // if(isUser?.verify === 'undefined'){
          //     let verify= 'false'
          // }else{
          //    let verify = 'true'
          // }
          const items = {
            sellerName: isUser.name,
            sellerImage: isUser.image,
            sellerEmail: isUser.email,
            sellerVerification: isUser?.verify,
            date: currentDate,
            categoryName: data.category,
            modelName: data.modelName,
            image,
            color: data.color,
            mileage: data.mileage,
            price: data.price,
            condition: data.condition,
            phone: data.phone,
            location: data.location,
            purchaseYear: data.purchase_year,
            description: data.description,
          };
          saveItem(items);
        }
      });

    const saveItem = (items) => {
      fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(items),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("saveItem", data);
          // getUserToken(email);
          if (data.acknowledged) {
            toast.success("item added successfully");
            // data.reset();
            navigate("/dashboard/managePost");
          } else {
            toast.error(data.message);
          }
        });
    };
  };

  if (isLoading) {
    return <Spinner color="green" className="m-auto" />;
  }
  return (
    <div className="">
      <h2 className="text-2xl text-center font-bold text-orange-600 pt-5">
        Add Items
      </h2>
      <div className=" p-7 rounded-xl shadow-xl">
        <form
          onSubmit={handleSubmit(handleAddItems)}
          className="dark:text-slate-800"
        >
          <div className="grid grid-cols-1  md:grid-cols-2 mx-10">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Car Category</span>
              </label>
              <select
                {...register("category")}
                className="input input-bordered w-full max-w-xs"
              >
                <option value="suv">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="hatchback">Hatchback</option>
                <option value="coupe">Coupe</option>
                <option value="crossover">Crossover</option>
                <option value="wagon">Wagon</option>
                <option value="jeep">Jeep</option>
                <option value="sports car">Sports Car</option>
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Car Model</span>
              </label>
              <input
                type="text"
                {...register("modelName", {
                  required: "model name is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.modelName && (
                <p className="text-red-500">{errors.modelName.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Car image</span>
              </label>
              <input
                type="file"
                {...register("image", {
                  required: "Photo is Required",
                })}
                className="input input-bordered w-full max-w-xs py-2 "
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Car Color</span>
              </label>
              <input
                type="text"
                {...register("color", {
                  required: "color is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.color && (
                <p className="text-red-500">{errors.color.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Car mileage</span>
              </label>
              <input
                type="text"
                {...register("mileage", {
                  required: "mileage is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.mileage && (
                <p className="text-red-500">{errors.mileage.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Car Price</span>
              </label>
              <input
                type="text"
                {...register("price", {
                  required: "Price is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Condition</span>
              </label>
              <select
                {...register("condition")}
                className="input input-bordered w-full max-w-xs"
              >
                <option value="excellent">excellent</option>
                <option value="good">good</option>
                <option value="fair">fair</option>
              </select>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                {...register("phone", {
                  required: "phone number is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                {...register("location", {
                  required: "location  is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.location && (
                <p className="text-red-500">{errors.location.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Year of purchase</span>
              </label>
              <input
                type="text"
                {...register("purchase_year", {
                  required: "purchase year  is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.purchase_year && (
                <p className="text-red-500">{errors.purchase_year.message}</p>
              )}
            </div>
          </div>
          <div className="form-control w-full px-10 py-5">
            <label className="label">
              <span className="label-text">description</span>
            </label>
            <textarea
              type="text"
              {...register("description", {
                required: "description  is required",
              })}
              className="input input-bordered h-32 "
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="flex justify-center ">
            <input
              className="btn btn-outline dark:text-white hover:bg-cyan-700 hover:border-none px-20"
              value="add item"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
