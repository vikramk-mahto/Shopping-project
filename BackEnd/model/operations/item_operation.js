var Item = require('../database/item');
var Promise = require('promise');

//for saving all the items
var saveAllItems =function (parameter) {
    return new Promise(function (resolve, reject) {

        var item = new Item(parameter);

        item.save(function (err, item) {
            if(err){
                resolve({success:false,MSG:"Error occur during saving",error:err});
            }else{
                resolve({success:true,MSG:"Item saved successfully",items:item});
            }
        });
    });
};


//for getting all the items
var getAllItems = function () {
    return new Promise(function (resolve, reject) {
        Item.find().exec(function (err, items) {
            if(err){
                resolve({success:false,MSG:"Error occur",error:err});
            }else{
                resolve({success:true,MSG:"Items Found",items:items});
            }
        });
    });
};


//for getting a single item
var getSingleItems = function (parameter) {
    console.log("parameter///////////")
    console.log(parameter)
    return new Promise(function (resolve, reject) {
        Item.findOne({item_name:parameter}).exec(function (err, item) {
            if(err){
                resolve({success:false,MSG:"Error Occur",error:err});
            }else{
                resolve({success:true,MSG:"Found Successfully",item:item});
            }
        });
    });
};

//for deleting the item
var deleteItem = function (parameter) {
    return new Promise(function (err, deleteItem) {
        Item.remove().exec(function (err, deletedItem) {
            if(err){
                resolve({success:false,MSG:"Error Found",error:err});
            }else{
                resolve({success:true,MSG:"Item deleted successfully",item:deletedItem});
            }
        });
    });
};


module.exports = {
    saveAItems:saveAllItems,
    getAllItems:getAllItems,
    getSingleItems:getSingleItems,
    updateAllItems:getAllItems,
    deleteItem:deleteItem
}
