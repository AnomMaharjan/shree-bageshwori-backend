import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import {
    signUpBodyValidation,
    logInBodyValidation
} from "../utils/validationSchema.js"
import generateTokens from "../utils/generateTokens.js";


const router = Router();


//sign up route
router.post("/signup",async(req,res) => {
    try{
        const {error} = signUpBodyValidation(req.body)
        if(error){
            return res.status(400).json({error:true,message: error.details[0].message})
        }
        const user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:true,message:"User with given email already exists"})
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password,salt)

        await new User({...req.body,password:hashPassword}).save();
        res.status(201).json({ error: false, message: "Account Created" });
    }catch(err){
        
        res.status(500).json({ error: true, message: "Internal Server error" });
    }
})


//login Route
router.post("/login",async(req,res) =>{
    try{
        const {error} = logInBodyValidation(req.body)
        if(error){
            return res.status(400).json({error:true,message:error.details[0].message})
        }
        
        
        const user = await User.findOne({email:req.body.email});
        
        if(!user){
            return res.status(401).json({error:true,message:"Invalid Username or Password"})
        }
      
        
        const verifiedPassword = await bcrypt.compare(req.body.password,user.password);
        
        if(!verifiedPassword){
            return res
            .status(401)
            .json({ error: true, message: "Invalid email or password" });
        
        }
  
        const {accessToken,refreshToken} = await generateTokens(user);
        return  res.status(200).json({
            error: false,
            accessToken,
            refreshToken,
            message: "Logged in sucessfully",
          });
    }catch(error){
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }

})
export default router;