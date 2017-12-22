var new_order = require('../db/new_orders.js');
var orderLogistics = require('../db/order_logistics.js');

function document() {}

document.prototype.createOrder = function (params) {

            var order = new  new_order();
            order.order_no = params.order_no;
            order.sku = params.sku;
            order.order_date =  new Date();
            order.order_qty = params.order_qty;
            order.order_price = global.order_price;
            order.customer_name = params.customer_name;

            order.save();
            console.log("order completed");
};

document.prototype.mapOrder = function (order_no) {

        var orderLog = new  orderLogistics();
        orderLog.order_no = order_no;
        orderLog.courier_no = global.courier_no;
        orderLog.order_date = new Date();
        console.log("Order_no: ",order_no);
        console.log("courier_no: ", global.courier_no);
        orderLog.save();
        console.log("order logistics maping  completed");

 };

module.exports = new document();