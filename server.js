var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var morgan = require("morgan");
var path = require("path");
var config = require("./config/config");


var app = express();


//code for server start
app.listen(config.port,function (err) {
    if(err){
        console.log("Problem in server startup");
    }else{
        console.log("server connected at port 3000");
    }
});


//code for routes
var api = require('./BackEnd/routes/route');
var item = require('./BackEnd/routes/itemRoute');
app.use('/api',api);
app.use('/item',item);


//code for middleware
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(morgan('dev'));


// app.use(express.static(__dirname + '/public'));

app.get('*',function (req, res) {
    res.sendFile(__dirname + '/public/FrontEnd/views/index.html');
})


//for DataBase Connectivity
mongoose.connect(config.database);
mongoose.connection.on('connected',function (err) {
    if(err){
        console.log("Error occur"+err);
    }else{
        console.log("connected to port 27017");
    }
})

