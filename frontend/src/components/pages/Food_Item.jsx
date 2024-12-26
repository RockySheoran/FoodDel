

import React, { useContext } from 'react';
import "../../index.css";
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../StoreContext/StoreContext';
import { useTheme } from '../StoreContext/ThemeProvider';
import { MdOutlineCurrencyRupee } from "react-icons/md";

import { FaHeart, FaRegHeart } from "react-icons/fa6";

const Food_Item = ({ _id, name, image, category, description, price }) => {
  const { cartItem, addCart_Item, removeCart_Item, url ,add_Fav_item,remove_Fav_item,fav} = useContext(StoreContext);
  const { isDarkTheme } = useTheme();

  return (
    <div
      className={`card max-w-80 rounded-2xl sm:mx-auto hover:scale-[1.02] shadow-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
    >
      <div className="foodImg relative">
        <img
          src={`${url}/images/${image}`}
          alt="food-item"
          className="food_Image bg-cover hover:scale-[1.02] overflow-y-hidden"
        />
        <div className="fav-button absolute z-[9999]  right-3 top-3">
          {
            !fav[_id] ?  <FaRegHeart className='h-8 w-8 z-[1] ' onClick={() => add_Fav_item(_id)} />: <FaHeart onClick={() => remove_Fav_item(_id)} color="red " className='h-8 w-8 z-[1]' />
          }
     
       
        </div>
        <div className="addItem absolute right-3 bottom-3">
          {!cartItem[_id] ? (
            <img
              src={assets.add_icon_white}
              alt="addItem"
              className="h-10 w-10 cursor-pointer"
              onClick={() => addCart_Item(_id)}
            />
          ) : (
            <div
              className={`flex gap-2.5 rounded-full w-28 h-11 items-center justify-center ${isDarkTheme ? 'bg-gray-700' : 'bg-slate-400'}`}
            >
              <img
                src={assets.remove_icon_red}
                alt="dec"
                className="cursor-pointer"
                onClick={() => removeCart_Item(_id)}
              />
              <span>{cartItem[_id]}</span>
              <img
                src={assets.add_icon_green}
                alt="inc"
                className="cursor-pointer"
                onClick={() => addCart_Item(_id)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="Food_details p-3">
        <div className={`food_Name_Rating flex justify-between items-center mb-2 ${isDarkTheme ? 'text-gray-700' : 'text-[#343232]'}`}>
          <span className="font-bold text-lg">{name}</span>
          <img src="/rating_starts.png" alt="rating" className="h-4 w-[70px]" />
        </div>
        <p className={`description pb-0 mb-2 ${isDarkTheme ? 'text-gray-700' : 'text-[#676767]'}`}>{description}</p>
        <span className="text-red-500 text-[20px] font-medium">&#8377; {price*20}</span>
      </div>
    </div>
  );
};

export default Food_Item;
