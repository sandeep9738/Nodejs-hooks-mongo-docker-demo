var express = require('express');
var router = express.Router();
var hook = require('hooks');
var Promise = require('promise');
var _ = require('underscore');

var inventory = require('../db/inventory.js');
var courier_partner = require('../db/courier_partner.js');
var orderInvoice = require('../db/order_invoice.js');
var new_order = require('../db/new_orders.js');

var document = require('../models/order.js');

_.extend(document, hook);


// router.post('/enter', function (req, res, next) {

//           new  courier_partner({
//             courier_no : req.body.no,
//             courier_partner : req.body.name,
//             isAvailable : req.body.isAvailable
//             }).save();

//             res.json({
//               success: true
//             });

// });


router.post('/creation', function (req, res, next) {

    global.errMsg = "";
    console.log(" Order Creation ");

    document.pre('createOrder', function (next) {

        console.log(" pre create order :  ");

        inventory.find({ sku: req.body.sku }, function (err, result) {
            if (err) throw err;
            console.log("Inventory qty: ", result[0].qty);
            console.log("Req qty: ", req.body.order_qty);
            if (result[0].qty <= 0) {

                global.errMsg = "Not enough qty";
               return res.redirect('/orderCreation');

            } else if ((result[0].qty - req.body.order_qty) < 0) {

                global.errMsg = "Not enough qty";
                return res.redirect('/orderCreation');

            } else {
                global.order_price = req.body.order_qty * result[0].price;
                console.log("price : ", global.order_price);
            }
            next();
        });
    });

    document.pre('mapOrder', function (next) {

        console.log(" pre map order :  ");

        var promise = new Promise(function (resolve, reject) {
            courier_partner.find({ isAvailable: true }, function (err, result) {
                if (err) reject(err);
                else resolve(res);
                console.log("Courier partner :", result[0].courier_no);
                console.log("Courier partner price :", result[0].price_per_qty);
                global.courier_no = result[0].courier_no;
                global.price_per_qty = result[0].price_per_qty;

            });
        });
        promise.then(function () {
            console.log("pre map -promise : ");
            next();
        });

    });

    document.post('createOrder', function (next) {

        console.log(" post create order :  ");

        var promise3 = new Promise(function (resolve, reject) {
            inventory.findOne({ sku: req.body.sku }, function (err, result) {
                if (err) throw err;
                inventory.findOneAndUpdate({ sku: req.body.sku }, { qty: result.qty - req.body.order_qty }, function (err, result) {
                    if (err) reject(err);
                    else resolve();
                    console.log("Update Inventory ");
                });
            });
        });
        promise3.then(function () {
           console.log("post create -promise : ");
           document.mapOrder(req.body.order_no);

        });
    });

    document.post('mapOrder', function (next) {

        console.log("post map order : ");

        var promise2 = new Promise(function (resolve, reject) {
            var order = new orderInvoice();
            order.order_no = req.body.order_no;
            order.courier_no = global.courier_no;
            order.item_price = global.order_price;
            order.courier_price = global.price_per_qty * req.body.order_qty;
            order.total_price = order.item_price + order.courier_price;
            order.save();
             resolve();
        });
        promise2.then(function () {
            console.log("Order invoice  completed");
            res.redirect('/');
        });

    });
    document.createOrder(req.body);


});


module.exports = router;
