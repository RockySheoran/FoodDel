import React from "react"
import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { MdFavorite, MdShoppingCartCheckout } from "react-icons/md"
import { IoMdAdd } from "react-icons/io"
import { CiCircleRemove } from "react-icons/ci"
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({})
  const [fav, setFav] = useState({})
  const [loading, setLoading] = useState(false)

  const url =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://fooddel-backend-jmiz.onrender.com"

  console.log("API URL:", url)

  const [token, setToken] = useState("")
  const [food_list, setFoodList] = useState([])
  const [cartNumber, setCartNumber] = useState(0)

  const addCart_Item = async (itemId) => {
    setCartItem((prevCart) => {
      const updatedCart = {
        ...prevCart,
        [itemId]: (prevCart[itemId] || 0) + 1,
      }

      const filteredCart = updatedCart && Object.fromEntries(
        Object.entries(updatedCart).filter(([_, qty]) => qty > 0)
      )

      return filteredCart
    })
    toast.info(
      <span className="flex gap-0.5">
        Item <IoMdAdd className="relative top-1" /> to{" "}
        <MdShoppingCartCheckout className="inline-block relative top-1 text-lg" />
      </span>
    )

    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      )
    }
  }

  const removeCart_Item = async (itemId) => {
    setCartItem((prevCart) => {
      const updatedCart = {
        ...prevCart,
        [itemId]: (prevCart[itemId] || 0) - 1,
      }

      const filteredCart =updatedCart && Object.fromEntries(
        Object.entries(updatedCart).filter(([_, qty]) => qty > 0)
      )

      return filteredCart
    })
    toast.warning(
      <span className="flex gap-1">
        Item <CiCircleRemove className="relative top-1" /> to{" "}
        <MdShoppingCartCheckout className="inline-block relative top-1 text-lg" />
      </span>
    )

    if (token && cartItem[itemId] > 0) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      )
    }
  }

  const loadCartData = async (token) => {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: { token } }
    )

    const updatedCart = response.data?.cartData || {}
    const filteredCart =updatedCart && Object.fromEntries(
      Object.entries(updatedCart).filter(([_, qty]) => qty > 0)
    )

    setCartItem(filteredCart)
  }

  const totalCartItemPrice = () => {
    let totalAmount = 0

    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item)

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item]
        } else {
          console.warn(`Item with ID ${item} not found in food_list.`)
        }
      }
    }

    return totalAmount
  }

  const getFoodData = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    setFoodList(response.data?.data || [])
    setLoading(true)
  }

  const add_Fav_item = async (itemId) => {
    setFav((prevFav) => {
      const updatedFav = { ...prevFav, [itemId]: (prevFav[itemId] || 0) + 1 }
      const filteredFav = updatedFav && Object.fromEntries(
        Object.entries(updatedFav).filter(([_, qty]) => qty > 0)
      )

      return filteredFav
    })

    toast.success(
      <span className="flex gap-0.5">
        <MdFavorite className="relative top-1" /> item added
      </span>
    )

    if (token) {
      await axios.post(
        `${url}/api/favorite/addFav`,
        { itemId },
        { headers: { token } }
      )
    }
  }

  const remove_Fav_item = async (itemId) => {
    setFav((prevFav) => {
      const updatedFav = { ...prevFav, [itemId]: (prevFav[itemId] || 0) - 1 }
      const filteredFav =updatedFav &&  Object.fromEntries(
        Object.entries(updatedFav).filter(([_, qty]) => qty > 0)
      )

      return filteredFav
    })

    toast.warning(
      <span className="flex gap-0.5">
        <MdFavorite className="relative top-1" /> item removed
      </span>
    )

    if (token && fav[itemId] > 0) {
      await axios.post(
        `${url}/api/favorite/remFav`,
        { itemId },
        { headers: { token } }
      )
    }
  }

  const load_Fav_Data = async (token) => {
    const response = await axios.post(
      `${url}/api/favorite/getFav`,
      {},
      { headers: { token } }
    )

    const updatedFav = response.data?.favData || {}
    const filteredFav =updatedFav&&  Object.fromEntries(
      Object.entries(updatedFav).filter(([_, qty]) => qty > 0)
    )

    setFav(filteredFav)
  }

  useEffect(() => {
    async function loadData() {
      await getFoodData()

      const storedToken = localStorage.getItem("token")
      if (storedToken) {
        setToken(storedToken)
        await loadCartData(storedToken)
        await load_Fav_Data(storedToken)
      }
    }

    loadData()
  }, [])

  const ContextValue = {
    food_list,
    cartItem,
    setCartItem,
    addCart_Item,
    removeCart_Item,
    totalCartItemPrice,
    url,
    token,
    setToken,
    cartNumber,
    add_Fav_item,
    remove_Fav_item,
    fav,
    setFav,
    loading,
    setLoading,
  }

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
