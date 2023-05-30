import { Button, Input, Spinner } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ProductCard from "../../Component/Card/ProductCard";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/";

const SearchPage = () => {
  const initialValues = {
    categoryName: "",
    // modelName: "",
    condition: "",
    color: "",
  };
  const [values, setValues] = useState(initialValues);
  const [services, setServices] = useState([]);

  console.log(services);
  const handleInputChange = (e) => {
    // isLoading(true);
    setValues({ ...values, [e.target.name]: e.target.value });
    axios
      .post("search", values)
      .then((res) => {
        // console.log(res);
        setServices(res.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // const search = () => {
  //   console.log(values.categoryName);
  // };

  return (
    <div>
      <h1 className="text-center"> Search</h1>

      <form className="grid grid-cols-3 gap-4 items-center mx-10">
        <Input
          value={values.categoryName}
          onChange={handleInputChange}
          name="categoryName"
          label="categoryName"
        />
        <Input
          value={values.categoryName}
          onChange={handleInputChange}
          name="categoryName"
          label="categoryName"
        />
        <Input
          value={values.categoryName}
          onChange={handleInputChange}
          name="categoryName"
          label="categoryName"
        />
        {/* <input
          value={values.modelName}
          onChange={handleInputChange}
          name="modelName"
          label="modelName"
          placeholder="model name"
          className="border border-gray-500 w-96"
        /> */}
        <Input
          value={values.condition}
          onChange={handleInputChange}
          name="condition"
          label="condition"
        />
        <Input
          value={values.color}
          onChange={handleInputChange}
          name="color"
          label="color"
        />

        {/* <Button type="button" onClick={() => search()}>
          Submit
        </Button> */}
      </form>
      {services.length === 0 ? (
        <>
          <h1>No product found</h1>
        </>
      ) : (
        <div className="grid md:grid-cols-4 gap-5">
          {services.map((item, i) => (
            <ProductCard product={item} key={i} />
          ))}
        </div>
      )}
      <div className="flex flex-col justify-center items-center">
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
      </div>
    </div>
  );
};

export default SearchPage;
