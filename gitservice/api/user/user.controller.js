const userService = require('./user.dao');
const authService = require('./auth');
const { authConfig } = require('../../config').appConfig;

const TOKEN_EXPIRY_TIME = '1h';

const sendJSONRes = (res, st, data) => res.type('json').status(st).send(data);

const authenticateUser = (res, user) => {
    authService.signJWTToken({
        username: user.name,
        userId: user.id
    }, authConfig.jwtSecret, TOKEN_EXPIRY_TIME, (tokenErr, token) => {
        if (tokenErr) sendJSONRes(res, 401, { message: tokenErr.message });
        else sendJSONRes(res, 200, {
            token,
            user: { userId: user.id, userName: user.name },
            status: 200
        });
    });
};

const verifyAuthHeader = (req, callback) => {
    const authorizationHeader = req.get('Authorization');
    if(!authorizationHeader) { callback(false); return; }
    const token = authorizationHeader.replace('Bearer ', '');
    authService.verifyJWTToken(token, authConfig.jwtSecret, err => callback(!err));
};

const isAuthenticated = (req, res) => {
    verifyAuthHeader(req, (isAuthenticated) => {
        res.status(200).json({ isAuthenticated });
    });
};

const loginUser = (id, name, token, res) => {
    userService.loginUser(id, name, token, (err, data) => loginCallback(res, err, data));
};

const loginCallback = (res, err, user) => {
    err ? sendJSONRes(res, 403, err) : authenticateUser(res, user);
};

const logoutUser = (id, name, token, res) => {
    userService.logoutUser(id, name, token, (err, data) => {
        if (err) {
            sendJSONRes(res, 403, err);
        } else {
            sendJSONRes(res, 201, {message: 'Logout Successful. Please click here to login.'});
        }
    });
};

module.exports = {
    loginUser,
    logoutUser,
    isAuthenticated,
    verifyAuthHeader
};