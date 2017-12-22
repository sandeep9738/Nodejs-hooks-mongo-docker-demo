var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var orderInvoiceSchema=new Schema({
    order_no: {type:Number, required: true},
    courier_no : { type:Number, required:true},
    item_price : {type:Number, required:true},
    courier_price: {type: Number, required: true},
    total_price: {type: Number, required:true}
});

module.exports=mongoose.model('orderInvoice', orderInvoiceSchema);