const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
    wardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward', required: true },
    bedNo: { type: String, required: true },
    status: {
        type: String,
        enum: ['Available', 'Occupied', 'Maintenance'],
        default: 'Available'
    }
}, { timestamps: true });

// Ensure bedNo is unique within a ward
bedSchema.index({ wardId: 1, bedNo: 1 }, { unique: true });

module.exports = mongoose.model('Bed', bedSchema);
