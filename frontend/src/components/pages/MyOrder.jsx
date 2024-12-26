
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../StoreContext/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/frontend_assets/assets';
import { useTheme } from '../StoreContext/ThemeProvider';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';


const MyOrder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const { isDarkTheme } = useTheme();
const [loding,setLoding] = useState(false)


  const fetchOrders = async () => {
    const response = await axios.post(
      `${url}/api/order/userorders`,
      {},
      { headers: { token } }
    );
    if(response.data.success){
                setLoding(true);
                toast.success("Data fetched")
    setData(response.data.data);
    }else {
          toast.error("Error");
        }
    

  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className={`my-order mx-12 container ${isDarkTheme ? 'text-white' : 'text-black'}`}>
      <h2>My Order</h2>
     
      { !loding ?
          <div className="loading-div  container flex justify-center items-center">
                <ReactLoading type={'spin'} color={'red'} height={'100px'} width={'100px'} />
                </div>
          
          :
      <div className="container flex flex-col gap-5 mt-8 my-3 justify-center">
        {data.map((order, index) => {
          return (
            <div
              key={index}
              className={`my-orders grid lg:grid-cols-8 grid-cols-4 gap-2 lg:gap-8 border-2 px-2 items-center ${isDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-red-100 bg-white'}`}
            >
              <img src={assets.parcel_icon} alt="parcel" className="w-14" />
              <p className="col-span-2">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return `${item.name} x ${item.quantity}`;
                  } else {
                    return `${item.name} x ${item.quantity}, `;
                  }
                })}
              </p>
              <p>&#8377;{order.amount*20}.00</p>
              <p>Items: {order.items.length}</p>
              <p className="col-span-2">
                <span>&#x25cf;</span> <b className={`font-bold ${isDarkTheme ? 'text-gray-300' : 'text-[#454545]'}`}>{order.status}</b>
              </p>
              <button
                onClick={fetchOrders}
                className={`relative bottom-1 text-[10px] md:text-xl border-2 rounded-md h-8 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-red-200 text-black'}`}
              >
                Track order
              </button>
            </div>
          );
        })}
      </div>
}
    </div>
  );
};

export default MyOrder;
