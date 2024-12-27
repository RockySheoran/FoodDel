
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../StoreContext/StoreContext.jsx';
import axios from 'axios';
import { useTheme } from '../StoreContext/ThemeProvider.jsx';


const Verify = () => {
  const query = new URLSearchParams(useLocation().search);
    const success = query.get("success");
    const orderId = query.get("orderId");

  // const [searchParams] = useSearchParams();
  // const success = searchParams.get('success');
  // const orderId = searchParams.get('orderId');
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();

  const verifyPayment = async () => {
    const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
    console.log(response);
    if (response.data.success) {
      navigate('/myorders');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div
      className={`verify min-h-[60vh] flex justify-center items-center ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <div
        className={`spinner w-[100px] h-[100px] border-5 rounded-full animate-spin ${isDarkTheme ? 'border-gray-700 border-t-red-500' : 'border-[#bdbdbd] border-t-red-700'}`}
      ></div>
    </div>
  );
};

export default Verify;
