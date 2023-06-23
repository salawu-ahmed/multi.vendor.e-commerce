// this auth file is used to create authentication  & protect some routes 
const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncErrors = require('./catchAsyncErrors')
const jwt = require('jsonwebtoken');
