import React, { useContext } from "react";
import { StoreContext } from "../StoreContext/StoreContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../StoreContext/ThemeProvider";

const Cart = ({ loginCheck, setLoginCheck }) => {
  const {
    cartItem,
    removeCart_Item,
    food_list,
    totalCartItemPrice,
    url,
    token,
  } = useContext(StoreContext);
  const { isDarkTheme } = useTheme();

  const oncheckItem = () => {
    if (Object?.keys(cartItem).length <= 0 && token) {
      toast.warning("Cart is empty");
    }
    if (!token) {
      setLoginCheck(true);
    }
  };

  return (
    <div
      className={`Cart container my-4 ${
        isDarkTheme ? "text-white" : "text-black"
      }`}>
      <div className="cart_Item_Title p-0 md:p-3 lg:p-9">
        <div className="cart_Header  grid gap-0.5">
          <p>Items</p>
          <p className="col ml-1">Title</p>
          <p className="flex justify-end overflow-visible mr-0.5">Prices</p>
          {window.innerWidth < 600 ? (
            <p className="flex justify-end">Quan</p>
          ) : (
            <p className="flex justify-end ">Quantity</p>
          )}

          <p className="flex justify-end pr-.5">Total</p>
          <p className="flex justify-end overflow-visible">Remove</p>
        </div>
        <hr
          className={`w-full h-[2px] ${
            isDarkTheme ? "bg-gray-500" : "bg-slate-500"
          }`}
        />
        <div className="cart_Item">
          {food_list.map((item, index) => {
            if (cartItem[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="Items grid grid-cols-6 items-center">
                    <img
                      src={`${url}/images/${item.image}`}
                      alt={item.name}
                      className="h-16 w-16 content-fit"
                    />
                    <p className="col-span-1 mx-2 text-[15px]">{item.name}</p>
                    <p className="flex justify-end">&#8377;{item.price * 20}</p>
                    <p className="flex justify-end mr-2">
                      {cartItem[item._id]}
                    </p>
                    <p className="flex justify-end">
                      &#8377;{cartItem[item._id] * item.price * 20}
                    </p>
                    <p
                      onClick={() => removeCart_Item(item._id)}
                      className="cursor-pointer flex justify-end">
                      X
                    </p>
                  </div>
                  <hr
                    className={`w-full h-[2px] ${
                      isDarkTheme ? "bg-gray-500" : "bg-slate-500"
                    }`}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="Cart_Total grid grid-cols-1 md:grid-cols-2 px-3">
        <div className="Promo_code my-4">
          <p>If you have a promo code, enter it here</p>
          <div className="code">
            <input
              type="text"
              className={`rounded-s-md h-8 pl-2 ${
                isDarkTheme
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-slate-400 text-black placeholder-slate-300"
              }`}
              placeholder="Promo code"
            />
            <button
              type="button"
              className={`px-2.5 rounded-e-md h-8 ${
                isDarkTheme ? "bg-gray-800 text-white" : "bg-black text-white"
              }`}>
              Submit
            </button>
          </div>
        </div>
        <div className="payment px-2">
          <h3>Cart Total</h3>
          <hr
            className={`w-full h-[2px] ${
              isDarkTheme ? "bg-gray-500" : "bg-slate-500"
            }`}
          />
          <div className="subtotal flex justify-between">
            <p>Item Count</p>
            <p className="mr-4">{Object.keys(cartItem).length}</p>
          </div>
          <hr
            className={`w-full h-[2px] ${
              isDarkTheme ? "bg-gray-500" : "bg-slate-500"
            }`}
          />
          <div className="subtotal flex justify-between">
            <p>SubTotal</p>
            <p className="mr-4">&#8377;{totalCartItemPrice() * 20}</p>
          </div>
          <hr
            className={`w-full h-[2px] ${
              isDarkTheme ? "bg-gray-500" : "bg-slate-500"
            }`}
          />
          <div className="subtotal flex justify-between">
            <p>Delivery Fee</p>
            <p className="mr-4">&#8377;40</p>
          </div>
          <hr
            className={`w-full h-[2px] ${
              isDarkTheme ? "bg-gray-500" : "bg-slate-500"
            }`}
          />
          <div className="subtotal flex justify-between">
            <p>Total</p>
            <p className="mr-4">
              &#8377;
              {totalCartItemPrice() !== 0 ? totalCartItemPrice() * 20 + 40 : 0}
            </p>
          </div>
          <hr
            className={`w-full h-[2px] ${
              isDarkTheme ? "bg-gray-500" : "bg-slate-500"
            }`}
          />
          <div className="b mr-3 flex justify-end">
            <Link
              to={Object.keys(cartItem).length > 0 && token ? "/order" : ""}
              onClick={oncheckItem}
              type="button"
              className="bg-red-600 px-2 py-1 rounded-lg text-white hover:bg-red-400 hover:text-slate-100"
              style={{ textDecoration: "none" }}>
              PROCESS TO CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
