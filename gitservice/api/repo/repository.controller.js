const repositoryService = require('./repository.dao');

const sendJSONRes = (res, st, data) => res.type('json').status(st).send(data);

const fetchUserData = (userId, res) => {
    repositoryService.fetchUserData(userId, (err, data) => {
        if (err) {
            sendJSONRes(res, 403, err);
        } else {
            sendJSONRes(res, 201, data);
        }
    });
};

const saveRepoData = (repoData, res) => {
    repositoryService.saveRepoData(repoData, (err, data) => {
        if (err) {
            sendJSONRes(res, 403, err);
        } else {
            sendJSONRes(res, 201, data);
        }
    });
};

const saveReadmeContent = (userId, ownerId, repoName, readmeContent, res) => {
    repositoryService.saveReadmeContent(userId, ownerId, repoName, readmeContent, (err, data) => {
        if (err) {
            sendJSONRes(res, 403, err);
        } else {
            sendJSONRes(res, 201, readmeContent);
        }
    });
};

module.exports = {
    fetchUserData,
    saveRepoData,
    saveReadmeContent
};