let mongoose = require('mongoose');
const { dbConfig } = require('../config').appConfig;

// create mongo connection
function createMongoConnection() {
    if(mongoose.connection.readyState === 0) {
        mongoose.connect(process.env.MONGO_URL || dbConfig.mongoUrl, {useNewUrlParser: true });
    }
}

// create mongo connection
function disconnectMongoConnection() {
    mongoose.disconnect();
}

// get mongo connection object
function getMongoConnection() {
    return mongoose.connection;
}

// Event listener for mongo "error" event.
function onError(err) {
    // eslint-disable-next-line no-console 
    console.error('Error in database connection...', err);
}

//Event listener for mongo "open" event
function onSuccess() {
    // eslint-disable-next-line no-console 
    console.info('Connected to mongo database');
}

//Event listener for mongo "close" event
function onClose() {
    // eslint-disable-next-line no-console 
    console.info('Closed mongo database connections');
}

module.exports = {
    createMongoConnection,
    disconnectMongoConnection,
    getMongoConnection,
    onError,
    onSuccess,
    onClose
} 