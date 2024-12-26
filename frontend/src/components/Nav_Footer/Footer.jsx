
import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/frontend_assets/assets';
import { useTheme } from '../StoreContext/ThemeProvider';


const Footer = () => {
  const { isDarkTheme } = useTheme();

  return (
    <footer
      className={`Footer pt-2 content-center ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
      id="Footer"
    >
      <div className="footer_content container mt-5 grid grid-cols-2 md:grid-cols-3 content-center">
        <div className="footer_start gap-3 col-12 col-span-2 sm:col-span-1">
          <img src={assets.logo} className="mb-2" alt="logo" />
          <p className="lg:w-96 my-3 sm:w-56 w-80">
            Delicious meals delivered fast to your doorstep, ensuring freshness, quality, and ultimate convenience every time.
          </p>
          <div className="img flex gap-2.5 my-3">
            <img src={assets.facebook_icon} alt="facebook_icon" className="hover:cursor-pointer  bg-black rounded-full" />
            <img src={assets.linkedin_icon} alt="linkedin_icon" className="hover:cursor-pointer bg-black rounded-full" />
            <img src={assets.twitter_icon} alt="twitter_icon" className="hover:cursor-pointer bg-black rounded-full" />
          </div>
        </div>
        <div className="footer_Center sm:col-span-1 md:pl-8">
          <h4>COMPANY</h4>
          <ul className="flex flex-col gap-1 sm:gap-1.5">
            <li>
              <Link to="/" className={`hover:cursor-pointer  ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`} style={{ textDecoration: 'none' }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="" className={`hover:cursor-pointer  ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}style={{ textDecoration: 'none' }}>
                About
              </Link>
            </li>
            <li>
              <Link to="" className={`hover:cursor-pointer  ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}style={{ textDecoration: 'none' }}>
                Contact us
              </Link>
            </li>
            <li>
              <Link to=" " className={`hover:cursor-pointer  ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`} style={{ textDecoration: 'none' }}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer_end sm:col-span-1 md:pl-7">
          <h4>GET IN TOUCH</h4>
          <ul className="flex flex-col gap-1 mr-2 sm:gap-1.5">
            <li className=' w-60 mr-6 relative right-5   overflow-visible  '>+91 XXXXXXXXXX</li>
            <li className=' w-60 mr-6 relative right-5   overflow-visible '>contact@xyz.com</li>
          </ul>
        </div>
      </div>
      <hr className={`container w-max h-4 ${isDarkTheme ? 'border-gray-600' : 'border-gray-400'}`} />
      <div className="footer_copyright flex justify-center">
        <p className="flex gap-2 text-center sm:text-1.5xl text-[14px] md:text-2xl">
          Copyright 2024 © xyz.com All rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
