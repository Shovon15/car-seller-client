import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

const BlogCard = ({ item, index }) => {
  const { image, description, heading, date } = item;
  const [showMore, setShowMore] = useState(false);

  const isEven = index % 2 === 0;

  return (
    <div className="min-h-max">
      <Card
        className={`flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        }  m-5 md:m-10`}
      >
        <CardHeader
          shadow={false}
          floated={true}
          className="w-full md:w-2/5 shrink-0 m-0 rounded-r-none my-auto"
        >
          <img src={image} alt="..." className="w-full h-3/5 object-cover" />
        </CardHeader>
        <CardBody>
          <div className="flex flex-col md:flex-row-reverse md:justify-between">
            <p className=" font-semibold">Post Data: {date}</p>
            <Typography
              variant="h4"
              color="red"
              className="uppercase mb-4 font-bold"
            >
              {heading}
            </Typography>
          </div>
          <div className="font-normal">
            {description.length >= 450 ? (
              <>
                {showMore
                  ? description
                  : `${description.substring(0, 450)} ....`}
                <div className="flex justify-end">
                  <div
                    onClick={() => setShowMore(!showMore)}
                    className="text-blue-500 cursor-pointer"
                  >
                    {showMore ? "show less" : "show more"}
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>{description}</p>
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BlogCard;
