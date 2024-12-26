
import React, { useContext, useState } from 'react';
import { StoreContext } from '../StoreContext/StoreContext';
import Food_Item from './Food_Item';
import { useTheme } from '../StoreContext/ThemeProvider';
import ReactLoading from 'react-loading';

const FoodDisplay = ({ category }) => {
  const { food_list,loading } = useContext(StoreContext);
  const { isDarkTheme } = useTheme();
 

  return (
    <>
    {
      loading == false ? 
      <div className="loading-div  container flex justify-center items-center">
      <ReactLoading type={'spin'} color={'red'} height={'15%'} width={'15%'} />
      </div>

      :
    
    <div className={`container mb-20 text-center ${isDarkTheme ? 'text-white' : 'text-black'}`} id="food-display">
      <h1>Top dishes near you</h1>
      <div className="food_Container gap-4 grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 my-6 justify-items-center md:grid-cols-3 mx-auto">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <Food_Item
                key={index}
                _id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                description={item.description}
                category={item.category}
              />
            );
          }
        })}
      </div>
    </div>
      }
      </>
  );
};

export default FoodDisplay;
