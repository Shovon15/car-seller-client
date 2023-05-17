import { useState, Fragment } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export default function Faq() {
  const [open, setOpen] = useState(0);
  const items = [
    {
      title: "What is online accounting software?",
      content:
        "Online accounting software is sometimes called 'cloud-based software'.It allows users to create, store and send invoices from any device. YOu dont't need anythings saved on your computer, and there are no disks to load. Simply log in on a web browser and jump right into your Supershop online account. Your personal data and settings are right there, stored safely in 'the cloud'.",
    },
    {
      title: "What is online accounting software?",
      content:
        "Online accounting software is sometimes called 'cloud-based software'.It allows users to create, store and send invoices from any device. YOu dont't need anythings saved on your computer, and there are no disks to load. Simply log in on a web browser and jump right into your Supershop online account. Your personal data and settings are right there, stored safely in 'the cloud'.",
    },
    {
      title: "What is online accounting software?",
      content:
        "Online accounting software is sometimes called 'cloud-based software'.It allows users to create, store and send invoices from any device. YOu dont't need anythings saved on your computer, and there are no disks to load. Simply log in on a web browser and jump right into your Supershop online account. Your personal data and settings are right there, stored safely in 'the cloud'.",
    },
  ];
  const handleOpen = (value) => {
    setOpen(open === value ? "" : value);
    console.log(value);
  };

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? "rotate-45" : ""
        } h-7 w-7 transition duration-500 transform`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    );
  }

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  return (
    <div id="faq" className="min-h-max py-5 md:py-10 px-5 md:px-10 ">
      <p className="text-black  text-start md:text-center text-3xl md:text-5xl font-bold p-2">
        FAQ!
      </p>
      <>
        {items.map((item, index) => (
          <Accordion
            open={open === index}
            icon={<Icon id={index} open={open} />}
            animate={customAnimation}
          >
            <AccordionHeader onClick={() => handleOpen(index)}>
              {item.title}
            </AccordionHeader>
            <AccordionBody className="text-start">{item.content}</AccordionBody>
          </Accordion>
        ))}
      </>
    </div>
  );
}
