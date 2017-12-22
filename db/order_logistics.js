var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var orderLogisticsSchema=new Schema({
    order_no : {type: Number, required: true},
    courier_no: {type:Number, required: true},
    order_date : {type: Date , required:true}
});

module.exports=mongoose.model('orderLogistics', orderLogisticsSchema);