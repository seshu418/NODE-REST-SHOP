const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const Product = require ('../models/product');

//Handling  Get method for /products route
route.get('/',(req,res,next)=>{
	Product.find()
	.exec()
	.then(doc=> {
		//console.log(doc);
		if (doc) {
			res.status(200).json(doc);
		}
		else{
			res.status(404).json({Message: 'No Valid entry found!'});
		}
	})
    .catch(err =>{
		//console.log(err);
		res.status(500).json({
			message : err
		});
	});
});

//Handling Post menthod /products route
route.post('/',(req,res,next)=>{
	const product = new Product({
		_id : new mongoose.Types.ObjectId(),
		name : req.body.name,
		price : req.body.price
	});
	product
		.save()
		.then(result => {
			//console.log(result);
			res.status(201).json({
				createdProduct: product
			});
		})
		.catch(err =>{
			//console.log(err);
			res.status(500).json({
				message : err
			});
		});


});

//Handling  Get method for /products:<productId> route
route.get('/:productId',(req,res,next)=>{
	const id = req.params.productId;
    Product.findById(id)
	.exec()
	.then(doc=> {
		//console.log(doc);
		if (doc) {
			res.status(200).json(doc);
		}
		else{
			res.status(404).json({Message: 'No Valid entry found!'});
		}
	})
	.catch(err => {
	//console.log(err);
	res.status(500).json({Error: err});
	});
});

//Handling  Patch method for /products route

route.patch('/:productId',(req,res,next)=>{
	
	const id = req.params.productId;
	const updateOps = {};
	//console.log(req.body);
	
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
		
	}	
	//console.log(updateOps );
	
	Product.update({ _id :id}, { $set: updateOps}).exec()
	.then( result => {
		res.status(200).json(result);
	})
	
	.catch(error =>{
		res.status(200).json(error);
	})
});

//Delete route
route.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
	Product.remove({_id: id}).exec()
	.then(doc =>{
		res.status(200).json({
			message: 'product with Id ' + id + ' is deleted'
		});
	})
	.catch(error =>{
		res.status(200).json(error);
	})	
});


module.exports = route;