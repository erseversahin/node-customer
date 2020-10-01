const express = require('express');
const router = express.Router();
const {getAccessToRoute } = require('../middlewares/authorization/auth');
const { addAccount, getAccount, getAllAccount, getAllUserAccount,updateAccount, accountRemove, accountMoneyTransfer } = require("../controllers/account");

router.post('/', [getAccessToRoute],   addAccount);
router.get('/:id', [getAccessToRoute],   getAccount);
router.get('/list/all', [getAccessToRoute],  getAllAccount);
router.get('/user/:id', [getAccessToRoute],  getAllUserAccount);


router.put('/:id', [getAccessToRoute],   updateAccount);
router.delete('/:id', [getAccessToRoute],   accountRemove);

router.post('/transfer/send', [getAccessToRoute],  accountMoneyTransfer); // UPDATEPROFILE

module.exports = router;