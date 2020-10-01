const CustomError = require('../../helpers/error/CustomError');
const customErrorHandler = (err, req, res, next) => {
    console.log('hatalar', err);
    let  customError = err;

    if (err.name === 'SyntaxError')customError = new CustomError("Unexpected syntax", 400);
    else if (err.name === 'ValidationError')customError = new CustomError(err.message, 400);
    else if (err.name === 'TypeError')customError = new CustomError(err.message, 400);
    else if (err.code === 11000) customError = new CustomError('Duplicate Inputs', 400);
    console.log(err.code,err.name);
    res.status(customError.status || 500).json({
        success: false,
        error: customError.message || "Internal Server Error"
    });
};

module.exports = customErrorHandler;