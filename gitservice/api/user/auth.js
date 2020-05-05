const jwt = require('jsonwebtoken');

const signJWTToken = (payload, secret, expiresIn, callback) => {
    jwt.sign(payload, secret, { expiresIn }, callback);
};

const verifyJWTToken = (token, secret, callback) => {
    jwt.verify(token, secret, callback);
};

module.exports = {
    signJWTToken,
    verifyJWTToken
};
