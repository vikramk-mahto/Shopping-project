var User =require("../model/database/user");
var config = require("../../config");
var secretKey = config.secretKey;
var jsonWebToken = require("jsonwebtoken");
var Story = require('../model/story')

function createToken(user){
    var token = jsonWebToken.sign({
        id:user._id,
        name:user.first_name,
        username:user.username,
    },secretKey,{
        // expiresInMinute:1440
    });
    return token;
}

module.exports = function (app, express) {

    var api = express.Router();

    //route for saving the user
    api.post('/signup',function (req, res) {
        var user = new User({
            username:req.body.username,
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            password:req.body.password
        });

        user.save(function (err) {
            if(err){
                res.send(err);
                return
            }
            res.json({Msg:"user is created"});
        })
    });

    //route for getting the user
    api.get('/users',function (req, res) {
        User.find(function (err,user) {
            if(err){
                res.send({Msg:"error found",error:err});
                return;
            }
            res.json(user)
        });
    });

    //route for the login
    api.post('/login',function (req, res) {
        User.findOne({
            username:req.body.username
        }).select('password').exec(function (err, user) {
            if(err) throw err;

            if(!user){
                res.send({Msg:"user does not exist"});
            }else{
                if(user){
                    var validPassword = user.comparePassword(req.body.password);

                    if(!validPassword){
                        res.send({MSG:"Invalid Password"});
                    }else{
                        var token = createToken(user);

                        res.json({
                            success:true,
                            message:"successfully logged in",
                            token:token
                        })
                    }
                }
            }
        });
    });

    api.use(function (req, res, next) {
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];

        //check if token exist
        if(token){
            jsonWebToken.verify(token,secretKey,function (err, decoded) {
                if(err){
                    res.status(403).send({success:false,message:"failed to authenticate user"});
                }else{
                    req.decoded = decoded;
                    next();
                }
            })
        }else{
            res.status(403).send({success:false,message:"No token exist"});
        }
    })

//destination B
    //provide a legitimate token

    /*api.get('/',function (req, res) {
        res.json("hello world");

    });*/

    api.route('/')
        .post(function (req, res) {
            var story = new Story({
                creator:req.decoded.id,
                content:req.body.content
            })
            story.save(function (err) {
                if(err){
                    res.send(err)
                    return
                }
                res.json({message:"New Story Created"});
            })
        })
        .get(function (req, res) {
            Story.find({creator:req.decoded.id},function (err, stories) {
                if(err){
                    res.send(err);
                    return
                }
                res.json(stories);
            })
        })

    api.get('/me',function (req, res) {
        res.json(req.decoded);
    })


    return api;
};
