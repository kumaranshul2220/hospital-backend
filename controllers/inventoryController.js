const Inventory = require('../models/Inventory');

exports.addItem = async (req, res) => {
    try {
        const itemData = req.body;
        const item = new Inventory(itemData);
        await item.save();
        res.status(201).json({ message: 'Inventory item added successfully', item });
    } catch (err) {
        res.status(500).json({ message: 'Error adding inventory item', error: err.message });
    }
};

exports.updateStock = async (req, res) => {
    try {
        const { itemId, quantityChange } = req.body;
        const item = await Inventory.findById(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        item.quantity += quantityChange;
        await item.save();

        res.status(200).json({ message: 'Stock updated successfully', item });
    } catch (err) {
        res.status(500).json({ message: 'Error updating stock', error: err.message });
    }
};

exports.getInventory = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching inventory', error: err.message });
    }
};

exports.getExpiryAlerts = async (req, res) => {
    try {
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

        const items = await Inventory.find({
            expiryDate: { $lte: thirtyDaysFromNow }
        });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expiry alerts', error: err.message });
    }
};
