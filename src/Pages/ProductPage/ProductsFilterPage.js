import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import axios from "axios";
import ProductCard from "../../Component/Card/ProductCard";
import CardSkeleton from "../Shared/Skeleton/CardSkeleton";
axios.defaults.baseURL = "http://localhost:5000/";

const ProductsFilterPage = () => {
  const [limit, setLimit] = useState(10);
  const initialValues = {
    categoryName: "",
    modelName: "",
    modelYear: "",
    condition: "",
    color: "",
    // limit: limit,
  };
  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState(initialValues);
  const [services, setServices] = useState([]);

  const handleReset = () => {
    setValues(initialValues);
    setLimit(10);
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .post("search", { values, limit })
      .then((res) => {
        // console.log(res.data, "res");
        setServices(res.data);
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false after the request completes (either success or error)
      });

    return () => values;
  }, [values, limit]);

  const handleLoadMore = (e) => {
    // Increase the limit value
    setLimit(limit + 10);
    setValues({ ...values });
  };

  // console.log(services.length,limit);

  const category = [
    "",
    "suv",
    "sedan",
    "crossover",
    "jeep",
    "sports car",
    "wagon",
    "coupe",
    "pickup",
  ];

  // console.log(isLoading, "isLoading");

  return (
    <div className="px-5 md:px-10">
      <h1 className="text-center font-bold text-2xl text-primary pt-2">
        Available Products
      </h1>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 items-center my-5 md:px-5">
        <div className="relative">
          <label className="absolute mx-2 px-2 -top-2 text-sm text-blue-500 bg-gray-200">
            Category
          </label>
          <select
            onChange={handleInputChange}
            value={values.categoryName}
            name="categoryName"
            color="lightBlue"
            // size="regular"
            // placeholder="Select option"
            className="w-full py-2 bg-gray-200  border rounded-md cursor-text border-gray-400
             focus:outline-none focus:border-2 focus:border-blue-500"
          >
            {category.map((item, i) => (
              <option value={item} className="text-start " key={i}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <Input
          value={values.modelName}
          onChange={handleInputChange}
          name="modelName"
          label="Model Name"
        />
        <Input
          value={values.modelYear}
          onChange={handleInputChange}
          name="modelYear"
          label="Model Year"
        />

        <Input
          value={values.condition}
          onChange={handleInputChange}
          name="condition"
          label="Car condition"
        />
        <Input
          value={values.color}
          onChange={handleInputChange}
          name="color"
          label="color"
        />

        <Button
          variant="outlined"
          className="border-primary text-primary px-2"
          type="button"
          onClick={handleReset}
        >
          Reset
        </Button>
      </form>
      {isLoading === true ? (
        <>
          <CardSkeleton />
        </>
      ) : (
        <>
          {services.length === 0 ? (
            <>
              <h1 className="text-center font-bold my-10">
                No product Available. Please change your filter options!
              </h1>
            </>
          ) : (
            <>
              <div className="grid md:grid-cols-4 gap-5 mb-5 md:mb-10">
                {services.map((item, i) => (
                  <ProductCard product={item} key={i} />
                ))}
              </div>
              {services.length >= limit && (
                <div className="flex justify-center mb-10">
                  <Button
                    variant="outlined"
                    onClick={handleLoadMore}
                    className="px-12 border-primary border-2 text-primary focus:ring-0"
                  >
                    View more
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsFilterPage;
