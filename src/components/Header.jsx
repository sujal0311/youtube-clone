import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ytLogo from "../images/yt-logo.png";
import { CgProfile } from "react-icons/cg";
import ytblacklogo from "../images/ytb.jpeg";
import ytLogoMobile from "../images/yt-logo-mobile.png";
import { useAuth0 } from "@auth0/auth0-react";
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Context } from "../context/contextApi";
import Loader from "../shared/loader";
import Toggle from "./ToggleButton";

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, mobileMenu, setMobileMenu, enabled } = useContext(Context);

  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];
  return (
    <div
      className={`sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 ${
        !enabled ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      {loading && <Loader />}

      <div className="flex h-5 items-center">
        {pageName !== "video" && (
          <div
            className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
            onClick={mobileMenuToggle}
          >
            {mobileMenu ? (
              <CgClose className=" text-xl" />
            ) : (
              <SlMenu className=" text-xl" />
            )}
          </div>
        )}
        <Link to="/" className="flex h-5 items-center">
          <img
            className="h-full hidden md:block"
            src={enabled ? ytLogo : ytblacklogo}
            alt="Youtube"
          />
          <img
            className="h-full md:hidden mr-3 z-10"
            src={ytLogoMobile}
            alt="Youtube"
          />
        </Link>
      </div>
      <Toggle />
      <div className="group flex items-center">
        <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
            <IoIosSearch className="text-xl" />
          </div>
          <input
            type="text"
            className="bg-transparent outline-none w-32 pr-5 pl-5 md:pl-0  md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            placeholder="Search"
            value={searchQuery}
          />
        </div>
        <button
          className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <IoIosSearch className="text-xl" />
        </button>
      </div>
      <div className="flex items-center">
        <div className="hidden md:flex">
          <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <RiVideoAddLine className=" text-xl cursor-pointer" />
          </div>
          <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <FiBell className="text-xl cursor-pointer" />
          </div>
        </div>
        {!isAuthenticated ? (
          <button
            className="text-blue-600 mx-1 px-[1px] md:px-3 py-1 rounded-2xl border-2 border-blue-600 flex items-center"
            onClick={() => loginWithRedirect()}
          >
            <CgProfile />
            <div className="text-[12px] md:text-sm mx-1">Log in</div>
          </button>
        ) : (
          <>
            <button
              className="text-blue-600 text-[12px] md:text-sm mx-1 px-2 md:px-3 py-1 rounded-2xl border-2 border-blue-600"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Log Out
            </button>
            <div className=" hidden md:flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
              <img src={user.picture} />
            </div>
            <div className="">
              <p className="hidden md:block ml-1">{user.name}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
