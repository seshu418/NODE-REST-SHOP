const express = require('express');
const route = express.Router();
//Handling  Get method for /orders route
route.get('/',(req,res,next)=>{
    res.status(200).json({
        message : 'Handaling Get for /orders'
    });
});
//Handling Post menthod /orders route
route.post('/',(req,res,next)=>{
    const order = {
        productId: req.body.productId,
        quantity : req.body.quantity
    };
    res.status(201).json({
        message : 'Order was created',
        order: order

    });
});

//Handling  Get method for /orders:<orderId> route
route.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message : 'You got order of Id ' + req.params.orderId
    });
});
//Handling  Patch method for /orders route

route.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message : 'order with Id ' + req.params.orderId + ' is deleted'
    });
});


module.exports = route;