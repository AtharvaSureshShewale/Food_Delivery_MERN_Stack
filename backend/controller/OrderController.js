const express=require('express');
const app=express();
const Order=require('../models/OrderModel');

app.use(express.json());

const OrderData=async(req,res)=>{
    let data=req.body.order_data;
    await data.splice(0,0,{Order_date:req.body.order_date});

    let eid=await Order.findOne({'email':req.body.email});
    if(eid===null){
        try{
            const newOrder= Order({email:req.body.email,order_data:[data]});
            await newOrder.save();
            res.status(200).json({
                success:true,
                message:"Done",
            })
        }catch(err){
            res.status(500).json({
                success:true,
                message:err.message
            })
        }
    }else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},{$push:{order_data:data}});

            res.status(200).json({
                success:true,
                message:"Updated",
            })
        }
        catch(err){
            res.status(500).json({
                success:true,
                message:err.message
            })
        }
    }
}

const MyOrderData=async(req,res)=>{
    try{
        const myData = await Order.findOne({'email':req.body.email});
        res.status(200).json({
            orderData:myData,
        });
    }catch(err){
        res.status(500).json({
            success:true,
            message:err.message
        })
    }
}

module.exports={OrderData,MyOrderData};