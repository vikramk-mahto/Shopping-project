var itemOperation = require('../model/operations/item_operation');
var Promise = require('promise');

//for creating the item
var createItem = function (parameter) {
    return new Promise(function (resolve, reject) {
        if(parameter){
            itemOperation.saveAItems(parameter)
                .then(function (data) {
                    resolve(data);
                });
        }else{
            resolve("No data to save");
        }
    });
};

//for getting the item
var gettingItem = function () {
    return new Promise(function (resolve, reject) {
        itemOperation.getAllItems()
            .then(function (allItem) {
                if(allItem){
                    resolve(allItem)
                }else{
                    resolve("Error in fetching the data");
                }
            });
    });
};


//for getting single item
var gettingSingleItem = function (itemName) {
    return new Promise(function (resolve, reject) {
        itemOperation.getSingleItems(itemName)
            .then(function (allItem) {
                if(allItem){
                    resolve(allItem)
                }else{
                    resolve("Error in fetching the data");
                }
            });
    });
};

//for deleting the item
var deleteItems = function (itemName, itemQuantity, itemStock) {
    return new Promise(function (resolve, reject) {
        if(itemName && itemQuantity && itemStock){
            itemOperation.deleteItem()
                .then(function (item) {
                    if(item){
                        resolve(item)
                    }else{
                        resolve("Error in deleting the item");
                    }
                });
        }else{
            resolve("Data insufficient");
        }
    });
};

module.exports = {
    createItem:createItem,
    gettingItem:gettingItem,
    gettingSingleItem:gettingSingleItem,
    deleteItems:deleteItems,
}