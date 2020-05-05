const express = require('express');
const api = require('./api');
const db = require('./db');
const app = express();
const verifyAuthHeader = require('./modules').verifyAuthHeader;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/', (req, res, next) => {
//     verifyAuthHeader(req, (isAuthenticated) => {
//         isAuthenticated ? next() : res.status(401).send('User is not authorized');
//     });
// });

app.use('/', api);

db.createMongoConnection();
let dbConnection = db.getMongoConnection();
dbConnection.on('error', db.onError);
dbConnection.once('open', db.onSuccess);
dbConnection.once('disconnected', db.onClose);

module.exports = app;
