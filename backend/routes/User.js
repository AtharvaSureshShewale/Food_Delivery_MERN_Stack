const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const {createUser, loginUser} =require('../controller/CreateUserController.js');

router.post("/createuser",
    body('name','Length of the user should be min 5').isLength({min:5}),
    body('email').isEmail(),
    body('password','Length of the password should be min 5').isLength({min:5}),
    createUser
);

router.post("/login",
    body('email').isEmail(),
    body('password','Length of the password should be min 5').isLength({min:5}),
    loginUser);

module.exports=router;