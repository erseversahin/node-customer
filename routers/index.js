const express = require('express');
const router = express.Router();

const auth = require('./auth');
const user = require('./user');
const account = require('./account');


router.use('/auth', auth);
router.use('/user', user);
router.use('/account', account);


module.exports = router;