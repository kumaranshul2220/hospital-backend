const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const config = {
    port: process.env.PORT || 3000,
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/hms_db',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    whitelistOrigin: process.env.WHITELIST_ORIGIN ? JSON.parse(process.env.WHITELIST_ORIGIN) : ["http://localhost:5173"]
};

module.exports = config;
