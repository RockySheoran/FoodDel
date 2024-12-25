
import React from 'react';
import { assets } from '../assets/admin_assets/assets';
import { useTheme } from './StoreContext/ThemeProvider';
import { useState } from 'react';



const Navbar = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
 
  
  
  
  return (
    <div className="div w-full !mb-20 overflow-y-hidden ">
    <nav className={`navbar w-full  top-0  !fixed items-center z-[9999] px-4 !md:px-11 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="div flex justify-between w-full md:px-9">

      
      <img className="max-w-28 min-w-14" src={assets.logo} alt="logo" />
      <div className="flex items-center gap-4  ">
        <button onClick={toggleTheme} className="text-lg focus:outline-none">
          {isDarkTheme ? '🌞' : '🌙'}
        </button>
       
    
     
         
            
              <img
              
                src={assets.profile_image}
                alt=""
                className="h-6 relative  "
              />
             
       
          
          </div>
            </div>
    </nav>
    </div>
  );
};

export default Navbar;
