// import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify';

// import axios from 'axios';

// const List = ({url}) => {
//   const [list,setaList] = useState([]);


//   const getList = async() =>{
//     const response = await axios.get(`${url}/api/food/list`);
//     // console.log(response.data.data[0].image)
//     if(response.status){
//       setaList(response.data.data);
//     }
//     else{
//       toast.error("Error")
//     }
//   }
//   useEffect(()=>{
//     getList();

//   },[])

//   // remove item
//   const removeItem =async(foodId) => {
//     const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
//     await getList();
//     if(response.status)
//     {
//       toast.success(response.data.message)
//     }
//     else{
//       toast.error("Error - Item not Remove")
//     }
//   }




//   return (
//     <>
//     <div className='list w-full mx-2    md:px-12  pt-14 '>
//       <h3>All Food list</h3>
//       <div className="cart_Item_Title  border-2   ">
//         <div className="cart_Header grid grid-cols-6 gap-0.5 border-b-2  px-1  ">
//           <p className='relative top-1'>Image</p>
//           <p className='col-span-2 relative top-1'>Name</p>
//           <p className='flex justify-end relative top-1 overflow-visible'>Category</p>
//           <p className='flex justify-end relative top-1 '>price</p>
//           <p className='flex justify-end pr-1 relative top-1'>Action</p>
          
//         </div>
//         {/* <hr className='w-full h-[2px] bg-slate-500 m-0' /> */}
//         <div className="cart_Item  " >
//           {
//             list.map((item,index) =>{
              
//               return(
//                 <>
//                 <div className="Items grid grid-cols-6 items-center py-1 px-1 border-t-2 border-b-2 content-center" key={index}>
//                   <img src={`${url}/images/`+item.image} alt={item.name}  className='h-12 w-12 content-fit'/>
//                    <p className='col-span-2 mx-2 text-[15px]'>{item.name}</p>
//                    <p className='flex justify-end overflow-visible'>{item.category}</p>
//                    <p className='flex justify-end'>${item.price}</p>
                  
//                    <p  className='cursor-pointer flex justify-end relative right-3  '><span onClick={() => removeItem(item._id)}>X</span></p>

                  

//                 </div>
//                 {/* <hr className='w-full h-[2px] bg-slate-500 m-0'  /> */}
//                 </>
//               )
              
//             })
//           }

//         </div>

        

//       </div>
      
      
//     </div>
//     </>
//   )
// }

// export default List

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTheme } from '../StoreContext/ThemeProvider';


const List = ({ url }) => {
  const { isDarkTheme } = useTheme();
  const [list, setaList] = useState([]);

  const getList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.status) {
      setaList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    getList();
  }, []);

  // Remove item
  const removeItem = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await getList();
    if (response.status) {
      toast.success(response.data.message);
    } else {
      toast.error("Error - Item not Removed");
    }
  };

  return (
    <div className={`list w-full mx-2 md:px-12 pt-14 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h3>All Food List</h3>
      <div className={`cart_Item_Title border-2 ${isDarkTheme ? 'border-gray-700' : 'border-gray-300'}`}>
        <div className={`cart_Header grid grid-cols-6 gap-0.5 border-b-2 px-1 ${isDarkTheme ? 'border-gray-700' : 'border-gray-300'}`}>
          <p className="relative top-1">Image</p>
          <p className="col-span-2 relative top-1">Name</p>
          <p className="flex justify-end relative top-1 overflow-visible">Category</p>
          <p className="flex justify-end relative top-1">Price</p>
          <p className="flex justify-end pr-1 relative top-1">Action</p>
        </div>
        <div className="cart_Item">
          {list.map((item, index) => (
            <div
              className={`Items grid grid-cols-6 items-center py-1 px-1 border-t-2 border-b-2 ${isDarkTheme ? 'border-gray-700' : 'border-gray-300'}`}
              key={item._id}
            >
              <img
                src={`${url}/images/` + item.image}
                alt={item.name}
                className="h-12 w-12 content-fit"
              />
              <p className="col-span-2 mx-2 text-[15px]">{item.name}</p>
              <p className="flex justify-end overflow-visible">{item.category}</p>
              <p className="flex justify-end">&#8377;{item.price*20}</p>
              <p
                className="cursor-pointer flex justify-end relative right-3"
                onClick={() => removeItem(item._id)}
              >
                <span>X</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
