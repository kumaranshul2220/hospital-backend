const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    admissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission' },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    invoiceNo: { type: String, required: true, unique: true },
    items: [{
        description: { type: String, required: true },
        amount: { type: Number, required: true },
        quantity: { type: Number, default: 1 }
    }],
    totalAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    netAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid', 'Partially Paid'],
        default: 'Unpaid'
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card', 'UPI', 'Insurance', 'Bank Transfer']
    },
    insuranceStatus: {
        type: String,
        enum: ['Not Applicable', 'Draft', 'Submitted', 'Approved', 'Rejected'],
        default: 'Not Applicable'
    },
    insurancePayload: { type: Object } // Store raw insurance response/data
}, { timestamps: true });

module.exports = mongoose.model('Billing', billingSchema);
