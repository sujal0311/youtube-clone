import React, { useContext } from "react";
import { Context } from "../context/contextApi";

const Toggle = () => {
  const { enabled, setEnabled } = useContext(Context);

  const handleToggle = () => {
    setEnabled(!enabled);
  };

  return (
    <div className="ml-2 flex relative lg:flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            readOnly
          />
          <div
            onClick={handleToggle}
            className={`w-11 h-6 z-12 bg-gray-200 rounded-full peer peer-focus:ring-green-300 border-[1px] border-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121213] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
              enabled ? "peer-checked:bg-red-600" : ""
            }`}
          ></div>
          <span
            className={`hidden lg:block ml-2 text-sm font-medium ${
              enabled ? "text-white" : "text-black"
            }`}
          >
            Dark mode
          </span>
        </label>
      </div>
    </div>
  );
};

export default Toggle;
