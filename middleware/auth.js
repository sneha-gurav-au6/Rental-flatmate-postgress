const jwt = require("jsonwebtoken")
const User = require("../models/user")
const privateKey = "secret key"

function authenticate(req, res, next) {
    const authToken = req.header("Authorization");
    if (authToken) {
        User.findOne({
            where: {
                token: authToken
            }
        }).then(function (user) {
            if (user === undefined) {
                return res.status(401).send("Please provide token");
            } else {
                jwt.verify(user.token, privateKey, function (err, payload) {
                    if (err) {
                        console.log(err);
                        return res.status(401).send(err.message);
                    } else {
                        
                        req.user = user;
                        next();
                    }
                });
            }
        }).catch(function (err) {
            console.log(err.message)
            res.send("Please provide token/correct token")
        }) 
    } else {
        res.send("Please provide token")
    }
}

module.exports = authenticate