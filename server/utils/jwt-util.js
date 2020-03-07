const jwt = require('jsonwebtoken');
const jwt_keys = require('../config/jwt-keys.json');

module.exports = {
    sign: (number) => {
        var signOptions = {
            expiresIn: 86400
        }
        return jwt.sign({number},jwt_keys.privateKey,signOptions);
    },
    verify: (token) => {
        var verifyOptions = {
            expiresIn: 86400
        }
        try{
            return jwt.verify(token, jwt_keys.privateKey, verifyOptions);
        } catch (err) {
            return false;
        }
    },
    decode: (token) => {
        return jwt.decode(token, {complete: true});
    }
}
