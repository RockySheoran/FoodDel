import React, { useEffect, useState } from 'react'
import Navbar from './components/Nav_Footer/Navbar'
import {Routes,Route} from "react-router-dom"
import Home from './Home'
import Cart from './components/pages/Cart'
import PlaceOrder from './components/pages/PlaceOrder'
import Footer from './components/Nav_Footer/Footer'

import { ToastContainer, toast } from 'react-toastify';
import Register from './components/Navbar_Attribute_Page/Register'
import Login from './components/Navbar_Attribute_Page/Login'
import 'react-toastify/dist/ReactToastify.css';

import MyOrder from './components/pages/MyOrder'
import { useTheme } from './components/StoreContext/ThemeProvider'
import Fav_Item from './components/pages/Fav_Item'

import { ContactUs1 } from './components/pages/ContactUs1'
import Verify from './components/pages/Verify'


import MoveTop from './components/Functions/MoveTop'
import FeedbackForm from './components/Functions/FeedbackForm'









function App() {
  const { isDarkTheme } = useTheme();

  const [loginCheck,setLoginCheck ]  = useState(false);
  const [loginRegister,setloginRegister] = useState(false);

  const [autoCloseTime, setAutoCloseTime] = useState(3000); // Default autoClose time for desktop

  useEffect(() => {
    // Check the screen width and set autoClose time accordingly
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setAutoCloseTime(1000); // For mobile, set autoClose to 1000ms
      } else {
        setAutoCloseTime(2000); // For larger screens, set autoClose to 3000ms
      }
    };

    handleResize(); // Set the initial value based on the current screen size
    window.addEventListener('resize', handleResize); // Listen for screen resizing

    return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
  }, []);

 



  return (
    <div className={`${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-black'}`} >

    {loginCheck == true ?  !loginRegister  ? <Login loginCheck={loginCheck} setLoginCheck={setLoginCheck} loginRegister={loginRegister} setloginRegister={setloginRegister}/>
    : <Register loginCheck={loginCheck} setLoginCheck={setLoginCheck} loginRegister={loginRegister} setloginRegister={setloginRegister}/>
    :<> </>}
   
     {/* <ToastContainer 
        autoClose={3000}/> */}

<ToastContainer  autoClose={autoCloseTime}     />
    
        
    <Navbar setLoginCheck={setLoginCheck} />
    <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path='/cart'  element={<Cart loginCheck={loginCheck} setLoginCheck ={setLoginCheck}  />}/>
      <Route path='/order'  element={<PlaceOrder />}/>
      <Route path='/'  element={<Home/>}/>
      <Route path='/verify'  element={<Verify/>}/>
      <Route path='/myorders'  element={<MyOrder/>}/>
      <Route path='/favorite'  element={<Fav_Item/>}/>
      <Route path='/contactUs'  element={<ContactUs1/>}/>
      <Route path='/feedback'  element={<FeedbackForm/>}/>
      
      

    </Routes>
    <Footer/>
    <MoveTop/>

    
    </div>
  )
}

export default App
