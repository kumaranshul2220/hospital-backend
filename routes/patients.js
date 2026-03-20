const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

router.use(authenticate);

router.post('/register', authorize(['Super Admin', 'Admin', 'Receptionist']), patientController.registerPatient);
router.get('/', authorize(['Super Admin', 'Admin', 'Doctor', 'Nurse', 'Receptionist']), patientController.getPatients);

router.post('/admit', authorize(['Super Admin', 'Admin', 'Doctor', 'Nurse']), patientController.admitPatient);
router.post('/discharge', authorize(['Super Admin', 'Admin', 'Doctor']), patientController.dischargePatient);

router.post('/appointment', authorize(['Super Admin', 'Admin', 'Receptionist']), patientController.scheduleAppointment);

module.exports = router;
