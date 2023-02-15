const jwt = require("jsonwebtoken");

const authenticate = (req,res,next) => {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            message: 'Where is your token ?'
        });
    } else {
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
            if (err) {
                return res.json({
                    message: 'Please Login to add/view order'
                });
            } else {
                next();
            }
        });
    }
}

module.exports = authenticate;