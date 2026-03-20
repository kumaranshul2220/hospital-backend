const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

router.use(authenticate);

router.post('/item', authorize(['Super Admin', 'Admin', 'Pharmacy Staff']), inventoryController.addItem);
router.patch('/stock', authorize(['Super Admin', 'Admin', 'Pharmacy Staff']), inventoryController.updateStock);
router.get('/', authorize(['Super Admin', 'Admin', 'Pharmacy Staff', 'Doctor']), inventoryController.getInventory);
router.get('/expiry-alerts', authorize(['Super Admin', 'Admin', 'Pharmacy Staff']), inventoryController.getExpiryAlerts);

module.exports = router;
