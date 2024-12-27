import  foodModel  from "../models/foodModel.js";
import fs from "fs";


// add food item
const addFood = async (req, res) => {
    // console.log("File:", req.file); // Logs uploaded file
    // console.log("Body:", req.body); // Logs other form data
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const food_image = `${req.file.filename}` ;
      
   
    if (!food_image) {
        return res.status(400).json({ success: false, message: "Image upload failed" });
    }

    if (!food_image || !req.body.name || !req.body.price || !req.body.category) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }



    try {
        const newFoodModel = new foodModel({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            image:food_image,
        });

        await newFoodModel.save();
        res.status(201).json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error("Error adding food:", error.message);
        res.status(500).json({ success: false, message: "Failed to add food" });
    }
};

// find all list of food
const findFoodList  = async(req,res) =>{
    try{
        const foodList  =await foodModel.find({});
        res.json({status:true,data:foodList})
        // console.log("fwf")
    }
    catch(e){
        res.json({status:false,message:"error of find list"})
    }

}


// remove the specific food

const removeList =  async(req,res) =>{
    try {
        const foodItem  = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${foodItem.image}`, () =>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"food removed"});

    } catch (error) {
        res.json({success:true,message:"error of find food item"});
        
    }
}

export {addFood,findFoodList,removeList}
