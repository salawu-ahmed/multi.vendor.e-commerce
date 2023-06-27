const express = require('express');
const router = express.Router()
const User = require('../model/user')
const path = require('path');
const { upload } = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');

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
    
        const newUser = await User.create(user)
        res.status(201).json({
            success: true,
            newUser
        })
    }catch(err) {
        console.log(err);
    }
})

module.exports = router