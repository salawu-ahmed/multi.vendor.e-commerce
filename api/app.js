const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express()

if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({
        path: '../api/config/.env'
    })
}

app.use(cookieParser())
app.use(bodyParser())

module.exports = app