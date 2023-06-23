const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ErrorHandler = require('./utils/ErrorHandler');
const userRoutes = require('./controllers/user')
const app = express()

// environment variables 
if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({
        path: '../api/config/.env'
    })
}

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/', express.static("uploads"))

// IMPORTING THE ROUTES 
app.use('/api/v2/users', userRoutes)

// FOR ERROR HANDLING - THIS MUST SIT AS THE PENULTIMATE LINE OF CODE  
app.use(ErrorHandler)
module.exports = app