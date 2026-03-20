const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const User = require('../models/User');

const MONGO_URI = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/hms_db';

const seedAdmin = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        const existing = await User.findOne({ username: 'admin' });
        if (existing) {
            console.log('Admin user already exists.');
            process.exit(0);
        }

        await new User({
            name: 'Super Administrator',
            email: 'admin@shriramhospital.com',
            username: 'admin',
            password: 'Admin@123',
            role: 'Super Admin',
            isActive: true
        }).save();

        console.log('Admin seeded — username: admin, password: Admin@123');
    } catch (err) {
        console.error('Seed failed:', err.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

seedAdmin();
