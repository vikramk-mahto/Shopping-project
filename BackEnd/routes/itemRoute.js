var express = require('express');
var router = express.Router();
var config = require('../../config/config');
var secretKey = config.secretKey;
var Item  = require('../model/database/item');
var User = require('../model/database/user');

//for saving the item
router.post('saveItem',function (req, res, next) {
    console.log(req)
    console.log(req.body)
    var item = new Item(req.body);
    item.save(function (err,item) {
        if(err){
            res.json({success:false,MSG:"Error Occur",error:err});
        }else{
            res.json({success:true,MSG:"Data Saved",data:item})
        }
    });
});

//for getting the item
router.get('/getSavedItems',function (req, res, next) {
    Item.find(function (err,item) {
        if(err){
            res.json({success:false,MSG:"Error Occur",error:err});
        }else{
            res.json({success:true,MSG:"Data Found",data:item});
        }
    });
});


//for deleting the item
router.delete('/deleteItem',function (req, res, next) {
    Item.remove({id:_id},function (err,item) {
        if(err){
            res.json({Success:false,MSG:"Error in delete",data:item});
        }else{
            res.json({success:true,MSG:"Item Removed",data:item});
        }
    });
});

module.exports = router;