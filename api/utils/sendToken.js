const sendToken = (userModel, statusCode, res) => {
    const jwt_token = userModel.getJWT_TOKEN()

    const options = {
        expiresIn: new Date( Date.now() + (90 * 24 * 60 * 60 * 1000)),
        httpOnly: true
    }

    res.status(statusCode).cookie("jwt_token", jwt_token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken