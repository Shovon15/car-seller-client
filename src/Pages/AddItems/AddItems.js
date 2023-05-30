import React, { useContext } from "react";
import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useUser from "../../hooks/useUser";
import { Button, Input, Spinner, Textarea } from "@material-tailwind/react";
import OutlinedButton from "../../Component/Button/OutlinedButton";
import { toast } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../Shared/Toast/toaster";

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
          // if(isUser?.verify === 'undefined'){
          //     let verify= 'false'
          // }else{
          //    let verify = 'true'
          // }
          const items = {
            sellerName: isUser.name,
            sellerImage: isUser.image,
            sellerEmail: isUser.email,
            sellerVerification: isUser?.verify || "",
            date: currentDate,

            categoryName: data.category,
            image,
            modelName: data.modelName,
            modelYear: data.modelYear,
            color: data.color,
            condition: data.condition,
            carInfo: {
              fuelType: data.fuel,
              mileagePerl: data.mileagePerl,
              transmission: data.transmission,
              location: data.location,
              price: data.price,
              phone: data.phone,
              description: data.description,
              seatCapacity: data.seatCapacity,
            },
          };
          saveItem(items);
          // console.log(items, "items");
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
            showSuccessToast("item added successfully");
            // data.reset();
            navigate("/dashboard/managePost");
          } else {
            showErrorToast(data.message);
          }
        });
    };
  };

  if (isLoading) {
    return <Spinner color="green" className="m-auto" />;
  }

  const category = [
    "suv",
    "sedan",
    "crossover",
    "jeep",
    "sports car",
    "wagon",
    "coupe",
    "pickup",
  ];
  const condition = ["New", "Excellent", "Good", "Fiar"];
  const transmission = ["Automatic", "Manual", "CVT Transmissions"];
  const fuelType = ["Gasoline", "Diesel", "CNG", "Electric"];

  return (
    <div className="">
      <h2 className="text-2xl text-center font-bold text-black pt-5">
        Add Items
      </h2>
      <form onSubmit={handleSubmit(handleAddItems)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
          <div className="relative">
            <label className="absolute mx-2 px-2 -top-2 text-sm text-blue-500 bg-gray-200">
              Car Category
            </label>
            <select
              {...register("category", {
                required: "Category is Required",
              })}
              color="lightBlue"
              size="regular"
              placeholder="Select option"
              className="w-full py-2 bg-gray-200  border rounded-md cursor-text border-gray-400
               focus:outline-none focus:border-2 focus:border-blue-500"
            >
              {category.map((item, i) => (
                <option value={item} className="text-start" key={i}>
                  {item}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
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
          <div>
            <Input
              label="Car Model"
              size="lg"
              type="text"
              {...register("modelName", {
                required: "Model is Required",
              })}
            />
            {errors.modelName && (
              <span className="text-red-500">{errors.modelName.message}</span>
            )}
          </div>
          <div className="relative">
            <label className="absolute mx-2 px-2 -top-2 text-sm text-blue-500 bg-gray-200">
              Car Fuel Type
            </label>
            <select
              {...register("fuel", {
                required: "fuel type is Required",
              })}
              color="lightBlue"
              size="regular"
              placeholder="Select option"
              className="w-full py-2 bg-gray-200  border rounded-md cursor-text border-gray-400
               focus:outline-none focus:border-2 focus:border-blue-500"
            >
              {fuelType.map((item, i) => (
                <option value={item} className="text-start" key={i}>
                  {item}
                </option>
              ))}
            </select>
            {errors.fuel && (
              <p className="text-red-500">{errors.fuel.message}</p>
            )}
          </div>
          <div>
            <Input
              label="Car Mileage per Litter"
              size="lg"
              type="text"
              {...register("mileagePerl", {
                required: "Model is Required",
              })}
            />
            {errors.mileagePerl && (
              <span className="text-red-500">{errors.mileagePerl.message}</span>
            )}
          </div>

          {/* <div>
            <Input
              label="Car Mileage"
              size="lg"
              type="text"
              {...register("mileage", {
                required: "Mileage is Required",
              })}
            />
            {errors.mileage && (
              <span className="text-red-500">{errors.mileage.message}</span>
            )}
          </div> */}
          <div className="relative">
            <label className="absolute mx-2 px-2 -top-2 text-sm text-blue-500 bg-gray-200">
              Car Condition
            </label>
            <select
              {...register("condition", {
                required: "Condition is Required",
              })}
              color="lightBlue"
              size="regular"
              className="w-full py-2 bg-gray-200  border rounded-md cursor-text border-gray-400
               focus:outline-none focus:border-2 focus:border-blue-500"
            >
              {condition.map((item, i) => (
                <option value={item} className="text-start" key={i}>
                  {item}
                </option>
              ))}
            </select>
            {errors.condition && (
              <p className="text-red-500">{errors.condition.message}</p>
            )}
          </div>
          <div className="relative">
            <label className="absolute mx-2 px-2 -top-2 text-sm text-blue-500 bg-gray-200">
              Transmission Type
            </label>
            <select
              {...register("transmission", {
                required: "transmission type is Required",
              })}
              color="lightBlue"
              size="regular"
              className="w-full py-2 bg-gray-200  border rounded-md cursor-text border-gray-400
               focus:outline-none focus:border-2 focus:border-blue-500"
            >
              {transmission.map((item, i) => (
                <option value={item} className="text-start" key={i}>
                  {item}
                </option>
              ))}
            </select>
            {errors.transmission && (
              <p className="text-red-500">{errors.transmission.message}</p>
            )}
          </div>
          <div>
            <Input
              label="Location"
              size="lg"
              type="text"
              {...register("location", {
                required: "Location is Required",
              })}
            />
            {errors.location && (
              <span className="text-red-500">{errors.location.message}</span>
            )}
          </div>
          <div>
            <Input
              label="Car model Year"
              size="lg"
              type="text"
              {...register("modelYear", {
                required: "Car Model Year is Required",
              })}
            />
            {errors.modelYear && (
              <span className="text-red-500">{errors.modelYear.message}</span>
            )}
          </div>
          <div>
            <Input
              label="Car Color"
              size="lg"
              type="text"
              {...register("color", {
                required: "Color is Required",
              })}
            />
            {errors.color && (
              <span className="text-red-500">{errors.color.message}</span>
            )}
          </div>
          <div>
            <Input
              label="Car Seat Capacity"
              size="lg"
              type="number"
              {...register("seatCapacity", {
                required: "Car Seat Capacity is Required",
              })}
            />
            {errors.seatCapacity && (
              <span className="text-red-500">
                {errors.seatCapacity.message}
              </span>
            )}
          </div>
          <div>
            <Input
              label="Car Price"
              size="lg"
              type="text"
              {...register("price", {
                required: "Price is Required",
              })}
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>
          <div>
            <Input
              label="Phone"
              size="lg"
              type="text"
              {...register("phone", {
                required: "Phone is Required",
              })}
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone.message}</span>
            )}
          </div>
        </div>
        <div className="px-5">
          <Textarea
            label="Desciption"
            {...register("description", {
              required: "Description is Required",
            })}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div className="flex justify-center pt-5 mb-5 ">
          <Button variant="outlined" type="submit" className="px-12 border-primary text-primary font-extrabold focus:ring-0">Add Item</Button>
        </div>
      </form>
      
    </div>
  );
};

export default AddItems;
