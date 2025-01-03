import React from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { useTheme } from "../StoreContext/ThemeProvider";

const AppDownload = () => {
  const { isDarkTheme } = useTheme();

  return (
    <div
      className={`App_download text-center mb-5 ${
        isDarkTheme ? " text-white" : " text-black"
      }`}
      id="app_download">
      <p className="text-2xl overflow-y-hidden md:text-5xl mb-4">
        For Better Experience Download <br /> xyz App
      </p>
      <div className="logo_app_Download flex justify-center gap-6">
        <img
          src={assets.app_store}
          alt="App_Store"
          className="hover:cursor-pointer hover:scale-110 duration-150 w-40 md:w-56 lg:w-60"
        />
        <img
          src={assets.play_store}
          alt="Play_Store"
          className="hover:cursor-pointer hover:scale-110 duration-150 w-40 md:w-56 lg:w-60"
        />
      </div>
    </div>
  );
};

export default AppDownload;
