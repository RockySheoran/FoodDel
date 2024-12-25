import express from "express";
import  {addFood, findFoodList, removeList } from "../controller/foodController.js";


const foodRouter = express.Router();
// Image Store  Engine
import multer from 'multer';

// Configure storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Ensure 'uploads' directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage:storage });

foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list',findFoodList);
foodRouter.post("/remove",removeList);


export default foodRouter;
