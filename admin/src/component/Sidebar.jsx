

import React from 'react';
import { assets } from '../assets/admin_assets/assets';
import { NavLink } from 'react-router-dom';
import { FaListCheck } from 'react-icons/fa6';
import { useTheme } from './StoreContext/ThemeProvider';
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiFoodMenu } from "react-icons/bi";


const Sidebar = () => {
  const { isDarkTheme } = useTheme();

  return (
    <div className={`sidebar !min-w-[14%] xl:min-w-[18%] h-screen border-3 ${isDarkTheme ? 'border-gray-700 bg-gray-900 text-white' : 'border-[#a9a9a9] bg-white text-black'} border-t-0`}>
      <div className="sidebar_options pt-9 pl-[20%] flex flex-col gap-3">
        <NavLink
          to="/add"
          className={`min-h-10 px-1 lg:px-3 sidebar-option flex items-center no-underline gap-3 border-[2px] py-[7px] lg:py-[1px] cursor-pointer rounded-s-lg ${isDarkTheme ? 'focus:bg-gray-700 focus:border-e-red-500' : 'focus:bg-[#fff0ed] focus:border-e-red-700'} border-r-0`}
        >
     
          <IoIosAddCircleOutline  className="min-h-8  w-10 "/>
          <p className="hidden lg:block relative top-2">Add item</p>
        </NavLink>
        <NavLink
          to="/list"
          className={`sidebar-option min-h-10 px-1 lg:px-3 flex items-center no-underline gap-3 border-[2px] py-[7px] lg:py-[1px] cursor-pointer rounded-s-lg ${isDarkTheme ? 'focus:bg-gray-700 focus:border-e-red-500' : 'focus:bg-[#fff0ed] focus:border-e-red-700'} border-r-0`}
        >
          <FaListCheck className="min-h-6  w-10" />
          <p className="hidden relative top-2 lg:block">List Item</p>
        </NavLink>
        <NavLink
          to="/orders"
          className={`sidebar-option min-h-10 px-1 lg:px-3 flex items-center no-underline gap-3 border-[2px] py-[7px] lg:py-[1px] cursor-pointer rounded-s-lg ${isDarkTheme ? 'focus:bg-gray-700 focus:border-e-red-500' : 'focus:bg-[#fff0ed] focus:border-e-red-700'} border-r-0`}
        >
          <BiFoodMenu className="min-h-6  w-10" />
          <p className="hidden relative top-2 lg:block">Order</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

