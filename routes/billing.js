const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

router.use(authenticate);

router.post('/invoice', authorize(['Super Admin', 'Admin', 'Accountant', 'Receptionist']), billingController.createInvoice);
router.patch('/payment', authorize(['Super Admin', 'Admin', 'Accountant']), billingController.updatePayment);
router.get('/', authorize(['Super Admin', 'Admin', 'Accountant']), billingController.getInvoices);

module.exports = router;
