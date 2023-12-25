import React, { useContext } from "react";
import { Context } from "../context/contextApi";
const LeftNavMenuItem = ({ text, icon, className, action }) => {
  const { enabled } = useContext(Context);
  return (
    <div
      className={
        `relative text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg ` +
        className
      }
      onClick={action}
    >
      <span className="text-xl mr-5">{icon}</span>
      {text}
    </div>
  );
};

export default LeftNavMenuItem;
