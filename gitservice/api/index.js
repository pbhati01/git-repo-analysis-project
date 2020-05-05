const router = require('express').Router();

//write your routes here
router.use('/', require('./repo'));
router.use('/', require('./user'));
module.exports = router;