const express = require('express');
const router = express.Router();
const {getAccessToRoute, getAdminAccess } = require('../middlewares/authorization/auth');
const { checkUserExist } = require('../middlewares/database/databaseErrorHelpers');
const { getUserProfile, saveUserProfile, userAdd, getAllUser, userRemove,getUser } = require("../controllers/user");

router.get('/', getAccessToRoute ,getAllUser);
router.get('/:id', [checkUserExist,getAccessToRoute],  getUser); //GET SINGLE USER
router.post('/', [getAccessToRoute,getAdminAccess], userAdd); // ADD USER
router.delete('/:id', [checkUserExist,getAccessToRoute,getAdminAccess], userRemove) // REMOVE A USER

router.get('/profile/show', [getAccessToRoute], getUserProfile); //GET PROFILE
router.put('/profile/update', [getAccessToRoute],  saveUserProfile); // UPDATEPROFILE





module.exports = router;