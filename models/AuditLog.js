const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true }, // e.g., 'CREATE', 'UPDATE', 'DELETE', 'LOGIN'
    module: { type: String, required: true }, // e.g., 'Patient', 'Billing', 'User'
    resourceId: { type: String }, // ID of the object being modified
    oldValue: { type: Object },
    newValue: { type: Object },
    ipAddress: { type: String },
    userAgent: { type: String },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: false });

module.exports = mongoose.model('AuditLog', auditLogSchema);
