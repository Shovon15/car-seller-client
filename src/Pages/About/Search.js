import React, { useEffect, useState } from "react";

const Search = ({ onSubmit }) => {
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");
  const [search, setSearch] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log(filteredProducts);
  console.log(search);

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit({ field1, field2, field3 });
    setSearch({ field1, field2, field3 });
  };
  useEffect(() => {
    fetch(
      `/api/products?field1=${search.field1}&field2=${search.field2}&field3=${search.field3}`
    )
      .then((res) => res.json())
      .then((data) => setFilteredProducts(data));
  }, [search]);

  //   const handleFilterSubmit = async (filterData, e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await fetch(
  //         `/api/products?field1=${filterData.field1}&field2=${filterData.field2}&field3=${filterData.field3}`
  //       );
  //       const data = await response.json();
  //       setFilteredProducts(data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Field 1:
        <input
          type="text"
          value={field1}
          onChange={(e) => setField1(e.target.value)}
        />
      </label>
      <label>
        Field 2:
        <input
          type="text"
          value={field2}
          onChange={(e) => setField2(e.target.value)}
        />
      </label>
      <label>
        Field 3:
        <input
          type="text"
          value={field3}
          onChange={(e) => setField3(e.target.value)}
        />
      </label>
      <button type="submit" className="bg-green-500 px-4 py-2">
        Filter
      </button>
    </form>
  );
};

export default Search;
