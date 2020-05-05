/* eslint-disable no-console */
const router = require('express').Router();
const axios = require('axios');
const controller = require('./repository.controller');

const sendJSONRes = (res, st, data) => res.type('json').status(st).send(data);

//Request to get repository data from github api
router
    .get('/getRepoData', (req, res, next) => {
        const { query: { userId, ownerId, repoName, seq }} = req;

        const getRepo = axios.get(`https://api.github.com/repos/${ownerId}/${repoName}`);
        const getRepoCommits = axios.get(`https://api.github.com/repos/${ownerId}/${repoName}/commits`);
        const getRepoOpenPulls = axios.get(`https://api.github.com/repos/${ownerId}/${repoName}/pulls?state=open`);

        axios.all([getRepo, getRepoCommits, getRepoOpenPulls])
        .then(axios.spread((...responses) => {
            const repoUrl = responses[0].data.html_url;
            const noOfCommits = responses[1].data.length;
            const openPullRequests = responses[2].data.length;    

            const data = { userId, ownerId, repoName, seq, repoUrl, noOfCommits, openPullRequests };
            controller.saveRepoData(data, res);
        })).catch(err => {
            const { status, statusText } = err.response;
            sendJSONRes(res, status, {statusText});
        });
    });

//Request to get readme content from github api
router
    .get('/getReadme', (req, res, next) => {
        const { query: { userId, ownerId, repoName }} = req;        
        axios(
            { 
                method: 'get',
                url: `https://api.github.com/repos/${ownerId}/${repoName}/readme`,
                headers:{
                    'Accept': 'application/vnd.github.VERSION.html'
                }
            }
        )
        .then(result => {
            const readmeContent = result.data;
            controller.saveReadmeContent(userId, ownerId, repoName, readmeContent, res);
        })
        .catch(err => {
            const { status, statusText } = err.response;
            sendJSONRes(res, status, {statusText});
        });
    });

//Request to fetch previous repository analytics data for user from database
router
    .get('/fetchUserData', (req, res, next) => {
        try {
            const { query: { userId }} = req;        
            controller.fetchUserData(userId, res);
        }
        catch (err) {
            const { status, statusText } = err.response;
            sendJSONRes(res, status, {statusText});
        }
    });

module.exports = router;