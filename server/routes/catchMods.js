var express = require('express');
var router = express.Router();
var equation = require('./equation');


router.post('/', function(req,res){
equation.operandType(req , res);
// res.send(req.body);
console.log('after')
});

module.exports = router;
