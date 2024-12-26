import React from "react";
import { useTheme } from "../StoreContext/ThemeProvider";

export const ContactUs1 = () => {
     const { isDarkTheme } = useTheme();
     const handleSumbit =(e) =>{
        e.preventDefault();
     }

  return (
    <div className={`container mx-auto mb-10 p-4${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

      {/* Wrapper for Form and Location */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Contact Form */}
        <div className={`flex-1  shadow-md rounded-lg p-6 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-black'} `}>
          <h2 className={`font-bold ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>Get in Touch</h2>
          <form className="space-y-4" onSubmit={handleSumbit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className ={`w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkTheme ? ' text-white bg-black ' : ' text-black bg-white'} `}              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className= {`w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkTheme ? ' text-white bg-black ' : ' text-black bg-white'} `}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Your Message"
                className= {`w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkTheme ? ' text-white bg-black ' : ' text-black bg-white'} `}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Location Map */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507501.3696061966!2d74.64818635204592!3d29.058775974852166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3912294dd39d9d8b%3A0x81b34b7c62af215d!2sHaryana%2C%20India!5e0!3m2!1sen!2sin!4v1616595767927!5m2!1sen!2sin"
            width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"
            title="Our Location"
            className="rounded-lg border border-gray-300"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

