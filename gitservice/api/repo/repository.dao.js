const repositoryModel = require('./repository.entity');

const fetchUserData = (userId, done) => {
    const now = new Date().toISOString();
    repositoryModel.find({ userId }).exec(done);
};

const saveRepoData = ({ userId, ownerId, repoName, seq, repoUrl, noOfCommits, openPullRequests }, done) => {
    const now = new Date().toISOString();
    const filter = { userId, ownerId, repoName };
    const data = { userId, ownerId, repoName, seq, repoUrl, noOfCommits, openPullRequests };
    repositoryModel.find(filter, (err, response) => {
        let repoData;
        if(response.length > 0) {
            repoData = repositoryModel.findOneAndUpdate(filter, {
                ...data,
                modifiedOn: now
            }, { useFindAndModify: false, new: true }).exec(done);
        }
        else {
            repoData = new repositoryModel({
                _id: `${data.userId}${Date.now()}`,
                ...data,
                readmeContent: null,
                createdOn: now,
                modifiedOn: now,
            }).save(done);
        }
    });
};

const saveReadmeContent = (userId, ownerId, repoName, readmeContent, done) => {
    const now = new Date().toISOString();
    const filter = { userId, ownerId, repoName };
    const data = { readmeContent };
    let updatedRepoData = repositoryModel.findOneAndUpdate(filter, {
        ...data,
        modifiedOn: now
    }, { useFindAndModify: false, new: true });
    updatedRepoData.exec(done);
};

module.exports = {
    fetchUserData,
    saveRepoData,
    saveReadmeContent
};