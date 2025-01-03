import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useTheme } from "../StoreContext/ThemeProvider";

import ReactLoading from "react-loading";

const List = ({ url }) => {
  const { isDarkTheme } = useTheme();
  const [list, setaList] = useState([]);
  const [loding, setLoding] = useState(false);

  const getList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.status) {
      setLoding(true);
      toast.success("Data fetched");

      setaList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    getList();
  }, []);

  // Remove item
  const removeItem = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await getList();
    if (response.status) {
      toast.success(response.data.message);
    } else {
      toast.error("Error - Item not Removed");
    }
  };

  return (
    <div
      className={`list w-full mx-2 md:px-12 pt-14 ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}>
      <h3>All Food List</h3>
      {!loding ? (
        <div className="loading-div  container flex justify-center items-center">
          <ReactLoading
            type={"spin"}
            color={"red"}
            height={"100px"}
            width={"100px"}
          />
        </div>
      ) : (
        <div
          className={`cart_Item_Title border-2 ${
            isDarkTheme ? "border-gray-700" : "border-gray-300"
          }`}>
          <div
            className={`cart_Header grid grid-cols-6 gap-0.5 border-b-2 px-1 ${
              isDarkTheme ? "border-gray-700" : "border-gray-300"
            }`}>
            <p className="relative top-1">Image</p>
            <p className="col-span-2 relative top-1">Name</p>
            <p className="flex justify-end relative top-1 overflow-visible">
              Category
            </p>
            <p className="flex justify-end relative top-1">Price</p>
            <p className="flex justify-end pr-1 relative top-1">Action</p>
          </div>
          <div className="cart_Item">
            {list.map((item, index) => (
              <div
                className={`Items grid grid-cols-6 items-center py-1 px-1 border-t-2 border-b-2 ${
                  isDarkTheme ? "border-gray-700" : "border-gray-300"
                }`}
                key={item._id}>
                <img
                  src={`${url}/images/` + item.image}
                  alt={item.name}
                  className="h-12 w-12 content-fit"
                />
                <p className="col-span-2 mx-2 text-[15px]">{item.name}</p>
                <p className="flex justify-end overflow-visible">
                  {item.category}
                </p>
                <p className="flex justify-end">&#8377;{item.price * 20}</p>
                <p
                  className="cursor-pointer flex justify-end relative right-3"
                  onClick={() => removeItem(item._id)}>
                  <span>X</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
