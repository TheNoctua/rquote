 const express = require('express');
 const router = express.Router();
const Data= require('../models/quote-model.js');


router.get('/all', function(req, res){
    Data.find({}).then(function(data){
        var response = {
            statusCode: 200,
            status: "OK",
            quoteCount: data.length,
            quotes: data 
        };
        res.send(response);
    });
});

router.get('/:count', function(req, res){
    Data.find({}).then(function(data){
        var response = {};
        if(req.params.count > data.length) {
            response = {
                statusCode: 400,
                status: "Bad Request",
                error: "Request count is above quote count"
            }
        }
        else {
            response = {
                statusCode: 200,
                status: "OK",
                quoteCount: req.params.count,
                quotes: data.splice(0,req.params.count)
            };
        }
        res.send(response);
    });
});

router.get('/', function(req, res){
    Data.find({}).then(function(data){
        var arrLength = data.length;
        var randomIndex = getRandomInt(0, arrLength);
        var response = {
            statusCode: 200,
            status: "OK",
            quotes: data[randomIndex]
        };
        res.send(response);
    });
});

router.post('/', function(req, res){
    new Data(req.body).save().then((newQuote) => {
        var response = {
            statusCode: 200,
            status: "OK",
            quote: req.body
        }
        res.send(response);
    });
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
 module.exports = router;