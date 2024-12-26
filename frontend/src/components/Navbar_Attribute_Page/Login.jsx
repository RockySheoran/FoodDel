


import React, { useState } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useContext } from 'react';
import { StoreContext } from '../StoreContext/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTheme } from '../StoreContext/ThemeProvider';
import { RxCross1 } from "react-icons/rx";

const Login = ({ setLoginCheck, loginCheck, setloginRegister, loginRegister }) => {
  const { url, setToken } = useContext(StoreContext);
  const { isDarkTheme } = useTheme();

  const [passShow, setpassShow] = useState({
    password: false,
  });

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const newUrl = `${url}/api/user/login`;

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setLoginCheck(false);
      toast.success('Login successful');
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div
      className={`login_Page flex overflow-y-hidden  absolute  items-center justify-center z-[9999999] h-screen w-screen bg-opacity-50 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <div
        className={`login_container fixed flex flex-col min-h-[500px] max-h-[700px] max-w-[500px] min-w-[350px] rounded-md shadow-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-slate-500'}`}
      >
        <div className={`login_Cross flex justify-between w-full content-center items-center px-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}`}>
          <h3>Login</h3>
          <RxCross1 onClick={() => setLoginCheck(!loginCheck)}
      
            className={`h-6 w-6 cursor-pointer  ${isDarkTheme ? ' text-white  ' : ' text-black'}  `}
          />
        </div>
        <form onSubmit={onLogin} className="p-4 flex flex-col">
          {/* Email */}
          <label htmlFor="email" className="relative py-1 left-2">
            Email id:
          </label>
          <input
            type="email"
            onChange={onchangeHandler}
            value={data.email}
            placeholder="Enter your Email"
            id="Email"
            name="email"
            required
            className={`ml-3 rounded-md px-0.5 h-7 w-full ${isDarkTheme ? ' text-white bg-black ' : ' text-black bg-white'}`}
          />

          {/* Password */}
          <label htmlFor="password" className="relative py-1 left-2">
            Password:
          </label>
          <div className="pass_In px-0.5 h-9">
            <input
              onChange={onchangeHandler}
              value={data.password}
              type={passShow.password ? 'text' : 'password'}
              name="password"
              placeholder="Enter your Password"
              id="Password"
              required
              className={`ml-3 px-0.5 h-7 w-full rounded ${isDarkTheme ? ' text-white bg-black ' : ' text-black bg-white'}`}
            />
         
              <span onClick={() => setpassShow({ ...passShow, password: !passShow.password })}  className='relative cursor-pointer z-100 bottom-[25px] left-[265px] text-2xl w-5  ' id='password'>{passShow.password == false? <IoEye />: <IoEyeOff />}</span>

          </div>

          {/* Checkbox */}
          <div className="check_Box pl-3 flex pb-2">
            <input type="checkbox" className="mr-4 cursor-pointer" id="policy" required />
            <label htmlFor="policy" className="w-64">
              By continuing, I agree to the terms of use &{' '}
              <span className="text-red-800 cursor-pointer">Privacy Policy</span>
            </label>
          </div>
          <button type="submit" className={`rounded-md py-1 hover:scale-105 w-full ${isDarkTheme ? 'bg-red-500' : 'bg-red-400'}`}>
            Log In
          </button>
        </form>
        <p className="px-4 self-center">
          Create a new account?{' '}
          <span
            onClick={() => setloginRegister(!loginRegister)}
            className="text-red-800 cursor-pointer"
          >
            Click here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
