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
      title: "How often should I get my car serviced?",
      content:
        " It is generally recommended to have your car serviced every 6 months or every 5,000 to 7,500 miles, depending on the manufacturer's guidelines. Regular servicing helps ensure optimal performance, safety, and longevity of your vehicle.",
    },
    {
      title: "What type of oil should I use in my car?",
      content:
        "The type of oil your car requires depends on the engine and its specifications. Most modern cars use either conventional oil, synthetic oil, or a blend of the two. Refer to your car's owner's manual to determine the recommended oil type and viscosity for your specific vehicle.",
    },
    {
      title: " How often should I change my car's tires?",
      content:
        "Tire replacement intervals vary depending on several factors, such as tire type, driving conditions, and your driving habits. However, it is generally recommended to replace tires every 5 to 6 years or when the tread depth reaches 2/32 of an inch. Regularly inspect your tires for signs of wear and consider replacing them if necessary.",
    },
    {
      title: " How often should I replace my car's battery?",
      content:
        " On average, car batteries last between 3 to 5 years. However, battery lifespan can vary depending on factors such as climate, usage patterns, and maintenance. Regularly check your battery's health and have it tested if you experience any starting issues or notice signs of a weak battery.",
    },
    {
      title: "Difference Between SUV and Sedan",
      content:
        "A sedan is a type of car that has four wheels, four doors, and a low ground clearance while a sports utility vehicle (SUV) is a type of car that also has four wheels and four doors but has a high ground clearance. The sedan is the most common type of car, and it has been in the market since the early 20th century while the SUV is a very popular type of car which has been available since the 1930s. Sedans have three compartments; the engine compartment located at the front end, the cargo compartment at the rear end, and the passenger compartment while SUVs have two compartments; the engine compartment and a combined passenger and cargo compartment.",
    },
    {
      title: "What Is a Sedan and Its Features?",
      content:
        "A sedan is defined as a 4-door passenger car with a trunk that is separate from the passengers with a three-box body: the engine, the area for passengers, and the trunk. Throughout the generations, the definition of a sedan has been the same. Even after the many changes and facelifts in comparison to other car segments, it has continued to maintain its popularity as the flagship car for most automobile manufacturers with a large, growing demand base. Thus, facing a large amount of competition.",
    },
    {
      title: "How Reliable is Mazda 2023?",
      content:
        "Mazda Motor Corporation is based out of Japan and, while some auto companies produce several different brands under their ownership umbrella, Mazda only offers the Mazda brand. The Mazda lineup includes nine models: four crossovers/SUVs, one sedan, one hatchback, two sports cars and one electric vehicle. Mazda is a competitor of Toyota, Honda, Hyundai and Kia, and the brand is known for being affordable, safe and also offering several fuel efficient models. How reliable is Mazda? The reliability of each car could be determined by several factors. Here’s what to know about the dependability and reliability of each vehicle in the brand’s lineup.",
    },
  ];
  const handleOpen = (value) => {
    setOpen(open === value ? "" : value);
    // console.log(value);
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
    <div id="faq" className="min-h-max py-5 px-5 md:px-10 ">
      <p className=" text-primary text-center  text-3xl md:text-5xl font-bold p-2">
        FAQ!
      </p>
      <div className="bg-white p-5 rounded-md">
        {items.map((item, index) => (
          <Accordion
            key={index}
            open={open === index}
            icon={<Icon id={index} open={open} />}
            animate={customAnimation}
          >
            <AccordionHeader onClick={() => handleOpen(index)}>
              {item.title}
            </AccordionHeader>
            <AccordionBody className="text-start text-md">
              {item.content}
            </AccordionBody>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
