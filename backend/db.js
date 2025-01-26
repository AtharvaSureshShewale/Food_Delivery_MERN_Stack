const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const connectDB= async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");

        const fetched_data=mongoose.connection.db.collection("food_items");
        const fc_data=mongoose.connection.db.collection("foodCategory");
        try{
            const data =await fetched_data.find({}).toArray();
            const fcData=await fc_data.find({}).toArray();

            global.foodCategory=fcData;
            // console.log(global.foodCategory);

            global.food_items=data;
            // console.log(global.food_items);
        }catch(err){
            console.error(err);
        }

    }catch(err){
        console.error(err);
        process.exit;
    }
}

module.exports=connectDB;