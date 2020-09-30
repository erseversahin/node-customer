const User = require("../models/User").User;

const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");


const getUserProfile = asyncErrorWrapper(async (req, res, next) => {
    const {id,access_token} = req.user;
    const data = await User.findById(id);

    return res.status(200)
        .json({
            success: true,
            data

        })

});
const getUser = asyncErrorWrapper(async (req, res, next) => {


    const {id} = req.params;
    const data = await User.findById(id);

    return res.status(200)
        .json({
            success: true,
            data

        })

});

const saveUserProfile = asyncErrorWrapper(async (req, res, next) => {
    const postData = req.body;
    console.log(postData);

    const data = await User.findByIdAndUpdate(req.user.id,postData,{
        new : true,
        runValidators : true
    });

    return res.status(200)
    .json({
        success: true,
        data

    })

});


const userAdd = asyncErrorWrapper(async (req, res, next) => {

    const {name, email, role} = req.body;
    const password = 123456;

    const user = await User.create({name, email, password, role});

    if (user){
       return res.status(200)
           .json({
            success: true,
            data : user
        })
    }else{
        next(new CustomError('Kullanıcı eklenemedi.',400))
    }

});

const getAllUser = asyncErrorWrapper(async (req, res, next) => {

    const data = await User.find({});

    return res.status(200)
    .json({
        success: true,
        data

    })

});


const userRemove = asyncErrorWrapper(async (req, res, next) => {
    const userRemoved = await User.deleteOne( {"_id": req.params.id});
    if (userRemoved){
        return res.status(200)
        .json({
            success: true,
            data : {
                message: 'Kullanıcı silindi!',
            }
        })
    }else{
        next(new CustomError('Kullanıcı silinemedi.',400))
    }
});


module.exports = {getUserProfile,saveUserProfile,userAdd, getAllUser,getUser, userRemove};