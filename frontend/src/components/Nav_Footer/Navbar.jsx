import React, { useContext, useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { MdContactMail, MdOutlineLogin } from "react-icons/md";
import { BsSun, BsMoon } from "react-icons/bs";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../StoreContext/StoreContext";
import { useTheme } from "../StoreContext/ThemeProvider";
import { PiHandHeartFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import { IoHome } from "react-icons/io5";
import { useCookies } from "react-cookie";

const Navbar = ({ setLoginCheck }) => {
  const [iconDrop, setIconDrop] = useState(false);
  const navigate = useNavigate();
  const [active1, setActive] = useState("Home");
  const { cartItem, token, setToken } = useContext(StoreContext);
  const { isDarkTheme, toggleTheme } = useTheme();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const isLogOut = () => {
    localStorage.removeItem("token");
    setToken("");
    removeCookie("jwt");
    navigate("/");
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="div !mb-16 overflow-y-hidden">
      <nav
        className={` fixed overflow-y-hidden w-full top-0 z-[99999999] h-10 pt-1 ${
          isDarkTheme
            ? "bg-dark text-white"
            : "bg-slate-50 text-black shadow-lg"
        }`}>
        <nav
          className={`bg-gray-900 text-white overflow-y-hidden fixed top-0 left-0 w-full z-50 shadow-md ${
            isDarkTheme
              ? "bg-dark text-white"
              : "bg-slate-50 text-black shadow-lg"
          }`}>
          <div className="max-w-7xl mx-auto px-4  overflow-y-hidden flex justify-between items-center h-14">
            {/* Logo */}

            <div className="text-xl font-bold ">
              <figure className="figure relative top-2 ">
                <Link to="/" className={` ${isDarkTheme ?"text-white":'text-gray-700'}`}>
                  {/* <img
                    src={assets.logo}
                    className="figure-img  rounded !h-8 w-24 md:w-full pl-2 md:pl-1"
                    alt="logo"
                  /> */}
                  <h1 className={` ${isDarkTheme ? "" : "text-gray-700"} `}>
                    Food<span className="text-red-500">Del</span>
                  </h1>
                </Link>
              </figure>
            </div>

            {/* Desktop Menu */}
            <div className="home_menu hidden md:visible md:flex pt-1   space-x-6 relative top-1">
              <ul className="flex gap-2 lg:gap-0 lg:space-x-3  ">
                <li
                  onClick={() => setActive("Home")}
                  className={
                    active1 === "Home"
                      ? `active border-b-2 h-7 cursor-pointer ${
                          isDarkTheme ? "border-white" : "border-black"
                        } `
                      : "cursor-pointer"
                  }>
                  <NavLink
                    to="/"
                    style={{ textDecoration: "none" }}
                    className={`${
                      isDarkTheme ? "bg-dark text-white" : "bg-white text-black"
                    }`}>
                    Home
                  </NavLink>
                </li>
                <li
                  onClick={() => setActive("Menu")}
                  className={
                    active1 === "Menu"
                      ? `active border-b-2 h-7 cursor-pointer ${
                          isDarkTheme ? "border-white" : "border-black"
                        } `
                      : "cursor-pointer"
                  }>
                  <a
                    href="#menu"
                    style={{ textDecoration: "none" }}
                    className={`${
                      isDarkTheme ? "bg-dark text-white" : "bg-white text-black"
                    }`}>
                    Menu
                  </a>
                </li>
                <li
                  onClick={() => setActive("Mobile-app")}
                  className={
                    active1 === "Mobile-app"
                      ? `active border-b-2 h-7 cursor-pointer ${
                          isDarkTheme ? "border-white" : "border-black"
                        } `
                      : "cursor-pointer"
                  }>
                  <a
                    href="#app_download"
                    style={{ textDecoration: "none" }}
                    className={`${
                      isDarkTheme ? "bg-dark text-white" : "bg-white text-black"
                    }`}>
                    Mobile-app
                  </a>
                </li>
                <li
                  onClick={() => setActive("Contact")}
                  className={
                    active1 === "Contact"
                      ? `active border-b-2 h-7 cursor-pointer  ${
                          isDarkTheme ? "border-white" : "border-black"
                        } `
                      : "cursor-pointer"
                  }>
                  <Link
                    to="/contactUs"
                    style={{ textDecoration: "none" }}
                    className={` ${
                      isDarkTheme ? "bg-dark text-white" : "bg-white text-black"
                    }`}>
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            <div className=" gap-2 lg:gap-0 hidden md:visible md:flex  md:gap-4  lg:space-x-3 ">
              <button
                onClick={toggleTheme}
                className={`text-xl focus:outline-none relative ${
                  isDarkTheme ? "animate-spin-slow hover:scale-105" : ""
                }`}>
                {isDarkTheme ? " 🌞" : <BsMoon className="text-gray-700" />}
              </button>

              <Link to="/feedback">
                <VscFeedback className="top-1 relative w-6 h-6 cursor-pointer" />
              </Link>
              <Link to="/favorite">
                <PiHandHeartFill className="top-1 relative w-6 h-6 cursor-pointer" />
              </Link>

              <div className="relative overflow-visible">
                <Link to="/cart" className="cursor-pointer ">
                  <GiShoppingCart className="text-[24px] translate-y-2 overflow-visible z-[9999999999999999] cursor-pointer relative bottom-[2px]  " />
                </Link>
                <span
                  onClick={() => navigate("/cart")}
                  className={`h-5 w-5 top-[1.5px] left-2.5 absolute  overflow-visible  translate-y-[-7px] cursor-pointer z-[9999999]  ${
                    isDarkTheme ? " text-white" : "  text-black"
                  } `}>
                  {Object.keys(cartItem).length === 0 ? (
                    <span className="text-rose-700">!</span>
                  ) : (
                    Object.keys(cartItem).length
                  )}
                </span>
              </div>

              {!token ? (
                <button
                  onClick={() => setLoginCheck(true)}
                  type="button"
                  className={` text-center w-[70px] md:w-20 h-8  rounded-full  ${
                    isDarkTheme
                      ? "bg-gray-900 hover:bg-zinc-700 text-white"
                      : "bg-slate-300 hover:bg-slate-200 text-black hover:text-gray-800"
                  }`}>
                  sign in
                </button>
              ) : (
                <>
                  <CgProfile
                    onMouseOver={() => setIconDrop(!iconDrop)}
                    onClick={() => setIconDrop(!iconDrop)}
                    color={`${isDarkTheme ? "white" : "black"}`}
                    className="h-6 w-6  top-[1px] relative"
                  />

                  {iconDrop && (
                    <div
                      onMouseOver={() => setIconDrop(true)}
                      onMouseOut={() => setIconDrop(false)}
                      className=" top-11 border-1 right-8  fixed    bg-[#fff2ef] flex flex-col rounded-lg shadow-lg">
                      <Link
                        to="/myorders"
                        className={`order1 flex  items-center gap-2 py-2 px-3 hover:text-red-600  content-center cursor-pointer no-underline ${
                          isDarkTheme ? "text-white" : "text-black"
                        }`}>
                        <img
                          src={assets.bag_icon}
                          alt="order"
                          className="h-5"
                        />
                        <span
                          className={`${
                            isDarkTheme
                              ? " text-slate-600 hover:text-red-600"
                              : " text-black hover:text-red-600"
                          } hover:text-red-600`}>
                          Order
                        </span>
                      </Link>
                      <hr className="m-0 border-t mx-3" />
                      <p
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                        onClick={isLogOut}>
                        <img
                          src={assets.logout_icon}
                          alt="logout"
                          className="h-5"
                        />
                        <span
                          className={`${
                            isDarkTheme
                              ? " text-slate-600 hover:text-red-600"
                              : " text-black hover:text-red-600"
                          } !hover:text-red-600`}>
                          Logout
                        </span>
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden text-white focus:outline-none flex gap-2">
              <button
                onClick={toggleTheme}
                className={`text-xl focus:outline-none relative ${
                  isDarkTheme ? "animate-spin-slow hover:scale-105" : ""
                }`}>
                {isDarkTheme ? " 🌞" : <BsMoon className="text-gray-700" />}
              </button>
              <button
                className="md:hidden ml-1 text-white focus:outline-none"
                onClick={toggleMenu}>
                <FiAlignJustify
                  color={`${isDarkTheme ? "white" : "black"}`}
                  className="w-6 h-6 text-current"
                />
              </button>
            </div>
          </div>

          {/* Offcanvas Menu */}
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 md:hidden z-[50]`}>
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
              onClick={toggleMenu}>
              <FiX className={`w-6 h-6 text-current `} />
            </button>
            <div onClick={toggleMenu} className="mt-16 space-y-3 px-6 ">
              <NavLink
                to="/"
                style={{ textDecoration: "none" }}
                className={`block flex  gap-2 px-4 py-2 rounded ${
                  isDarkTheme ? "bg-dark text-white" : "bg-white text-black"
                }`}>
                <IoHome
                  color={` ${isDarkTheme ? "white" : " black "}`}
                  className="h-6 w-6 "
                />
                <span> Home</span>
              </NavLink>
              <NavLink
                to="/feedback"
                style={{ textDecoration: "none" }}
                className={`block flex  gap-2 px-4 py-2 rounded ${
                  isDarkTheme ? "bg-dark text-white" : "bg-white text-black"
                }`}>
                <VscFeedback
                  color={` ${isDarkTheme ? "white" : " black "}`}
                  className="h-6 w-6 "
                />
                <span> Feedback</span>
              </NavLink>

              <Link
                to="/favorite"
                className={`block flex  px-4 py-2 rounded no-underline ${
                  isDarkTheme ? "bg-dark text-white" : " bg-white text-black"
                }`}>
                <PiHandHeartFill className="w-6 h-6 mr-2" />{" "}
                <span> Favorites</span>
              </Link>
              <Link
                to="/cart"
                className={`block flex gap-2 px-4 py-2 rounded no-underline ${
                  isDarkTheme ? "bg-dark text-white" : " bg-white text-black"
                }`}>
                <GiShoppingCart
                  color={` ${isDarkTheme ? "white" : " black "}`}
                  className="h-6 w-6 "
                />
                <span className="flex gap-1">
                  Cart{" "}
                  {Object.keys(cartItem).length === 0 ? (
                    <span className="text-rose-700"> ( ! )</span>
                  ) : (
                    `( ${Object.keys(cartItem).length} )`
                  )}
                </span>
              </Link>
              <Link
                to="/contactUs"
                style={{ textDecoration: "none" }}
                className={`flex gap-2 ${
                  isDarkTheme ? "bg-dark text-white" : "bg-white text-black"
                } block flex gap-2 px-4 py-2 rounded no-underline`}>
                <MdContactMail
                  color={` ${isDarkTheme ? "white" : " black "}`}
                  className="h-5 w-5 relative  "
                />
                <span>Contact Us</span>
              </Link>

              {!token ? (
                <button
                  onClick={() => setLoginCheck(true)}
                  type="button"
                  className={` flex gap-2 block rounded py-2 px-3 w-full hover:bg-neutral-200${
                    isDarkTheme ? " bg-dark text-white" : " bg-white text-black"
                  }`}>
                  <MdOutlineLogin className="h-6 w-9" />
                  <span> Sign In</span>
                </button>
              ) : (
                <div className="div gap-3 flex flex-col ">
                  <Link
                    to="/myorders"
                    className={`order1 flex mb-0.5 items-center gap-2 py-2 px-3 hover:text-red-600 rounded content-center cursor-pointer no-underline ${
                      isDarkTheme
                        ? "bg-dark text-white"
                        : " bg-white text-black"
                    }`}>
                    <img src={assets.bag_icon} alt="order" className="h-5" />
                    <span
                      className={`${
                        isDarkTheme
                          ? " text-white hover:text-red-600"
                          : " text-black hover:text-red-600"
                      } hover:text-red-600`}>
                      Order
                    </span>
                  </Link>

                  <p
                    className={`flex items-center rounded gap-2 px-3 py-2 cursor-pointer ${
                      isDarkTheme
                        ? "bg-dark text-white"
                        : " bg-white text-black"
                    }`}
                    onClick={isLogOut}>
                    <img
                      src={assets.logout_icon}
                      alt="logout"
                      className="h-5"
                    />
                    <span
                      className={`${
                        isDarkTheme
                          ? " text-white hover:text-red-600"
                          : " text-black hover:text-red-600"
                      } !hover:text-red-600`}>
                      Logout
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Overlay */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black text-white bg-opacity-50 z-40 md:hidden"
              onClick={toggleMenu}></div>
          )}
        </nav>
      </nav>
    </div>
  )
};

export default Navbar;
