const path = require("path");
const root = path.dirname(require.main.filename);

const User = require(root + "/models/User").User;
const Account = require(root + "/models/Account").Account;

const CustomError = require('../../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");

const checkUserExist = asyncErrorWrapper(async(req,res,next) => {
    const {id} = req.params;

    const user = await User.findById(id);

    if (!user) {
        return next(new CustomError(`User Not Found with Id : ${id}`,404));
    }
    next();

});
const checkAccountExist = asyncErrorWrapper(async(req,res,next) => {
    const account_id = req.params.id || req.params.account_id;

    const account = await Account.findById(account_id);
    
    if (!account) {
        return next(new CustomError(`Account Not Found`,404));
    }
    next();

});

module.exports = { checkUserExist, checkAccountExist };