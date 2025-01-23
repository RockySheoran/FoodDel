import React from "react";
import { createContext, useEffect, useState } from "react";
import { food_list } from "../../assets/frontend_assets/assets";

import axios from "axios";
import { toast } from "react-toastify";
import { MdFavorite, MdShoppingCartCheckout } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [fav, setFav] = useState({});
  const [loading, setLoading] = useState(false);

  // const url = "https://fooddel-backend3.onrender.com";
  // const url = "http://localhost:5000";
  const url =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : " https://fooddel-backend3.onrender.com";

  console.log("API URL:", url);

  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [cartNumber, setCartNumber] = useState(0);

  const addCart_Item = async (itemId) => {
    setCartItem((prevCart) => {
      const updatedCart = {
        ...prevCart,
        [itemId]: (prevCart[itemId] || 0) + 1,
      };

      // Remove items with 0 quantity
      const filteredCart = Object.fromEntries(
        Object.entries(updatedCart).filter(([_, qty]) => qty > 0)
      );

      return filteredCart;
    });
    toast.info(
      <span className="flex gap-0.5">
        Item <IoMdAdd className="relative top-1" /> to{" "}
        <MdShoppingCartCheckout className="inline-block relative top-1 text-lg" />
      </span>
    );

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeCart_Item = async (itemId) => {
    setCartItem((prevCart) => {
      const updatedCart = {
        ...prevCart,
        [itemId]: (prevCart[itemId] || 0) - 1,
      };

      // Remove items with 0 quantity
      const filteredCart = Object.fromEntries(
        Object.entries(updatedCart).filter(([_, qty]) => qty > 0)
      );

      return filteredCart;
    });
    toast.warning(
      <span className="flex gap-1">
        Item <CiCircleRemove className="relative top-1" /> to{" "}
        <MdShoppingCartCheckout className="inline-block relative top-1 text-lg" />
      </span>
    );

    if (token && cartItem[itemId] > 0) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    // console.log(response.data.cartData)
    // setCartItem(response.data.cartData);
    setCartItem(() => {
      const updatedCart = response.data.cartData;
      // console.log(updatedCart)

      // Remove items with 0 quantity
      const filteredCart = Object?.fromEntries(
        Object?.entries(updatedCart)?.filter(([_, qty]) => qty > 0)
      );

      return filteredCart;
    });
  };

  const totalCartItemPrice = () => {
    let totalAmount = 0;

    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        } else {
          console.warn(`Item with ID ${item} not found in food_list.`);
        }
      }
    }

    return totalAmount;
  };
  // get food from backend

  const getFoodData = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
    setLoading(true);
  };
  //  console.log(food_list)
  //  console.log(cartItem);

  // add favorite   icon

  const add_Fav_item = async (itemId) => {
    setFav((pre) => {
      const favItem = { ...pre, [itemId]: (pre[itemId] || 0) + 1 };

      const filterItem_Fav = Object.fromEntries(
        Object.entries(favItem).filter(([_, qty]) => qty > 0)
      );
      return filterItem_Fav;
    });
    toast.success(
      <span className="flex gap-0.5 ">
        {" "}
        <MdFavorite className="relative top-1 " /> item add
      </span>
    );
    if (token) {
      await axios.post(
        url + "/api/favorite/addFav",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const remove_Fav_item = async (itemId) => {
    setFav((pre) => {
      const favItem = { ...pre, [itemId]: (pre[itemId] || 0) - 1 };

      const filterItem_Fav = Object.fromEntries(
        Object.entries(favItem).filter(([_, qty]) => qty > 0)
      );
      return filterItem_Fav;
    });
    toast.warning(
      <span className="flex gap-0.5 ">
        {" "}
        <MdFavorite className="relative top-1 " /> item remove
      </span>
    );
    if (token && fav[itemId] > 0) {
      await axios.post(
        url + "/api/favorite/remFav",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // find fev
  const load_Fav_Data = async (token) => {
    const response = await axios.post(
      url + "/api/favorite/getFav",
      {},
      { headers: { token } }
    );
    // console.log(response.data.cartData)
    // setCartItem(response.data.cartData);
    setFav(() => {
      const updatedCart = response.data.favData;

      // Remove items with 0 quantity
      const filteredCart = Object.fromEntries(
        Object.entries(updatedCart).filter(([_, qty]) => qty > 0)
      );

      return filteredCart;
    });
  };

  useEffect(() => {
    async function loadData() {
      await getFoodData();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
        await load_Fav_Data(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const ContextValue = {
    food_list,
    cartItem,
    setCartItem,
    addCart_Item,
    removeCart_Item,
    totalCartItemPrice,
    url,
    token,
    setToken,
    cartNumber,
    add_Fav_item,
    remove_Fav_item,
    fav,
    setFav,
    loading,
    setLoading,
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
