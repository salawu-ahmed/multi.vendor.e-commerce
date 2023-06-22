const app = require('../api/app');
const connectDataBase = require('./db/db')

// IMPORTING DOTENV
if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({
        path: '../api/config/.env'
    })
}

// HANDLING UNCAUGHT EXCCEPTION
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('shutting down the server for handling uncaught exception');
})

// UNHANDLED PROMISE REJECTION
process.on('unhandledRejection', (err) => {
    console.log(`shutting down the server for${err.message}`);
    console.log(`shutting down the server for unhandled promise rejection`);

    server.close(() => {
        process.exit(1)
    })
})

// CONNECTING TO DATABASE 
connectDataBase()

PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})
