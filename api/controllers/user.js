const express = require('express');
const router = express.Router()
const User = require('../models/user')
const path = require('path');
const { upload } = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');

router.post('/create-users', upload.single('file'), async (req, res, next) => {
    const {name, email, password} = req.body
    const {filename} = req.file
    const fileUrl = path.join(filename)

    const userEmail = await User.findOne({email})
    if(userEmail){
        return next( (new ErrorHandler('User already exists', 400)))
    }

    const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl
    } 
    console.log(user);
})

module.exports = router