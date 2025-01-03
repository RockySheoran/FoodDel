import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../../../frontend/src/assets/frontend_assets/assets";
import { useTheme } from "../StoreContext/ThemeProvider";
import ReactLoading from "react-loading";

const Order = ({ url }) => {
  const { isDarkTheme } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loding, setLoding] = useState(false);

  const fetchAllOrder = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      toast.success("Data fetched");
      setLoding(true);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus,
      });
      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order status updated");
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      toast.error("Network error while updating status");
    }
  };

  return (
    <div
      className={`order add md:mx-11 mx-2 mt-11 ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}>
      <h3>Order Page</h3>

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
        <div className="order_list flex flex-col gap-3">
          {orders.map((order, index) => {
            return (
              <div
                key={index}
                className={`order-item grid pt-4 gap-2 xl:gap-4 px-2 border-2 ${
                  isDarkTheme
                    ? "border-gray-700 text-white"
                    : "border-slate-500"
                } text-[#505050] pr-2`}>
                <img src={assets.parcel_icon} alt="parcel icon" />
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ",";
                    }
                  })}
                </p>
                <div className="div">
                  <p className="order-item-name font-bold">
                    {order.address.FirstName + " " + order.address.LastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city +
                        ", " +
                        order.address.state +
                        ", " +
                        order.address.Country +
                        ", " +
                        order.address.zipCode}
                    </p>
                  </div>
                  <p className="order-item-phone">
                    {order.address.phoneNumber}
                  </p>
                </div>
                <p>Item: {order.items.length}</p>
                <p className="order-amount">&#8377;{order.amount * 20}</p>
                <select
                  name="status"
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className={`border-2 rounded-md ${
                    isDarkTheme
                      ? "bg-gray-800 border-gray-600 text-white"
                      : "bg-[#ffe8e4] border-red-200 text-black"
                  }`}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Order;
