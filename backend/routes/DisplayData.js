const express=require('express');
const { DisplayData } = require('../controller/DisplayDataController');
const router=express.Router();


router.post('/foodData',DisplayData);

module.exports=router;