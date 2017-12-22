var express = require('express');
var router = express.Router();

var inventory = require('../db/inventory.js');
var courier_partner = require('../db/courier_partner.js');
var orderInvoice = require('../db/order_invoice.js');
var new_order = require('../db/new_orders.js');
var document = require('../models/order.js');
var orderLogistics = require('../db/order_logistics.js');

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

router.get('/', function (req, res, next) {

    new_order.find(function (err, orders) {
        if (err) {
            return res.write('Error!');
        }
        res.render('order/orders', { orders: orders });
    });

});
router.get('/insertData', function (req, res, next) {

    var inv = new inventory();
    inv.sku = 101;
    inv.item = "ear phone";
    inv.qty = 5;
    inv.price = 500;
    inv.save();


    var cour = new courier_partner();

    cour.courier_no = 101;
    cour.courier_partner = "Blue Dart";
    cour.isAvailable = true;
    cour. price_per_qty = 200;
    cour.save();


});

router.get('/orderCreation', function (req, res, next) {

    res.render('order/create_orders',  { errMsg: global.errMsg, noErrors: !global.errMsg});
});

router.get('/inventories', function (req, res, next) {

    inventory.find(function (err, inventories) {
        if (err) {
            return res.write('Error!');
        }
        res.render('order/inventories', { inventories: inventories });
    });

});

router.get('/invoices', function (req, res, next) {

    orderInvoice.find(function (err, invoices) {
        if (err) {
            return res.write('Error!');
        }
        res.render('order/invoices', { invoices: invoices });
    });

});

router.get('/logistics', function (req, res, next) {

    orderLogistics.find(function (err, logistics) {
        if (err) {
            return res.write('Error!');
        }
        res.render('order/logistics', { logistics: logistics });
    });

});

router.get('/courier_partners', function (req, res, next) {

    courier_partner.find(function (err, couriers) {
            if (err) {
                return res.write('Error!');
            }
            res.render('order/courier_partners', { couriers: couriers });
        });

    });
module.exports = router;
