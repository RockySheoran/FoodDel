import React, { useContext } from "react";
import { useTheme } from "../StoreContext/ThemeProvider";
import { StoreContext } from "../StoreContext/StoreContext";
import Food_Item from "./Food_Item";

const Fav_Item = () => {
  const { food_list, fav } = useContext(StoreContext);
  const { isDarkTheme } = useTheme();

  return (
    <div
      className={`container   mb-20 text-center ${
        isDarkTheme ? "text-white" : "text-black"
      }`}
      id="food-display">
      <h1>Your Favorite Items</h1>
      <div className="food_Container gap-4 grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 my-6 justify-items-center md:grid-cols-3 mx-auto">
        {food_list.map((item, index) => {
          if (fav[item._id] > 0) {
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
  );
};

export default Fav_Item;
