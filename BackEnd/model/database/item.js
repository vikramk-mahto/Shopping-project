var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema({

    id:{
        type:Object
    },
    item_name:{
        type:String,
        required: false
    },
    item_type:{
        type:String,
        required: false
    },
    item_size:{
        length:{type:String,required: false},
        height:{type:String,required: false},
        width:{type:String,required: false}

    },
    item_quantity:{
        type:Number,
        required: false
    },
    item_price:{
        type:Number,
        required: false
    },
    item_description:{
        type:String,
        required: false
    },
    item_img:{
        medium: {type: String, required: false},
        small: {type: String, required: false},
    },
    item_stock:{
        type:Number,
        required:true
    },
    isActive:{
        type:Boolean
    }


});

module.exports = mongoose.model('item',itemSchema);