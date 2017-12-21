var User = require('../database/user');
var Promise = require('promise');


var createUser = function (query) {
    return new Promise(function (resolve, reject) {
        console.log("query")
        console.log(query)
        var user = new User(query);
        user.save(function (err,user) {
            if(err){
                resolve({success:false,MSG:"Error in User Creation",error:err});
            }else{
                resolve({success:true,MSG:"User is created",data:user});
            }
        })
    })
};


//for getting all the users
var getAllUsersFromDB = function () {
    return new Promise(function (resolve, reject) {
        User.find().exec(function (err, allUser) {
            resolve({success:true,MSG:"The users",users:allUser});
        })
    })
};

var getUserByName =function (name) {
    return new Promise(function (resolve, reject) {
        User.findOne({name:name},function (err, singleUser) {
            if(err){
                resolve({success:false,MSG:"Error occur during search",error:err});
            }else{
                resolve({success:true,MSG:"Found User",data:singleUser});
            }
        });
    });
};

//for deleting the user from DB
var deletUserFromDB =function (name, userName) {
    return new Promise(function (resolve, reject) {
        User.remove({name:name,user_name:userName},function (err,delet) {
            if(err){
                resolve({success:false,MSG:"User not deleted"});
            }else{
                resolve({success:true,MSG:"User deleted successfully",delet:delet});
            }
        })
    })
}

module.exports = {
    createUser:createUser,
    getAllUsersFromDB:getAllUsersFromDB,
    getUserByName:getUserByName,
    deletUserFromDB:deletUserFromDB
}


