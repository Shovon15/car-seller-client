import React from "react";

const PrimaryButton = ({ className, children }) => {
  return (
    <button
      className={`${className} bg-blue-500 rounded-md px-3 py-2 text-white font-bold `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
