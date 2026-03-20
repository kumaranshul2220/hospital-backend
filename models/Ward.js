const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ['General', 'ICU', 'Emergency', 'Private Room', 'Semi private room'],
        required: true
    },
    capacity: { type: Number, required: true },
    floor: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Ward', wardSchema);
