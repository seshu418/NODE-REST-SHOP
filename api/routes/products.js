const express = require('express');
const route = express.Router();
//Handling  Get method for /products route
route.get('/',(req,res,next)=>{
    res.status(200).json({
        message : 'Handaling Get for /products'
        
    });
});
//Handling Post menthod /products route
route.post('/',(req,res,next)=>{
    const product = {
        name: req.body.name,
        price:req.body.price

    }
    res.status(201).json({
        message : 'Handaling post for /products',
        createdProduct: product
    });
});

//Handling  Get method for /products:<productId> route
route.get('/:productId',(req,res,next)=>{
    res.status(200).json({
        message : 'You got product of Id ' + req.params.productId
    });
});
//Handling  Patch method for /products route

route.patch('/:productId',(req,res,next)=>{
    res.status(200).json({
        message : 'Product with Id ' + req.params.productId + ' is updated'
    });
});
route.delete('/:productId',(req,res,next)=>{
    res.status(200).json({
        message : 'Product with Id ' + req.params.productId + ' is deleted'
    });
});


module.exports = route;