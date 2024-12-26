

import React from 'react';
import { useTheme } from '../StoreContext/ThemeProvider';

const Header = () => {
  const { isDarkTheme } = useTheme();

  return (
    <div
      className={`h-[250px] md:h-[75vh] sm:h-[60vh] w-full z-30 bg-cover bg-center content-center rounded-4 ${isDarkTheme ? 'text-white' : 'text-black'}`}
      style={{ backgroundImage: "url('/header_img.png')" }}
    >
      <div className="headerContent pl-8 md:pl-10 lg:pl-14 ">
        <h1 className={` text-2xl md:text-4xl lg:text-6xl lg:w-[520px] md:w-[320px] w-[200px] text-wrap pb-2 md:pb-3  ${isDarkTheme ? 'text-white' : 'text-slate-100'}`}>
          Order your favorite food here
        </h1>
        <h6 className={`pb-3 hidden md:block text-wrap text-lg w-[550px] lg:w-[800px] ${isDarkTheme ? 'text-gray-300' : 'text-white'}`}>
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
        </h6>
        <button
          type="button"
          className={`px-3 md:px-4 text-[10px] py-2  rounded-full ${isDarkTheme ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;

