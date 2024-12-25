import mongoose from "mongoose";
  const connectDB = async()=>{
await mongoose.connect('mongodb+srv://rocky:rocky8396903085@cluster0.vyjk0.mongodb.net/FoodDel').then(() =>{
    console.log("database is connected ");
})
}

export default connectDB;