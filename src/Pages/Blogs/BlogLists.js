import { Button, Card, Typography } from "@material-tailwind/react";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";
import { showErrorToast } from "../Shared/Toast/toaster";

const BlogLists = ({ blogData }) => {
  const TABLE_HEAD = [
    "No.",
    "Blog Heading",
    "Blog image",
    "Blog Date",
    "Edit",
    "Delete",
  ];
  return (
    <div>
      {blogData?.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="py-3 text-center text-xl font-bold">
            You have no Post yet! Please add items.
          </h1>
          <Link to="/dashboard/addItems">
            <Button className="btn btn-info font-bold flex">
              Add Items <GrAddCircle className="w-4 h-4 mx-2 text-white" />
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-start text-lg font-bold p-5 uppercase">
            You have posted Total {blogData.length}{" "}
            {blogData.length === 1 ? "post" : "posts"}
          </h1>

          <Card className="overflow-scroll h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {blogData.map((blog, i) => (
                  <tr key={i} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {i + 1}
                      </Typography>
                    </td>

                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {blog.heading}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <PhotoProvider>
                        <PhotoView src={blog.image}>
                          <img
                            src={blog.image}
                            alt="car"
                            className="cursor-pointer w-12 h-12 rounded-lg"
                          />
                        </PhotoView>
                      </PhotoProvider>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {blog.date}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue"
                        className="font-medium"
                      >
                        <Button
                          variant="outlined"
                          size="sm"
                          onClick={() =>
                            showErrorToast("Under Development !!!")
                          }
                          className="focus:ring-0"
                        >
                          Edit
                        </Button>
                      </Typography>
                    </td>
                    <td className="p-4">
                      <label
                        onClick={() => showErrorToast("Under Development !!!")}
                        // onClick={() => setDeletingPost(post)}
                        htmlFor="confirmation-modal"
                        className="btn btn-outline border-none text-red-600 hover:text-slate-100  hover:bg-red-600"
                      >
                        <FaTrashAlt className="w-6 h-6 cursor-pointer" />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}
    </div>
  );
};

export default BlogLists;
