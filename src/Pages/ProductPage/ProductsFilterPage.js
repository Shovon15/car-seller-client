import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import axios from "axios";
import ProductCard from "../../Component/Card/ProductCard";
axios.defaults.baseURL = "http://localhost:5000/";

const ProductsFilterPage = () => {
  //   const products = useLoaderData();
  //   console.log(products, "products");
  const initialValues = {
    categoryName: "",
    modelName: "",
    modelYear: "",
    condition: "",
    color: "",
  };
  const [values, setValues] = useState(initialValues);
  const [services, setServices] = useState([]);
  const handleClick = () => {
    setValues(initialValues);
  };

  const handleInputChange = (e) => {
    // isLoading(true);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .post("search", values)
      .then((res) => {
        console.log(res.data, "res");
        setServices(res.data);
      })
      .catch((error) => {
        // console.log(error);
      });

    return () => values;
  }, [values]);
  //   console.log(values, "values");

  // const search = () => {
  //   console.log(values.categoryName);
  // };
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

  return (
    <div className="px-5 md:px-10">
      <h1 className="text-center font-bold text-2xl"> Filter</h1>

      <form className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center my-5 px-5">
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

        <Button type="button" onClick={handleClick}>
          Clear field
        </Button>
      </form>
      {services.length === 0 ? (
        <>
          <h1 className="text-center font-bold my-10">No product Available. Please change your filter options!</h1>
        </>
      ) : (
        <div className="grid md:grid-cols-4 gap-5 mb-5 md:mb-10">
          {services.map((item, i) => (
            <ProductCard product={item} key={i} />
          ))}
        </div>
      )}
     
    </div>
  );
};

export default ProductsFilterPage;
