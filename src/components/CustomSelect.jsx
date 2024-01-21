import React, { useState } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { useBlogContext } from "../context/BlogContext";

function CustomSelect({ selectWidth, options }) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  //const [selectedOption, setSelectedOption] = useState("");
  const { selectedOption, setSelectedOption } = useBlogContext();

  const handleSelect = (value) => {
    if (!isSelectOpen) {
      setSelectedOption("");
    } else {
      setSelectedOption((prevValue) =>
        prevValue === value ? prevValue.toLowerCase() : value.toLowerCase()
      );
    }
    setIsSelectOpen(false);
    //console.log(selectedOption);
  };
  return (
    <div className="relative">
      <div
        className={`${selectWidth} px-2 h-8 relative border border-solid border-black`}
      >
        <h6
          className="font-semibold capitalize cursor-pointer flex"
          onClick={() => setIsSelectOpen(!isSelectOpen)}
        >
          <span>{selectedOption !== "" && selectedOption} </span>
          <FaArrowAltCircleDown className="absolute right-2 top-2" />
        </h6>
      </div>
      <ul
        className={
          isSelectOpen ? `absolute z-10 w-full p-0 m-0 left-0 top-8 ` : `hidden`
        }
      >
        {options &&
          options.map((option, index) => {
            return (
              <li
                key={option}
                className="bg-slate-800 text-white px-2 capitalize cursor-pointer border border-solid border-gray-400 hover:bg-slate-600"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default CustomSelect;
