const Billing = require('../models/Billing');
const Patient = require('../models/Patient');

exports.createInvoice = async (req, res) => {
    try {
        const { patientId, items, admissionId, appointmentId, discount, tax, paymentMethod } = req.body;

        const totalAmount = items.reduce((sum, item) => sum + (item.amount * (item.quantity || 1)), 0);
        const netAmount = totalAmount - (discount || 0) + (tax || 0);

        const invoiceNo = `INV-${Date.now()}`;

        const billing = new Billing({
            patientId,
            admissionId,
            appointmentId,
            invoiceNo,
            items,
            totalAmount,
            discount,
            tax,
            netAmount,
            paymentMethod
        });

        await billing.save();
        res.status(201).json({ message: 'Invoice created successfully', billing });
    } catch (err) {
        res.status(500).json({ message: 'Error creating invoice', error: err.message });
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const { billingId, paidAmount, paymentStatus } = req.body;
        const billing = await Billing.findById(billingId);
        if (!billing) return res.status(404).json({ message: 'Invoice not found' });

        billing.paidAmount = paidAmount;
        billing.paymentStatus = paymentStatus;
        await billing.save();

        res.status(200).json({ message: 'Payment updated successfully', billing });
    } catch (err) {
        res.status(500).json({ message: 'Error updating payment', error: err.message });
    }
};

exports.getInvoices = async (req, res) => {
    try {
        const invoices = await Billing.find().populate('patientId', 'name patientId');
        res.status(200).json(invoices);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching invoices', error: err.message });
    }
};
