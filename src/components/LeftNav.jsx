import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "../utils/constants";
import { Context } from "../context/contextApi";

const LeftNav = () => {
  const { selectedCategory, setSelectedCategory, mobileMenu, enabled } =
    useContext(Context);
  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
      case "home":
        setSelectedCategory(name);
        navigate("/");
        break;
      case "menu":
        return false;
      default:
        break;
    }
  };

  return (
    <div
      className={`md:block w-[240px] relative overflow-y-auto h-full py-4 ${
        !enabled ? "bg-white text-black" : "bg-black text-white"
      } ${mobileMenu ? "block" : "hidden"}`}
    >
      <div className="flex px-5 flex-col">
        {categories.map((item) => (
          <React.Fragment key={item.name}>
            <LeftNavMenuItem
              text={item.type === "home" ? "Home" : item.name}
              icon={item.icon}
              action={() => clickHandler(item.name, item.type)}
              className={`${
                selectedCategory === item.name
                  ? enabled
                    ? "bg-white/[0.10] hover:bg-white/[0.15]"
                    : "bg-black/[0.15] hover:bg-black/[0.2]"
                  : `hover:bg-${enabled ? "white/[0.15]" : "black/[0.2]"}`
              }`}
            />
            {item.divider && <hr className="my-5 border-white/[0.2]" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LeftNav;
