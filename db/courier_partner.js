var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var courierPartnerSchema=new Schema({
    courier_no: {type:Number, required: true},
    courier_partner : { type:String, required:true},
    isAvailable : {type: Boolean, required:true},
    price_per_qty : {type: Number, required: true}

});

module.exports=mongoose.model('courier', courierPartnerSchema);