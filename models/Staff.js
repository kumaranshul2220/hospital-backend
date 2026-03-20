const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    specialization: { type: String },
    qualification: { type: String },
    registrationNo: { type: String },
    shiftTimings: [{
        day: { type: String },
        startTime: { type: String },
        endTime: { type: String }
    }],
    consultationFee: { type: Number, default: 0 },
    joiningDate: { type: Date, default: Date.now },
    experience: { type: Number } // in years
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);
