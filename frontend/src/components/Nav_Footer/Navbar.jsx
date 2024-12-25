

import React, { useContext, useState } from 'react';
import { GiShoppingCart } from 'react-icons/gi';

import { BsSun, BsMoon } from 'react-icons/bs';
import { assets } from '../../assets/frontend_assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { StoreContext } from '../StoreContext/StoreContext';
import { useTheme } from '../StoreContext/ThemeProvider';
import { PiHandHeartFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ setLoginCheck }) => {
  const [iconDrop, setIconDrop] = useState(false);
  const navigate = useNavigate();
  const [active1, setActive] = useState('Home');
  const { cartItem, token, setToken } = useContext(StoreContext);
  const { isDarkTheme, toggleTheme } = useTheme();

  const isLogOut = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  return (
    <div className="div !mb-20 overflow-y-hidden">
    <nav className={` fixed overflow-y-hidden w-full top-0 z-[99999999] h-14 pt-1 ${isDarkTheme ? 'bg-dark text-white' : 'bg-slate-50 text-black shadow-lg' }`}>
      <div className="nav flex overflow-y-hidden container z-[999999999] mx-auto justify-between mt-1">
        <div className="logo">
          <figure className="figure">
            
            <Link to="/">
              <img src={assets.logo} className="figure-img img-fluid rounded" alt="logo" />
            </Link>
          </figure>
        </div>
        <div className="home_menu hidden md:visible md:flex pt-1">
          <ul className="flex gap-3 lg:gap-4 ">
            <li
              onClick={() => setActive('Home')}
              className={active1 === 'Home' ? `active border-b-2 h-7 cursor-pointer ${isDarkTheme ? 'border-white' : 'border-black'} ` : 'cursor-pointer'}
            >
              <NavLink to="/" style={{ textDecoration: 'none' }} className={`${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-black'}`}>
                Home
              </NavLink>
            </li>
            <li
              onClick={() => setActive('Menu')}
              className={active1 === 'Menu' ? `active border-b-2 h-7 cursor-pointer ${isDarkTheme ? 'border-white' : 'border-black'} ` : 'cursor-pointer'}
            >
              <a href="#menu" style={{ textDecoration: 'none' }} className={`${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-black'}`}>
              Menu
              </a>
              
            </li>
            <li
              onClick={() => setActive('Mobile-app')}
              className={active1 === 'Mobile-app' ? `active border-b-2 h-7 cursor-pointer ${isDarkTheme ? 'border-white' : 'border-black'} ` : 'cursor-pointer'}
            >
              <a href="#app_download" style={{ textDecoration: 'none' }} className={`${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-black'}`}>
                Mobile-app
              </a>
            </li>
            <li
              onClick={() => setActive('Contact')}
              className={active1 === 'Contact' ? `active border-b-2 h-7 cursor-pointer  ${isDarkTheme ? 'border-white' : 'border-black'} ` : 'cursor-pointer'}
            >
              <a href="" style={{ textDecoration: 'none' }} className={` ${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-black'}`}>
                Contact us
              </a>
            </li>
          </ul>
        </div>

        <div className="flex gap-3 lg:gap-4">
        <button onClick={toggleTheme} className="text-xl focus:outline-none relative bottom-3">
            {isDarkTheme ?' 🌞' : <BsMoon className="text-gray-700" />}
          </button>
         <Link to="/favorite" ><PiHandHeartFill className='top-2 relative w-6 h-6 cursor-pointer' /></Link> 

          
         
          <div className="relative">
            <Link to="/cart" className="cursor-pointer">
              <GiShoppingCart className="text-[24px] translate-y-2 z-10 cursor-pointer relative top-0.5 " />
            </Link>
            <span
              onClick={() => navigate('/cart')}
              className="h-5 w-5 top-0.5 left-2 absolute translate-y-[-7px] cursor-pointer"
            >
              {Object.keys(cartItem).length === 0 ? '' : Object.keys(cartItem).length}
            </span>
          </div>

          

          {!token ? (
            <button
              onClick={() => setLoginCheck(true)}
              type="button"
              className="border-1 text-center w-[70px] md:w-20 h-8 rounded-full hover:bg-neutral-200"
            >
              sign in
            </button>
          ) : (
            <>
             <CgProfile
                onMouseOver={() => setIconDrop(!iconDrop)}
                onClick={() => setIconDrop(!iconDrop)}
                src={assets.profile_icon}
                alt=""
                className="h-7 top-1 w-7 relative  cursor-pointer"
              />
             
              {iconDrop && (
                <div
                  onMouseOver={() => setIconDrop(true)}
                  onMouseOut={() => setIconDrop(false)}
                  className=" top-11 border-1 ml-9 fixed   bg-[#fff2ef] flex flex-col rounded-lg shadow-lg"
                >
                  <Link
                    to="/myorders"
                    className={`order1 flex  items-center gap-2 py-2 px-3 hover:text-red-600  content-center cursor-pointer no-underline ${isDarkTheme ? 'text-white' : 'text-black'}`}
                  >
                    <img src={assets.bag_icon} alt="order" className="h-5" />
                    <span className={`${isDarkTheme ? ' text-slate-600 hover:text-red-600' : ' text-black hover:text-red-600'} hover:text-red-600`}>Order</span>
                  </Link>
                  <hr className="m-0 border-t mx-3" />
                  <p
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                    onClick={isLogOut}
                  >
                    <img src={assets.logout_icon} alt="logout" className="h-5" />
                    <span className={`${isDarkTheme ? ' text-slate-600 hover:text-red-600' : ' text-black hover:text-red-600'} !hover:text-red-600`}>Logout</span>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
