const express = require('express');
const router = express.Router()
const User = require('../model/user')
const path = require('path');
const { upload } = require('../multer');
const fs = require('fs')
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/ErrorHandler');
const sendMail = require('../utils/sendMail');

router.post('/create-users', upload.single('file'), async (req, res, next) => {
    try{
        const {name, email, password} = req.body
        const {filename} = req.file
        const fileUrl = path.join(filename)
    
        const userEmail = await User.findOne({email})
        if(userEmail){
            const filename = req.file.filename
            const filePath = `../uploads/${filename}`
            fs.unlink(filePath, (err) => {
                if(err) {
                    console.log(err);
                    res.status(500).json({message: "error deleting the file"})
                }else{
                    res.json({message:"file deleted successfully"})
                }
            })
            return next( new ErrorHandler('User already exists', 400))
        }
    
        const user = {
            name: name,
            email: email,
            password: password,
            avatar: fileUrl
        } 
    
        const activationToken = createActivationToken(user)
        const activationUrl = `http://localhost:3000/activation/${activationToken}`
        try{
            await sendMail({
                email: user.email,
                subject: "Activate your account",
                message: `Hello ${user.name}, click on the link to activate your account: ${activationUrl} `
            })
            
        }catch(err){
            return next(new ErrorHandler(err.message, 400))
        }
    }catch(err) {
        console.log(err);
    }
})

// CREATE ACTIVATION TOKEN 
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.JWT_ACTIVATION_SECRET,{
        expiresIn: "5m"
    })
}
jwt.sign

module.exports = router