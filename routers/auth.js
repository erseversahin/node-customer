const express = require('express');
const router = express.Router();
const { getAllUsers, register, login, logout } = require("../controllers/auth");
const {getAccessToRoute} = require('../middlewares/authorization/auth');

router.post('/register', register);
router.post('/login', login);


router.get('/logout', getAccessToRoute, logout);
router.get('/', getAllUsers);

module.exports = router;