import userModel from "../models/userModel.js";

const add_fav_item = async(req,res) =>{
    try {
        const { userId, itemId } = req.body;
        // console.log(userId,itemId +" df")
        

        if (!userId || !itemId) {
            return res.json({ success: false, message: "Invalid input" });
        }

        // Fetch user data
        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }


        // Initialize cartData if it doesn't exist
        userData.favData = userData.favData || {};


        // Update cartData
        if (!userData.favData[itemId]) {
            userData.favData[itemId] = 1;
        } 

        
        userData.markModified('favData');
        await userData.save();

        // console.log("User Data After Save:", userData);

        res.json({ success: true, message: "Added to fav Cart", favData: userData.favData });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.json({ success: false, message: "Error occurred", error });
    }
}
const remove_fav_item =async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let favData = await userData.favData;

        if(favData[req.body.itemId]>0){
            favData[req.body.itemId]  -=1;
        }
        userData.markModified('favData');
        await userData.save();
        res.json({success:true,message:"removed from fav cart",favData: userData.favData })
    } catch (error) {
        res.json({success:false,message:"Error"});
        
    }
}

const get_fav_item = async(req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let favData = await userData.favData;
    
        res.json({success:true,message:"get from Cart",favData: userData.favData })
    } catch (error) {
        res.json({success:false,message:"Error"});
    }
    }
    
export {add_fav_item, remove_fav_item, get_fav_item }