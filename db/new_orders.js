var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var new_orderSchema=new Schema({
    order_no: { type: Number, required: true},
    sku : { type: Number, required:true},
    order_date: {type:Date, required:true},
    order_qty :{ type:Number, required: true},
    order_price : {type:Number, required:true},
    customer_name : { type:String, required:true},

});

module.exports=mongoose.model('new_order', new_orderSchema);