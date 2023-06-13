const mongoose = require('mongoose')


//TODO change database according assignment
const CONNECTION_STRING = 'mongodb://localhost:27017/Auction-House'

module.exports = async(app) => {
    try {
        await mongoose.connect(CONNECTION_STRING)
        console.log('Database connected');
    } catch (error) {
        console.error(err.message);
        process.exit(1)
    }
}