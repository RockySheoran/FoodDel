

import React, { useEffect, useRef } from 'react';
import { menu_list } from '../../assets/frontend_assets/assets';
import "../../index.css";
import { useTheme } from '../StoreContext/ThemeProvider';


const ExploreMenu = ({ category, setcategory }) => {
  const scrollRef = useRef(null);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const scrollLoop = () => {
      if (scrollContainer) {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0; // Reset scroll
        } else {
          scrollContainer.scrollLeft += 1; // Increment scroll
        }
      }
    };

    const interval = setInterval(scrollLoop, 18); // Adjust scroll speed with interval
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container mx-auto p-4" id="menu">
        <h1 className={`font-bold ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>Explore our menu</h1>
        <p className={`my-3 lg:w-[700px] px-1 md:px-3 lg:px-4 ${isDarkTheme ? 'text-gray-300' : 'text-[#262626]'}`}>
          Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your craving
          and elevate your dining experience, one delicious meal at a time.
        </p>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 p-4"
          style={{ scrollbarWidth: "none", whiteSpace: "nowrap" }}
        >
          {[...menu_list, ...menu_list].map((dish, index) => {
            return (
              <div
                onClick={() => setcategory((pre) => (pre === dish.menu_name ? "All" : dish.menu_name))}
                key={index}
                className={`flex flex-col items-center flex-shrink-0 overflow-visible rounded-lg  ${isDarkTheme ? '' : 'bg-white'}`}
              >
                <img
                  src={dish.menu_image} 
                  alt={dish.menu_name}
                  className={
                    category === dish.menu_name
                      ? "active w-24 h-24 object-cover cursor-pointer rounded-full border-2 scale-125 border-red-800 z-20"
                      : "w-24 h-24 cursor-pointer object-cover rounded-full border-2 hover:scale-105"
                  }
                />
                <p className={`text-center mt-2 font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>{dish.menu_name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <hr className={`h-1 my-3 container ${isDarkTheme ? 'bg-gray-600' : 'bg-[#e2e2e2]'}`} />
    </>
  );
};

export default ExploreMenu;
