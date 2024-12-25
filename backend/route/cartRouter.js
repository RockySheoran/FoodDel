import express from "express"
import { addToCart, getToCart, removeToCart } from "../controller/cartController.js";
import authMiddleWare from "../middleware/authMeddleware.js";

const cartRouter = express.Router();


cartRouter.post("/add",authMiddleWare,addToCart);
cartRouter.post("/remove",authMiddleWare,removeToCart);
cartRouter.post("/get",authMiddleWare,getToCart);

export default cartRouter;

