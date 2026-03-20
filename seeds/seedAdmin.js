/**
 * Admin Seeder Script
 * Run: node seeds/seedAdmin.js
 * Creates a default Super Admin user for initial system setup.
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const MONGO_URI = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/hms_db';

const seedAdmin = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const existing = await User.findOne({ username: 'admin' });
        if (existing) {
            console.log('⚠️  Admin user already exists. Skipping seed.');
            process.exit(0);
        }

        const admin = new User({
            name: 'Super Administrator',
            email: 'admin@shriramhospital.com',
            username: 'admin',
            password: 'Admin@123',
            role: 'Super Admin',
            isActive: true
        });

        await admin.save();
        console.log('✅ Super Admin created successfully!');
        console.log('   Username: admin');
        console.log('   Password: Admin@123');
        console.log('   Role:     Super Admin');
        console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    } catch (err) {
        console.error('❌ Seeder failed:', err.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

seedAdmin();
