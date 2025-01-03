import React from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const MoveTop = () => {
  const MoveTopByClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      onClick={MoveTopByClick}
      className=" fixed bottom-3 right-1 sm:right-3 cursor-pointer ">
      <FaArrowCircleUp
        color="red"
        className=" sm:h-12 sm:w-12  size-8 z-[9999]"
      />
    </div>
  );
};

export default MoveTop;
