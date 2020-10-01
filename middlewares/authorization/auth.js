const CustomError = require('../../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");
const jwt = require('jsonwebtoken');
const {isTokenIncluded, getAccessTokenFromHeader} = require('../../helpers/authorization/tokenHelpers');
const User = require("../../models/User").User;

const getAccessToRoute = asyncErrorWrapper(async(req, res, next) => {
    const {JWT_SECRET_KEY} = process.env;
    if (!isTokenIncluded(req)) {
        return next(new CustomError('Henüz oturum açmadınız. Lütfen oturumunuzu yenileyin.', 401))
    }

    const accessToken = getAccessTokenFromHeader(req);

    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(
                new CustomError('Henüz oturum açmadınız. Lütfen oturumunuzu yenileyin 2.', 401)
            );
        }
        
        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
            access_token: accessToken
        };
        next();
    });


});
const getAdminAccess = asyncErrorWrapper(async(req,res,next) => {
    const user = await User.findById(req.user.id);
    console.log(user);
    if (user.role !== "admin") {
        return next(new CustomError("Sadece admin yetkisine sahip kullanıcılar bu işlemi yapabilir",403));

    }
    return next();

});

module.exports = {
    getAccessToRoute,
    getAdminAccess
}