const express=require('express');
const app=express();
const dotenv=require('dotenv');
const connectDB=require('./db');
const cors=require('cors');
app.use(cors());
const router1=require('./routes/User');
const router2=require('./routes/DisplayData');
const router3=require('./routes/Order');
dotenv.config();
const port=process.env.PORT;

app.use(express.json());
//connect with db
connectDB();

app.use('/api',router1);
app.use('/api',router2);
app.use('/api',router3);

app.listen(port,()=>{
    console.log(`Your application is runnning on port ${port}`);
});