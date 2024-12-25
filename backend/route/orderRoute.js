import express from "express"
import authMeddleWare from "../middleware/authMeddleware.js"

import {listOrders, placeOrder, updateStatus, userOrder, verifyOrder} from "../controller/orderController.js"


const orderRouter = express.Router();

orderRouter.post("/place",authMeddleWare,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMeddleWare,userOrder)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)

export default orderRouter;
