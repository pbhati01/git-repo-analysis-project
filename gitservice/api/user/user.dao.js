const userModel = require('./user.entity');

const loginUser = (id, name, token, done) => {
    const now = new Date().toISOString();
    const filter = {id, name};
    const data = {id, name, token};    
    let userData;

    userModel.find(filter, (err, response) => {
        if(response.length > 0) {
            userData = userModel.findOneAndUpdate(filter, {
                ...data,
                modifiedOn: now
            }, { useFindAndModify: false, new: true }).exec(done);
        }
        else {
            userData = new userModel({
                _id: `${filter.id}${Date.now()}`,
                ...data,
                createdOn: now,
                modifiedOn: now,
            }).save(done);
        }
    });
};

const logoutUser = (id, name, token, done) => {
    const now = new Date().toISOString();
    const filter = {id, name};
    const data = {id, name, token};

    let userData = userModel.findOneAndUpdate(filter, {
        ...data,
        token: '',
        modifiedOn: now
    }, { useFindAndModify: false, new: true });
    userData.exec(done);
};

module.exports = {
    loginUser,
    logoutUser
};