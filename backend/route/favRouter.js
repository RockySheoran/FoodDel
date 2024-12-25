import express from 'express';
import { add_fav_item, get_fav_item, remove_fav_item } from '../controller/favController.js';
import authMiddleWare from '../middleware/authMeddleware.js';


const FavRouter  = express.Router();

FavRouter.post("/addFav",authMiddleWare,add_fav_item);
FavRouter.post("/remFav",authMiddleWare,remove_fav_item);
FavRouter.post("/getFav",authMiddleWare,get_fav_item );

export default FavRouter;
