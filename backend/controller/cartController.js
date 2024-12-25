import userModel from "../models/userModel.js"


// add to cart user
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        // console.log(userId +"dd");
        // console.log(itemId);

        if (!userId || !itemId) {
            return res.json({ success: false, message: "Invalid input" });
        }

        // Fetch user data
        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // console.log("User Data Before Update:", userData);

        // Initialize cartData if it doesn't exist
        userData.cartData = userData.cartData || {};

        // Update cartData
        if (!userData.cartData[itemId]) {
            userData.cartData[itemId] = 1;
        } else {
            userData.cartData[itemId] += 1;
        }

        // console.log("Cart Data After Update:", userData.cartData);

        // Save changes
        // await userModel.findByIdAndUpdate(
        //     userId,
        //     { $set: { [`cartData.${itemId}`]: (cartData[itemId] || 0) + 1 } },
        //     { new: true } // Returns the updated document
        // );
        userData.markModified('cartData');
        await userData.save();

        // console.log("User Data After Save:", userData);

        res.json({ success: true, message: "Added to Cart", cartData: userData.cartData });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.json({ success: false, message: "Error occurred", error });
    }
};

const removeToCart = async(req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]  -=1;
        }
        userData.markModified('cartData');
        await userData.save();
        res.json({success:true,message:"removed from Cart",cartData: userData.cartData })
    } catch (error) {
        res.json({success:false,message:"Error"});
        
    }
   

}
const getToCart = async(req,res) =>{
try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    res.json({success:true,message:"get from Cart",cartData: userData.cartData })
} catch (error) {
    res.json({success:false,message:"Error"});
}
}


export {addToCart, removeToCart, getToCart};


