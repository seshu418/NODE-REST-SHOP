const express = require('express');
const app = express();
const morgon = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Defining the routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//Connecting to MongoDb using Mongoose
mongoose.connect('mongodb+srv://node-shop:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop.ydujp.mongodb.net/Node-rest-shop?retryWrites=true&w=majority',{ 
useNewUrlParser: true,
useUnifiedTopology: true
});


//Using morgon for logging
app.use(morgon('dev'));

//Using bodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Handling CORS
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept , Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Defining the routers to be used
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//error handling
app.use((req,res,next)=> {
    const error = new Error('Not found');
    //console.log(error.status)
    //console.log(error.message)
    error.status= 404;
    //console.log(error.message)
    next(error);
});

app.use((error,req,res,next)=> {
    res.status(error.status || 500);
    res.json({
        error:{
            message:'Route not found'
        }
    })

});

module.exports = app;
