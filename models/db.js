const mongoose = require('mongoose');
const config = require('../config/index');

const connstring = config.mongoConnectionString;

const connectWithRetry = function () {
    return mongoose.connect(connstring)
        .then(() => {
            console.log('MongoDB connected');
        })
        .catch((err) => {
            console.error('MongoDB connection failed, retrying in 5s:', err.message);
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

module.exports = mongoose;
