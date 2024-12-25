
import React from 'react';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Order from './component/sidebarPage/Order';
import Add_Item from './component/sidebarPage/Add_Item';
import List from './component/sidebarPage/List';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useTheme } from './component/StoreContext/ThemeProvider';



const App = () => {
  
  const { isDarkTheme } = useTheme();

  
  const url = 'http://localhost:4000';
  const [autoCloseTime, setAutoCloseTime] = useState(1000);

  useEffect(() => {
    // Adjust autoClose time based on screen size
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setAutoCloseTime(1000); // For mobile
      } else {
        setAutoCloseTime(2000); // For larger screens
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
    
      <ToastContainer autoClose={autoCloseTime} />
      <Navbar />
      <hr className={`my-0 ${isDarkTheme ? 'border-gray-700' : 'border-gray-300'}`} />
      <div className="app-content flex">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add_Item url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Order url={url} />} />
         
        </Routes>
      </div>
    </div>
  );
};

export default App;
