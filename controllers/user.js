const User = require("../Model/User");
const generateToken = require("./util");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.addUser = (req,res) => {
    const body = req.body;
    var hash = bcrypt.hashSync(body.password.trim(), 10);
    const userData = new User({
        name: body.name,
        phoneNumber: body.phoneNumber,
        password : hash,
        subTotal : 0
    })
    userData
    .save()
    .then(item => {
        const userDataToken = new User({
            name: body.name,
            phoneNumber: body.phoneNumber,
            _id : item._id
        });
        const token = generateToken(userDataToken);
        res.status(200).json({
            message : "Successfull SignUp",
            user_id : item._id,
            phoneNumber: body.phoneNumber,
            token: token
        });
    })
    .catch(err => {
        console.log(err);
        res.json({
            message : "Error happened"
        })
    })
}

exports.loginUser = (req,res) => {
    const body = req.body;
    User.findOne({phoneNumber : body.phoneNumber})
    .then(userData => {
        if (!userData) {
            return res.json({
               message: "Username or Password is Wrong"
            });
        } else {
            bcrypt.compare(body.password,userData.password,function(err, valid) {
                if (!valid) {
                    return res.json({
                        message: "Username or Password is Wrong"
                    });
                } else {
                    const userDataToken = new User({
                        name: userData.name,
                        phoneNumber: body.phoneNumber,
                        _id : userData._id
                    });
                    const token = generateToken(userDataToken);
                    res.json({
                        user_id : userData._id,
                        phoneNumber: userData.phoneNumber,
                        token: token,
                        message : "Successfull SignIn"
                    })
                }
            })
        }
    })
    .catch(err => {
        res.json({
            "message" : "Error Occured"
        })
    })
}

exports.getUserFromToken = (req,res) => {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({message: "Must pass token"});
    } else {
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
            if (err) {
                return res.status(401).json({
                    message: 'Please register Log in using a valid email to submit posts'
                });
            } else {
                User.findOne({"phoneNumber": user.phoneNumber})
                .then(userData => {
                    if(!userData){
                        return res.json({
                            message : "Invalid Json"
                        })
                    } else {
                        return res.json({
                            phoneNumber : userData.phoneNumber,
                            token : token,
                            user_id : userData._id,
                            message : "Successfully Validated"
                        })
                    }
                })
            }
        })
    }
}

exports.addOrder = (req,res) => {
    const body = req.body;
    User.findOne({_id : body.user_id} && {phoneNumber : body.phoneNumber})
    .then(async userData => {
        if(!userData){
            return res.json({
                message : "No Such User Id Exists or PhoneNumber Exists"
            })
        } else {
            const idx = userData.orders.findIndex((obj => obj.orderName == body.item.toLowerCase()));
            if(idx == -1)
                userData.orders = [...userData.orders , {orderName : body.item.toLowerCase() , total : body.subTotal}]
            else 
                userData.orders[idx].total = parseInt(userData.orders[idx].total) + parseInt(body.subTotal);
            userData
            .save()
            .then(message => {
                res.json({
                    message : "success"
                })
            })
            .catch(err => {
                console.log(err);
                res.json({
                    message : err
                })
            })
        }
    })
}

exports.getOrder = (req,res) => {
    const body = req.query;
    User.findById({_id : body.user_id})
    .then(userData => {
        if(!userData){
            return res.json({
                message : "No Such User Id Exists or PhoneNumber Exists"
            })
        } else {
            return res.json({
                message : "success",
                orders : userData.orders
            })
        }
    })
}