import { createContext, useEffect, useState } from "react";
import { food_list } from "../../assets/frontend_assets/assets";
import { use } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const  StoreContext = createContext(null);

 const StoreContextProvider = (props) => {
    const[cartItem ,setCartItem ] = useState({});
    const [fav,setFav] = useState({});
    
    const url = "https://fooddel-backend3.onrender.com";


    const [token ,setToken ] = useState("");
    const [food_list , setFoodList] = useState([]);
    const [cartNumber,setCartNumber] = useState(0);

   

    // const addCart_Item = async(itemId) => {
    //     if(!cartItem[itemId]){
    //         setCartItem( (pre)=> ({...pre , [itemId]:1}) );
    //     }
    //     else{
    //         setCartItem( (pre)=> ({...pre , [itemId]:pre[itemId]+1}));
    //     }
    
       
    //     if(token){
    //         // console.log(token)
    //         // console.log(itemId)
    //         await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    //     }
    // }
    // remove the item
    // const removeCart_Item = async(itemId) => {
       
    //     setCartItem((pre) => {
    //         // Only decrement if the quantity is greater than 0
    //         if (pre[itemId] > 0) {
    //           return { ...pre, [itemId]: pre[itemId] - 1 };
    //         } else {
    //           // If quantity is already 0, return the cart as is
    //           return pre;
    //         }
    //     });
    //     if(token){
    //         await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    //     }
    // }

    const addCart_Item = async (itemId) => {
        setCartItem((prevCart) => {
          const updatedCart = { ...prevCart, [itemId]: (prevCart[itemId] || 0) + 1 };
      
          // Remove items with 0 quantity
          const filteredCart = Object.fromEntries(
            Object.entries(updatedCart).filter(([_, qty]) => qty > 0)
          );
      
          return filteredCart;
        });
        toast.info("Item add to cart")
      
        if (token) {
          await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
      };
      
      const removeCart_Item = async (itemId) => {
        setCartItem((prevCart) => {
          const updatedCart = {
            ...prevCart,
            [itemId]: (prevCart[itemId] || 0) - 1,
          };
      
          // Remove items with 0 quantity
          const filteredCart = Object.fromEntries(
            Object.entries(updatedCart).filter(([_, qty]) => qty > 0)
          );
      
          return filteredCart;
        });
        toast.warning("Item remove to cart")
      
        if (token && cartItem[itemId] > 0) {
          await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
      };

      

  
   const loadCartData = async(token) =>{
    const response  =  await axios.post (url+"/api/cart/get",{},{headers:{token}})
    // console.log(response.data.cartData)
    // setCartItem(response.data.cartData);
    setCartItem(() => {
        const updatedCart = response.data.cartData;
    
        // Remove items with 0 quantity
        const filteredCart = Object.fromEntries(
          Object.entries(updatedCart).filter(([_, qty]) => qty > 0)
        );
    
        return filteredCart;
      });
   
   }


      const totalCartItemPrice = () => {
        let totalAmount = 0;
    
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
    
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItem[item];
                } else {
                    console.warn(`Item with ID ${item} not found in food_list.`);
                }
            }
        }
    
        return totalAmount;
    };
       // get food from backend

       const getFoodData  =  async() =>{
        const response  = await axios.get(url+"/api/food/list");
           setFoodList(response.data.data);
          
       }
      //  console.log(food_list)
      //  console.log(cartItem);
       

      // add favorite   icon

      const add_Fav_item = async (itemId) =>{
        setFav((pre) =>{
          const favItem = {...pre,[itemId]:(pre[itemId] || 0) + 1 };
 
           const filterItem_Fav = Object.fromEntries(
            Object.entries(favItem).filter(([_, qty]) => qty > 0)
          )  ;
          return filterItem_Fav;


        })
        toast.success("fav item add successful")
        if (token) {
          await axios.post(url + "/api/favorite/addFav", { itemId }, { headers: { token } });
        }

      }
       
      const remove_Fav_item = async (itemId) =>{
        setFav((pre) =>{
          const favItem = {...pre,[itemId]:(pre[itemId] || 0) - 1 };
 
           const filterItem_Fav = Object.fromEntries(
            Object.entries(favItem).filter(([_, qty]) => qty > 0)
          )  ;
          return filterItem_Fav;


        })
        toast.warning("UnFavorite  successful")
        if (token && fav[itemId] > 0) {
          await axios.post(url + "/api/favorite/remFav", { itemId }, { headers: { token } });
        }
      }

       // find fev
       const load_Fav_Data = async(token) =>{
        const response  =  await axios.post (url+"/api/favorite/getFav",{},{headers:{token}})
        // console.log(response.data.cartData)
        // setCartItem(response.data.cartData);
        setFav(() => {
            const updatedCart = response.data.favData;
        
            // Remove items with 0 quantity
            const filteredCart = Object.fromEntries(
              Object.entries(updatedCart).filter(([_, qty]) => qty > 0)
            );
        
            return filteredCart;
          });
       
       }
    


       useEffect(() =>{
        async function loadData() {
            await getFoodData();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
                await load_Fav_Data(localStorage.getItem("token")); 
            }
        }
        loadData();
       
       },[])
 


    const ContextValue = {food_list,
        cartItem,
        setCartItem,
        addCart_Item,
        removeCart_Item,
        totalCartItemPrice,
        url,
        token,setToken,
        cartNumber,
        add_Fav_item,
        remove_Fav_item,
        fav,
        setFav,

    }

    return (
        <StoreContext.Provider value={ContextValue} >
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider;
