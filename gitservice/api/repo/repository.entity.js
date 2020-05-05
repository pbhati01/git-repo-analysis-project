const mongoose = require('mongoose');

const ReposiorySchema = new mongoose.Schema({
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    ownerId: { type: String, required: true },
    repoName: { type: String, required: true },
    seq: { type: String, required: true },
    repoUrl: { type: String, required: true },
    noOfCommits: { type: String, required: true },
    openPullRequests: { type: String, required: true },
    readmeContent: { type: String, required: false },
    createdOn: { type: String, required: true },
    modifiedOn: { type: String, required: true }
}, { collection: 'repos' });

module.exports = mongoose.model('repos', ReposiorySchema);