import React, { useState } from 'react'
import Header from './components/pages/Header'
import ExploreMenu from './components/pages/ExploreMenu'
import FoodDisplay from './components/pages/FoodDisplay';
import AppDownload from './components/pages/AppDownload';


const Home = () => {
    const[category ,setcategory] = useState("All");
   
  return (
    <div className="!overflow-x-hidden container " >
    <Header/>
    <ExploreMenu category={category} setcategory={setcategory}/>
    <FoodDisplay  category={category}  />
    <AppDownload/>

    </div>
  )
}

export default Home

