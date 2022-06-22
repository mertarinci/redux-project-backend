const CustomError = require("../../helpers/error/CustomError");

const customErrorHandler = (err,req,res,next) => {

    let customError = err;

    if(err.code === 11000){
        customError = new CustomError("Email or username already in use.",400)
    }



    res.status(customError.status || 500)
    .json({
        success: false,
        message: customError.message || "Internal Server Error"

    })
}

module.exports = customErrorHandler;