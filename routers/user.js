const express = require('express');
const router = express.Router();
const {getAccessToRoute, getAdminAccess} = require('../middlewares/authorization/auth');
const { getUserProfile,saveUserProfile,userAdd, getAllUser, userRemove,getUser } = require("../controllers/user");

router.use([getAccessToRoute])

router.get('/', getAllUser);
router.get('/:id', getUser); //GET SINGLE USER
router.post('/', getAdminAccess, userAdd); // ADD USER
router.delete('/:id', getAdminAccess, userRemove) // REMOVE A USER

router.get('/profile',  getUserProfile); //GET PROFILE
router.put('/profile/',  saveUserProfile); // UPDATEPROFILE



module.exports = router;