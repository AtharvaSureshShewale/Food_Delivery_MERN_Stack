const express=require('express');
const app=express();

app.use(express.json());

const DisplayData=async(req,res)=>{
    try {
        // console.log(global.food_items);
        res.send([global.food_items,global.foodCategory]);
    } catch (error) {
        console.error({
            success:false,
            message:error.message,
        })
    }
}

module.exports={DisplayData}