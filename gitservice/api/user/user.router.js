/* eslint-disable no-console */
const router = require('express').Router();
const axios = require('axios');
const controller = require('./user.controller');

const sendJSONRes = (res, st, data) => res.type('json').status(st).send(data);

//user sign in, handles response code returned from github and authorize user
router
    .get('/user/signin', (req, res) => {
        const { query: { code } } = req;
        
        if(!code) {
            sendJSONRes(res, 403, 'No code');
        }

        //get access token from github
        axios({ 
            method: 'post',
            url: 'https://github.com/login/oauth/access_token',
            data: { 
                client_id: 'e4de3556c1af976c2c5f',
                client_secret: '025a7f836c742f677a13da31c5d93a41455303fe',
                code: code
            },
            headers:{
                'Accept': 'application/json'
            }
        })
        .then((result) => {
            const data = result.data;
            accessToken = data.access_token;
            
            //get user profile
            axios(
                { 
                    method: 'get',
                    url: 'https://api.github.com/user',
                    headers:{
                        'User-Agent': '',
                        'Authorization': 'token ' + accessToken
                    }
                }
            )
            .then(result => {
                const userId = result.data.login;
                const userName = result.data.name;
                //saves user data and authorize with jwt 
                controller.loginUser(userId, userName, accessToken, res);
            })
            .catch(err => {
                const { status, statusText } = err.response;
                sendJSONRes(res, status, {statusText});
            });
        })
        .catch(err => {
            const { status, statusText } = err.response;
            sendJSONRes(res, status, {statusText});
        });            
    });  

// user logout
router
    .get('/user/logout', (req, res) => {
        try {
            const { query: { userId, userName, token } } = req;
            //removes token from user data
            controller.logoutUser(userId, userName, token, res);
        } catch (error) {
            const { status, statusText } = err.response;
            sendJSONRes(res, status, {statusText});
        }
    });

//validate user 
router
    .get('/validate/user', controller.isAuthenticated);

module.exports = router;