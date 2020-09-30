const moment = require('moment');
moment.locale('tr')

const sendJwtToClient = (user, res) => {

    const token = user.generateJwtFromUser();
    const {JWT_COOKIE, NODE_ENV} = process.env;
    return res
        .status(200)
        .cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
            secure: NODE_ENV !== 'DEVELOPMENT'
        })
        .json({
            success: true,
            access_token: token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
};
const isTokenIncluded = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith('Bearer:');
};
const getAccessTokenFromHeader = (req) => {
  return req.headers.authorization.split(' ')[1];
};
module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader
};