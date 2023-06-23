const app = require('../api/app');
const connectDataBase = require('./db/db')

// IMPORTING DOTENV
if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({
        path: '../api/config/.env'
    })
}

// HANDLING UNCAUGHT EXCCEPTION - handles any error that occurs on the server
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception ${err.message}`);
    
    process.exit(1)
})

// CONNECTING TO DATABASE 
connectDataBase()

PORT = process.env.PORT
const server = app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})

// UNHANDLED PROMISE REJECTION - handles any promise that produces an error 
process.on('unhandledRejection', (err) => {
    console.log(`shutting down the server because ${err.message}`);
    console.log(`shutting down the server for unhandled promise rejection`);

    server.close(() => {
        process.exit(1)
    })
})