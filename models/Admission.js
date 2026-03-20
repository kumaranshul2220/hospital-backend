const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    wardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward', required: true },
    bedId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bed', required: true },
    attendingDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    admissionDate: { type: Date, default: Date.now },
    dischargeDate: { type: Date },
    reasonForAdmission: { type: String },
    diagnosis: { type: String },
    treatmentPlan: { type: String },
    dischargeSummary: {
        condition: { type: String },
        instructions: { type: String },
        followUpDate: { type: Date }
    },
    status: {
        type: String,
        enum: ['Admitted', 'Discharged', 'Transfered'],
        default: 'Admitted'
    }
}, { timestamps: true });

module.exports = mongoose.model('Admission', admissionSchema);
