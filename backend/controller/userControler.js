
import jwt from  "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"
import "dotenv/config"
import userModel from "../models/userModel.js"

// token gen

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
  }
// login user
const loginUser = async (req,res) =>{
    try{
      console.log("qscs")
    const {email,password} = req.body;
    console.log(email,password);
    
    const userExists = await userModel.findOne({email:email});
    if(!userExists){
        return res.json({success:false,message:"User doesn't exists"})
    }
    const isMatch = await bcrypt.compare(password,userExists.password);
    if(!isMatch){
        return res.json({success:false,message:"password inCorrect"});
    }
    const token = createToken(userExists._id);
    console.log(token)
    
    res.json({success:true,token})
}
catch(e){
    console.log("dvss")
    console.log(e)
    res.json({success:false,message:"ccs"})

}

}

// register 

const registerUser = async(req,res) =>{
    try{
    const {name,email,password,Confirm_Password} = req.body;

    const exists = await userModel.findOne({email:email});
    if(exists){
        return res.json({success:false,message:"user already exists"})
    }

    // validating 
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"please enter valid email"})
    } 
    if(password.length<8){
        return res.json({success:false,message:"please enter strong password and min 8 digit"})
    }
    if(password !== Confirm_Password){
        return res.json({success:false,message:"password not match"})
    }
   // hashing user pass

   const salt = await bcrypt.genSalt(10);
   const hashPass = await bcrypt.hash(password,salt);

   const newUser = new userModel({
    name:name,
    email:email,
    password:hashPass,

   })

  const user = await newUser.save();
  const token = createToken(user._id);
 
  res.json({success:true,token})
}
catch(e){
    console.log(e)
    res.json({success:false,message:"error"})
}

 


}


export  {loginUser,registerUser};