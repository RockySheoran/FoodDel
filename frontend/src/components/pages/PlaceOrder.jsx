

import React, { useContext, useState } from 'react';
import { StoreContext } from '../StoreContext/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTheme } from '../StoreContext/ThemeProvider';


const PlaceOrder = () => {
  const { cartItem, totalCartItemPrice, token, food_list, url } = useContext(StoreContext);
  const { isDarkTheme } = useTheme();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    Country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    toast.success("Address submitted successfully!");

    let order_Item = [];
    food_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItem[item._id] };
        order_Item.push(itemInfo);
      }
    });

    const orderData = {
      address: formData,
      items: order_Item,
      amount: totalCartItemPrice() + 2,
    };

    const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
       console.log(response)
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleOrderSubmit}
      className={`place-order-page grid grid-cols-1 xl:grid-cols-2 container rounded-md min-h-fit lg:min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
    >
      <div className="flex items-center justify-center my-8">
        <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg w-full max-w-lg`}>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Delivery Address
          </h2>
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="Name-phone flex gap-3">
              <div>
                <label htmlFor="FistName" className="block mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="FistName"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  placeholder="Enter your First Name"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkTheme ? ' text-white bg-black ' : ' text-black bg-white'}`}
                  required
                />
              </div>

              <div>
                <label htmlFor="LastName" className="block mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="LastName"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  placeholder="Enter your Last Name"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkTheme ? ' text-white bg-black ' : ' text-black bg-white'}`}

                  required
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="emial-phone flex gap-3">
              <div>
                <label htmlFor="email" className="block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkTheme ? ' text-white bg-black ' : ' text-black bg-white'}`}

                  required
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkTheme ? ' text-white bg-black ' : ' text-black bg-white'}`}

                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="street" className="block mb-1">
                Address
              </label>
              <textarea
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Enter your address"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkTheme ? ' text-white bg-black ' : ' text-black bg-white'}`}

                rows="3"
                required
              ></textarea>
            </div>

            {/* City and State */}
            <div className="city-state flex gap-3">
              <div>
                <label htmlFor="city" className="block mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkTheme ? ' text-white bg-black ' : ' text-black bg-white'}`}

                  required
                />
              </div>

              <div>
                <label htmlFor="state" className="block mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter your state"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkTheme ? ' text-white bg-black ' : ' text-black bg-white'}`}

                  required
                />
              </div>
            </div>

            {/* ZIP and Country */}
            <div className="zip-country flex gap-3">
              <div>
                <label htmlFor="zipCode" className="block mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Enter your ZIP code"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkTheme ? ' text-white bg-black ' : ' text-black bg-white'}`}

                  required
                />
              </div>

              <div>
                <label htmlFor="Country" className="block mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="Country"
                  name="Country"
                  value={formData.Country}
                  onChange={handleChange}
                  placeholder="Enter your Country name"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkTheme ? ' text-white bg-black ' : ' text-black bg-white'}`}

                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Address
            </button>
          </div>
        </div>
      </div>

      <div className="right-div flex items-center mt-2 mb-10 justify-center">
        <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg w-full max-w-lg ml-auto`}>
          <h3>Cart Total</h3>
          <hr className={`w-full h-[2px] ${isDarkTheme ? 'bg-gray-500' : 'bg-slate-500'}`} />
          <div className="subtotal flex justify-between">
            <p>Item Count</p>
            <p className="mr-4">{Object.keys(cartItem).length}</p>
          </div>
          <hr className={`w-full h-[2px] ${isDarkTheme ? 'bg-gray-500' : 'bg-slate-500'}`} />
          <div className="subtotal flex justify-between">
            <p>SubTotal</p>
            <p className="mr-4">&#8377;{totalCartItemPrice()*20}</p>
          </div>
          <hr className={`w-full h-[2px] ${isDarkTheme ? 'bg-gray-500' : 'bg-slate-500'}`} />
          <div className="subtotal flex justify-between">
            <p>Delivery Fee</p>
            <p className="mr-4">&#8377;{totalCartItemPrice() !== 0 ? 40 : 0}</p>
          </div>
          <hr className={`w-full h-[2px] ${isDarkTheme ? 'bg-gray-500' : 'bg-slate-500'}`} />
          <div className="subtotal flex justify-between">
            <p>Total</p>
            <p className="mr-4">${totalCartItemPrice() !== 0 ? totalCartItemPrice()*20 + 40 : 0}</p>
          </div>
          <hr className={`w-full h-[2px] ${isDarkTheme ? 'bg-gray-500' : 'bg-slate-500'}`} />
          <div className="b mr-3 flex justify-end">
            <button
              type="submit"
              className="bg-red-600 px-2 py-1 rounded-lg text-white"
              style={{ textDecoration: 'none' }}
            >
              PROCESS TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
