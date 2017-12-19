var express = require('express');
var router = express.Router();
var config = require('../../config/config');
var secretKey = config.secretKey;
var jsonWebToken = require('jsonwebtoken')
var User = require("../model/user");

router.post('/saveTheUser',function (req, res, next) {

    console.log("req.body")
    console.log(req.body)
    console.log(req.query)
    /*var user = new User({
        user_name : req.query.userName,
        password : req.query.password,
        name : req.query.name
    });*/
    var user = new User(req.query);
    user.save(function (err) {
        if(err){
            res.send("Error found"+err);
            return
        }else{
            res.json({MSG:"User is created"});
        }
    })
})


module.exports = router;