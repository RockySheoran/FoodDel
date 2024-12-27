import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import "dotenv/config";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontendUrl = "http://localhost:5173" || process.env.FRONTEND_URL ;
    // console.log(req.body.userId);
  
    try {
      // Create a new order in the database
      const newOrder = new orderModel({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
      });
  
      await newOrder.save();
  
      // Clear the user's cart
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
  
      // Prepare line_items for Stripe
      const line_items = req.body.items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100 * 20), // Ensure unit_amount is an integer
        },
        quantity: item.quantity,
      }));
  
      // Add delivery charge as a line item
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Delivery Charge",
          },
          unit_amount: Math.round(2 * 100 * 20), // Ensure unit_amount is an integer
        },
        quantity: 1,
      });
  
      // Create a Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
      });
  
      // Respond with the session URL
      res.json({ success: true, session_url: session.url });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error while placing order" });
    }
  };
  const verifyOrder =async (req,res) =>{
    const {orderId ,success} = req.body;
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true, message:'paid'});

        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:'not paid'});
        }
    } catch (error) {
        res.json({success:false, message:'Error -try again'});
        
    }
  }
  // user order
  const userOrder = async(req,res) =>{
    try {
      const order  =await orderModel.find({userId:req.body.userId});
      res.json({success:true,data:order})
      
    } catch (error) {
      res.json({success:false,message:"error"})
    }

  }

  // listing orders for admin panel
  const listOrders = async (req,res) =>{
    try {
      const orders = await orderModel.find({});
      res.json({success:true,data:orders});
    } catch (error) {
      res.json({success:false,message:"error not get order list"})
    }

  }
  // api for updating order
  const updateStatus = async (req,res) =>{
    try {
      // console.log(req.body.status)
      
      const response = await orderModel.findByIdAndUpdate(
        req.body.orderId, // Ensure you use the correct field for the order ID
        { status: req.body.status }, // Update the status
        { new: true } // Return the updated document
      );
      // console.log(response)
      res.json({success:true,message:"Status updated"});

    } catch (error) {
      res.json({success:false,message:"error"})
    }

  }
export {placeOrder,verifyOrder ,userOrder,listOrders ,updateStatus}