const mongoose = require('mongoose');
const config = require('../config/index');

const connstring = config.mongoConnectionString;

const connectWithRetry = function () {
    return mongoose.connect(connstring)
        .then(() => {
            console.log("MongoDB connected successfully");
        })
        .catch((err) => {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err.message);
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

module.exports = mongoose;
