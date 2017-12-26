var express = require('express');
var router = express.Router();
var config = require('../../config/config');
var secretKey = config.secretKey;
var Item  = require('../model/database/item');
var User = require('../model/database/user');
var itemController = require('../controller/itemController');

/*//for saving the item
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
});*/


//route for saving the data
router.post('/saveTheItem',function (req, res, next) {
    // console.log(req);
    console.log(req.body);
    var itemName = req.body.itemName;
    var itemType = req.body.itemType;
    var itemSize = req.body.itemSize;
    var itemQuantity = req.body.itemQuantity;
    var itemPrice = req.body.itemPrice;
    var itemDescription = req.body.itemDescription;
    var itemImage = req.body.itemImage;
    var itemStock = req.body.itemStock;
    var isActive = req.body.isActive;

    if(itemName  && itemType && itemQuantity && itemPrice && itemDescription  && itemStock){
        var parameter = {
            item_name:itemName,
            // item_size:itemSize,
            item_type:itemType,
            item_quantity:itemQuantity,
            item_price:itemPrice,
            item_description:itemDescription,
            //item_img:itemImage,
            item_stock:itemStock
        };

        itemController.createItem(parameter)
            .then(function (data) {
                if(data){
                    res.json(data);
                }else{
                    res.json("Error occur");
                }
            });
    }else{
        res.json("data Insufficient");
    }
});


//route for getting the data
router.get('/getAllItems',function (req, res, next) {

    var secretkey = req.query.secretkey;
    if(secretkey === secretKey){
        itemController.gettingItem()
            .then(function (data) {
                if(data){
                    res.json(data);
                }else{
                    res.json("Error occur");
                }
            });
    }else{
        res.json("You are not authorised");
    }

});



//route for deleting the data
router.get('/getSingleItem',function (req, res, next) {

    var itemName = req.body.itemName;
    var secretkey = req.query.secretkey;
    if(secretkey === secretKey) {
        itemController.gettingSingleItem(itemName)
            .then(function (data) {
                if (data) {
                    res.json(data);
                } else {
                    res.json("Error occur");
                }
            });
    }else{
        res.json("You are not authorised");
    }
});


//route for getting the data
router.delete('/deleteItem',function (req, res, next) {

    var itemName = req.body.itemName;
    var itemQuantity = req.body.itemQuantity;
    var itemStock = req.body.itemStock;
    var secretkey = req.query.secretkey;
    if(secretkey === secretKey){
        itemController.deleteItems(itemName, itemQuantity, itemStock)
            .then(function (data) {
                if(data){
                    res.json(data);
                }else{
                    res.json("Error occur");
                }
            });
    }else{
        res.json("You are not authorised");
    }
});

module.exports = router;