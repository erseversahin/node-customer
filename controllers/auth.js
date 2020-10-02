const User = require("../models/User").User;
const {sendJwtToClient, getAccessTokenFromHeader} = require('../helpers/authorization/tokenHelpers');
const {validateUserInput, comparePassword} = require('../helpers/input/inputHelpers');
const getAllUsers = (req, res, next) => {
    res
        .status(200)
        .json({
            status: "Ok Users"
        });
};
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const register = asyncErrorWrapper(async (req, res, next) => {

    const {tckn, name, email, password, role} = req.body;

    const user = await User.create({tckn, name, email, password, role});

    sendJwtToClient(user, res);
});
const login = asyncErrorWrapper(async (req, res, next) => {

    const {email, password} = req.body;
    if (!validateUserInput(email, password)) next(new CustomError('Lütfen kullanıcı adı ve şifrenizi giriniz', 400));

    const user = await User.findOne({email}).select('+password');
    if (!user || !comparePassword(password, user.password)) next(new CustomError('Kullanıcı adı veya parolanız hatalı', 400));
    sendJwtToClient(user, res);

});
const logout = asyncErrorWrapper(async (req,res,next) =>{

    const {JWT_COOKIE,NODE_ENV} = process.env;

    // Send To Client With Res

    return res
        .status(200)
        .cookie("token",null, {
            httpOnly : true,
            expires : new Date(Date.now()),
            secure : NODE_ENV !== "DEVELOPMENT"
        })
        .json({
            success : true,
            message : "Logout Successfull"
        });

});


module.exports = {getAllUsers, register, login, logout};