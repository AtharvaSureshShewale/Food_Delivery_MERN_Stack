const {Schema,model}=require('mongoose');

const  UserSchema=Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const UserModel=model("user",UserSchema);
module.exports=UserModel;