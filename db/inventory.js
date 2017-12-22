var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var inventorySchema=new Schema({
    sku : { type: Number, required:true},
    item: { type:String, required:true},
    qty : { type:Number, required: true},
    price : {type: Number, required:true}
});

module.exports=mongoose.model('inventory', inventorySchema);