// this file exports a function that is used to handle our errors and display error messages
const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'internal server error'

    // wrong mongodb id error
    if(err.name = 'CastError'){
        const message = `Resources not found with this id... Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    // duplicate key error
    if(err.code === 11000){
        const message = `Duplicate key error ${Object.keys(err.keyValues)} entered`
        err = new ErrorHandler(message, 400)
    }

    // wrong jwt error 
    if(err.name == 'JsonWebToken'){
        const message = 'Your url is invaid please try again later'
        err = new ErrorHandler(message, 400)
    }

    // jwt expired
    if(err.name == 'TokenExpiredError'){
        const message = 'Your url is expired'
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}