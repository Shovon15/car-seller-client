import React, { useEffect, useState } from "react";
import { Users } from "./users";
import axios from "axios";
import Table from "./Table";
const Ex = () => {
  const [query, setQuery] = useState("");
  const keys = ["first_name", "last_name", "email"];
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  return (
    <div className="app">
      <input
        className="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      {/* <Table data={Search(Users)} /> */}
    </div>
  );
};

export default Ex;
