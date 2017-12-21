var express = require('express');
var router = express.Router();
var config = require('../../config/config');
var secretKey = config.secretKey;

var userController = require('../controller/userController');

//for saving the user
router.post('/saveTheUser',function (req, res, next) {
    //var questionBankId = req.query.question_bank ? mongoose.Types.ObjectId(req.query.question_bank) : undefined;
    var name = req.query.name;
    var userName = req.query.userName;
    var password = req.query.password;

    if(name && userName && password){
        userController.createNewUser(name, userName, password)
            .then(function (resultData) {
                res.json(resultData)
            })
    }
});

//for fetching the user
router.get('/getAllUsers',function (req, res, next) {
    var secretkey = req.query.secretkey;
    if(secretkey === secretKey){
        userController.getAllUsers()
            .then(function (usersList) {
                if(usersList.success){
                    res.json(usersList);
                }else{
                   res.json({MSG:"Error occur"});
                }
            })
    }else{
        res.json({MSG:"You Type Wrong Key"});
    }
});


//for fetching particular user
router.get('/getSingleUser',function (req, res, next) {
    var name = req.query.name;
    var secretkey = req.query.secretkey;

    if(name && secretkey){
        if(secretkey == secretKey){
            console.log(name)
            userController.getSingleUser(name)
                .then(function (singleUser) {
                    if(singleUser.success){
                        res.json(singleUser)
                    }else{
                        res.json("Error occur in searching")
                    }
                });
        }else{
            res.json("Wrong Key");
        }
    }else{
        res.json("Data Insufficient");
    }

});

//for deleting the user
router.delete('/deleteUser',function (req, res, next) {
    var name = req.query.name;
    var userName = req.query.userName;
    var secretkey = req.query.secretkey;

    if(name && userName && secretkey){
        if(secretkey == secretKey){
            userController.deleteUser(name, userName)
                .then(function (deleted) {
                    if(deleted.success){
                        res.json(deleted)
                    }else{
                        res.json("Error occur in deletion");
                    }
                });
        }else{
            res.json("Wrong Key");
        }
    }else{
        res.json("Data Insufficient");
    }
});



module.exports = router;