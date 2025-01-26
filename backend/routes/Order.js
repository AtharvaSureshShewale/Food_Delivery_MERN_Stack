const express=require('express');
const router=express.Router();
const {OrderData, MyOrderData} =require('../controller/OrderController');

router.post('/orderData',OrderData);

router.post('/myorderData',MyOrderData);
module.exports=router;