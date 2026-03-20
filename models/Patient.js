const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    bloodGroup: { type: String },
    contact: { type: String, required: true },
    address: {
        city: { type: String },
        state: { type: String },
        pinCode: { type: String }
    },
    emergencyContact: {
        name: { type: String },
        relation: { type: String },
        contact: { type: String }
    },
    insurance: {
        provider: { type: String },
        policyNo: { type: String },
        coverageDetails: { type: String }
    },
    medicalHistory: [{
        condition: { type: String },
        diagnosedAt: { type: Date },
        notes: { type: String }
    }],
    allergies: [String]
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
