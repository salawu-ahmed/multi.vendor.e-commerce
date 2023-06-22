const mongoose = require('mongoose');
const DATABASE_URI = process.env.DATABASE_URI

const connectDataBase = () => {
    mongoose.connect(DATABASE_URI, {
        useNewUrlParser: true
    }).then((data) => {
        console.log(`connected to mongodb server: ${data.connection.host}`);
    })
}

module.exports = connectDataBase