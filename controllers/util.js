require('dotenv').config();
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    var userData = {
        name: user.name,
        phoneNumber: user.phoneNumber,
        _id : user._id,
    };
    return token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

module.exports = generateToken;