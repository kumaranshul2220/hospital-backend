const Patient = require('../models/Patient');
const Admission = require('../models/Admission');
const Appointment = require('../models/Appointment');
const Bed = require('../models/Bed');

exports.registerPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json({ message: 'Patient registered successfully', patient });
    } catch (err) {
        res.status(500).json({ message: 'Error registering patient', error: err.message });
    }
};

exports.admitPatient = async (req, res) => {
    try {
        const { patientId, wardId, bedId, attendingDoctorId, reasonForAdmission } = req.body;

        const bed = await Bed.findById(bedId);
        if (!bed || bed.status !== 'Available') {
            return res.status(400).json({ message: 'Bed is not available' });
        }

        const admission = new Admission({ patientId, wardId, bedId, attendingDoctorId, reasonForAdmission });
        await admission.save();

        bed.status = 'Occupied';
        await bed.save();

        res.status(201).json({ message: 'Patient admitted successfully', admission });
    } catch (err) {
        res.status(500).json({ message: 'Error admitting patient', error: err.message });
    }
};

exports.dischargePatient = async (req, res) => {
    try {
        const { admissionId, dischargeSummary } = req.body;

        const admission = await Admission.findById(admissionId);
        if (!admission || admission.status !== 'Admitted') {
            return res.status(404).json({ message: 'Active admission not found' });
        }

        admission.status = 'Discharged';
        admission.dischargeDate = new Date();
        admission.dischargeSummary = dischargeSummary;
        await admission.save();

        const bed = await Bed.findById(admission.bedId);
        if (bed) {
            bed.status = 'Available';
            await bed.save();
        }

        res.status(200).json({ message: 'Patient discharged successfully', admission });
    } catch (err) {
        res.status(500).json({ message: 'Error discharging patient', error: err.message });
    }
};

exports.scheduleAppointment = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json({ message: 'Appointment scheduled successfully', appointment });
    } catch (err) {
        res.status(500).json({ message: 'Error scheduling appointment', error: err.message });
    }
};

exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching patients', error: err.message });
    }
};
