const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    appointmentDate: { type: Date, required: true },
    type: {
        type: String,
        enum: ['OPD', 'Emergency', 'Regular Checkup'],
        default: 'OPD'
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled', 'No-show'],
        default: 'Scheduled'
    },
    notes: { type: String },
    consultationFee: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
