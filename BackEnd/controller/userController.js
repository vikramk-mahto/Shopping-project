var userOperation = require('../model/operations/user_operation');
var Promise = require('promise');

//for saving the user in db
var createNewUser = function (name, userName, password) {
    console.log("Inside the user controller");
    var error = "error occur in controller"
    return new Promise(function (resolve, reject) {
        if(name && userName && password){
            var query = {};
            if(name){
                query.name = name;
            }
            if(userName){
                query.user_name = userName;
            }
            if(password){
                query.password = password;
            }
            return userOperation.createUser(query)
                .then(function (data) {
                    if(data.success){
                        resolve(data);
                    }else{
                        console.log("data insufficient");
                        resolve(error);
                    }
                });
        }else{
            console.log("data insufficient");
            resolve(error);
        }
    });
};


//for fetching the user in db
var getAllUsers = function () {
   return new Promise(function (resolve, reject) {
       userOperation.getAllUsersFromDB()
           .then(function (getAllUsers) {
               if(getAllUsers.success){
                   resolve(getAllUsers);
               }
           });
   });
};

//for fetching single user on name basis
var getSingleUser = function (name) {
    return new Promise(function (resolve, reject) {
        if(name){
            userOperation.getUserByName(name)
                .then(function (getSingleUser) {
                    if(getSingleUser.success){
                        resolve(getSingleUser)
                    }else{
                        resolve("There is no name for getting single user");
                    }
                })
        }
    })
}

//for deleting the user
var deleteUser = function (name, userName) {
    return new Promise(function (resolve, reject) {
        if(name && userName){
            userOperation.deletUserFromDB(name,userName)
                .then(function (dataDeleted) {
                    if(dataDeleted.success){
                        resolve(dataDeleted);
                    }else{
                        resolve("Error occur in deletion");
                    }
                })
        }
    })
}


module.exports = {
    createNewUser:createNewUser,
    getAllUsers:getAllUsers,
    getSingleUser:getSingleUser,
    deleteUser:deleteUser
}