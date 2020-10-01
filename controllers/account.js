const mongoose = require("mongoose");
const Account = require("../models/Account").Account;

const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const addAccount = asyncErrorWrapper(async (req, res, next) => {
    const {id} = req.user;
    const {currency, balance, accountname} = req.body;



    const data = await Account.create({accountname: accountname ,user:id, currency : currency, balance: balance});

    if (data){
        return res.status(200)
            .json({
                success: true,
                data
            })
    }else{
        next(new CustomError('Kullanıcı eklenemedi.',400))
    }

});
const getAccount = asyncErrorWrapper(async (req, res, next) => {


    const {id} = req.params;
    const data = await Account.findById(id);

    return res.status(200)
        .json({
            success: true,
            data

        })

});
const getAllAccount = asyncErrorWrapper(async (req, res, next) => {
    const {id} = req.body;
    const data = await Account.find({id:id});

    return res.status(200)
        .json({
            success: true,
            data

        })

});
const getAllUserAccount = asyncErrorWrapper(async (req, res, next) => {
    const {id} = req.params;
    const data = await Account.find({id:id});

    return res.status(200)
        .json({
            success: true,
            data

        })

});
const updateAccount = asyncErrorWrapper(async (req, res, next) => {
    const  id = req.params.id
    const postData = req.body;

    const data = await Account.findByIdAndUpdate(id,postData,{
        new : true,
        runValidators : true
    });

    return res.status(200)
    .json({
        success: true,
        data

    })

});
const accountRemove = asyncErrorWrapper(async (req, res, next) => {

    const accountRemoved = await Account.deleteOne( {"_id": req.params.id});
    if (accountRemoved){
        return res.status(200)
        .json({
            success: true,
            data : {
                message: 'Hesabınız silindi!',
            }
        })
    }else{
        next(new CustomError('Kullanıcı silinemedi.',400))
    }
});
const accountMoneyTransfer = asyncErrorWrapper(async (req, res, next) => {

    const {senderAccountId, receiverAccountId, amount} = req.body;


    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const senderAccount = await Account.findOne({ "_id": senderAccountId }).session(session);
        const receiverAccount = await Account.findOne({ "_id": receiverAccountId }).session(session);


        if (senderAccount.currency !== receiverAccount.currency) {
            throw new Error(`Cannot transfer - ${senderAccount.currency} to ${receiverAccount.currency}`);
        }

        senderAccount.balance = parseFloat(senderAccount.balance) - parseFloat(amount);
        if (parseFloat(senderAccount.balance) < 0) {
            throw new Error(`User - ${senderAccount.accountname} has insufficient funds`);
        }
        await senderAccount.save();

        receiverAccount.balance = parseFloat(receiverAccount.balance) + parseFloat(amount);
        await receiverAccount.save();


        let commit = await session.commitTransaction();
        if (commit){
            return res.status(200).json({
                success: true
            });
        }
    } catch (error) {

        await session.abortTransaction();
        next(new CustomError(error,400));


    } finally {
        session.endSession();
    }
});


module.exports = {addAccount,getAccount,getAllAccount,getAllUserAccount,updateAccount,accountRemove, accountMoneyTransfer};