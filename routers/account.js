const express = require('express');
const router = express.Router();
const {getAccessToRoute } = require('../middlewares/authorization/auth');
const { checkAccountExist } = require('../middlewares/database/databaseErrorHelpers');

const { addAccount, getAccount, getAllAccount, getAllUserAccount,updateAccount, accountRemove, accountMoneyTransfer } = require("../controllers/account");

router.post('/', [getAccessToRoute],   addAccount);
router.get('/:id', [checkAccountExist, getAccessToRoute],   getAccount);
router.get('/list/all', [getAccessToRoute],  getAllAccount);
router.get('/user/:id', [checkAccountExist,getAccessToRoute],  getAllUserAccount);


router.put('/:id', [checkAccountExist,getAccessToRoute],   updateAccount);
router.delete('/:id', [checkAccountExist,getAccessToRoute],   accountRemove);

router.post('/transfer/send', [getAccessToRoute],  accountMoneyTransfer); // UPDATEPROFILE

module.exports = router;