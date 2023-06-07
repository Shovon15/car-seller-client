import React from "react";
import BlogCard from "./BlogCard";
import { useQuery } from "@tanstack/react-query";

const Blogs = () => {
  const { data: blogData = [], isLoading } = useQuery({
    queryKey: ["bolgData"],
    queryFn: async () => {
      const res = await fetch("https://y-shovon15.vercel.app/blogs");
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="min-h-max">
      {blogData.map((item, index) => (
        <BlogCard key={index} index={index} item={item} />
      ))}
    </div>
  );
};

export default Blogs;
