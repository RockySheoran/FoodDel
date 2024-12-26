

import React, { useState } from 'react';
import { assets } from '../../assets/admin_assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTheme } from '../StoreContext/ThemeProvider';


const Add_Item = ({ url }) => {
  const { isDarkTheme } = useTheme();
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Churma",
    price: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        category: "Churma",
        price: "",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div
      className={`add_item mx-3 md:ml-14 mt-5 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <form onSubmit={onSubmitHandler}>
        <div className="image">
          <label htmlFor="image">Image Upload:</label>
          <div className="flex gap-2">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload-preview"
              className="my-2 h-24 w-26 sm:w-24"
            />
            <div className="file grid content-end pb-2">
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                name="image"
                id="image"
                required
                className=""
              />
            </div>
          </div>
        </div>
        <div className="product_name flex flex-col py-3 gap-2">
          <label htmlFor="name">Product Name:</label>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            required
            className={`border-2 rounded px-3 py-1 w-full outline-0 transition placeholder-gray-500 ${isDarkTheme ? 'border-gray-600 focus:border-red-300  text-white bg-black' : ' bg-white border-gray-300 text-black  focus:border-red-500 focus:ring-red-500'}`}
            name="name"
            id="name"
            placeholder="Enter here name"
          />
        </div>
        <div className="product_description flex flex-col gap-2 pb-3">
          <label htmlFor="description">Product Description:</label>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            required
            className={`border p-1 rounded py-1 outline-0 ${isDarkTheme ? 'border-gray-600 focus:border-red-300  text-white bg-black' : ' bg-white border-gray-300 text-black  focus:border-red-500 focus:ring-red-500'}`}
            id="description"
            placeholder="Write content here"
            cols="50"
            rows="3"
          ></textarea>
        </div>
        <div className="group grid grid-cols-2 gap-3">
          <div className="product_category flex flex-col gap-2">
            <label htmlFor="category">Category:</label>
            <select
              onChange={onChangeHandler}
              value={data.category}
              required
              name="category"
              id="category"
              className={`border rounded-md h-8 outline-0 ${isDarkTheme ? 'border-gray-600 focus:border-red-300  text-white bg-black' : ' bg-white border-gray-300 text-black  focus:border-red-500 focus:ring-red-500'}`}
            >
              <option value="Churma">Churma</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Laddu">Laddu</option>
            </select>
          </div>
          <div className="add-price flex flex-col gap-2">
            <label htmlFor="price">Price:</label>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              required
              name="price"
              id="price"
              placeholder="$20"
              className={`border rounded-md py-1 pl-2 outline-0 ${isDarkTheme ? 'border-gray-600 focus:border-red-300  text-white bg-black' : ' bg-white border-gray-300 text-black  focus:border-red-500 focus:ring-red-500'}`}
            />
          </div>
        </div>
        <button
          type="submit"
          className={`border rounded-lg mt-4 w-20 py-1 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-blue-500 text-white'}`}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Add_Item;

