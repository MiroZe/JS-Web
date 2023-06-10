const mongoose = require('mongoose');



const CONNECTION_STRING = 'mongodb://localhost:27017/Book-Talk'


module.exports =  database = async () => {
    try {
        mongoose.connect(CONNECTION_STRING)
        console.log('Database is connected');
    } catch (error) {
        console.error(err.message);
        process.exit(1)
    }
} 