const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ErrorHandler = require('./utils/ErrorHandler');
const app = express()

// environment variables 
if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({
        path: '../api/config/.env'
    })
}

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

// for errorHandling 
app.use(ErrorHandler)
module.exports = app