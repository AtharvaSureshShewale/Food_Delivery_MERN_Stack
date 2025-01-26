const {Schema,model}=require('mongoose');

const OrderSchema=Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        required:true,
    }
});

const OrderModel=model("order",OrderSchema);

module.exports=OrderModel;