var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});


//Method for hashing the password
UserSchema.pre('save',function (next) {
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password,null,null,function (err, hash) {
        if(err) return next(err);

        user.password = hash;
        next();
    });
});


//Method for comparing the password type with password in database
UserSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

const User = module.exports = mongoose.model('user', UserSchema);