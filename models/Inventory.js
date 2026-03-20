const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    medicineName: { type: String, required: true },
    batchNo: { type: String, required: true, unique: true },
    type: {
        type: String,
        enum: ['Tablet', 'Syrup', 'Injection', 'Equipment', 'Consumable'],
        required: true
    },
    quantity: { type: Number, required: true, default: 0 },
    unit: { type: String, default: 'pcs' },
    purchaseDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },
    supplier: {
        name: { type: String },
        contact: { type: String }
    },
    pricePerUnit: { type: Number, required: true },
    reorderLevel: { type: Number, default: 10 }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
