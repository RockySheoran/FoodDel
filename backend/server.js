import express from "express"

import cors from "cors"
import  connectDB  from "./config/db.js";
import  foodRouter  from "./route/foodRoutes.js";
import { userRouter } from "./route/userRoute.js";
import cartRouter from "./route/cartRouter.js";
import orderRouter from "./route/orderRoute.js";
import FavRouter from "./route/favRouter.js";

import compression  from 'compression' 
import cookieParser from "cookie-parser";
import feedbackRoutes from "./route/feedbackRoutes.js";

// app config
const app = express();
const port = process.env.PORT || 5000;


// middleware

app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('uploads'));

// db connect 

connectDB();

// api endpoint
app.use("/api/feedback", feedbackRoutes);
app.use("/api/food",foodRouter);
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/favorite",FavRouter);


app.get("/" ,(req,res) =>{
    res.send('api working');
})


app.listen(port , () =>{
    console.log(`server is start in this port http://localhost:${port}`);
})
//mongodb+srv://rocky:<db_password>@cluster0.vyjk0.mongodb.net/?

