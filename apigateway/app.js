const express = require('express');
const expressWs = require('express-ws');
var cors = require('cors');
const gitAPI = require('../gitservice/app');

const expressWsObject = expressWs(express());
const app = expressWsObject.app;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', gitAPI);

app.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = app;
