const User=require('../models/UserModel');
const express=require('express');
const {validationResult}=require('express-validator');
const  bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const app=express();
const jwtSecret=process.env.JWT_SECRET;
app.use(express.json());

//JWT
//the string is divided into three part
//first = algorithm and token type
//second = data
//third  = verify signature

const createUser=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).json({
            errors:errors.array()
        })
    }

    
    try{
        const {name,location,email,password}=req.body;
        
        const salt=await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(password,salt);

        const newUser=User({name,location,email,password:secPassword});
        await newUser.save();
        res.status(200).json({
            success:true,
            message:newUser,
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

const   loginUser=async(req,res)=>{

    const errors=validationResult({req});
    if(!errors.isEmpty()){
        return res.status(500).json({
            errors:errors.array()
        })
    }

    try{

        const {email,password}=req.body;
        const userData= await User.findOne({email});

        if(!userData){
            return res.status(500).json({
                success:false,
                message:"Try logging with correct credentials",
            })
        }
        
        const pwdCompare=await bcrypt.compare(password,userData.password);
        if(!pwdCompare){
            return res.status(500).json({
                success:false,
                message:"Try logging with correct credentials",
            });
        }
        
        const data={
            user:{
                id:userData._id,
            }
        }

        //if we want to set expire date the we use it after jwtSecret,{expireIn:'2d'} 
        //'10s' – 10 seconds
        // '5m' – 5 minutes
        // '1h' – 1 hour
        // '2d' – 2 days
        const authToken=jwt.sign(data,jwtSecret);
    
        return res.status(200).json({
            success:true,
            authToken:authToken,
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

module.exports={createUser,loginUser};