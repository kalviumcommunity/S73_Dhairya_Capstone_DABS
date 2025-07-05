import express from 'express';
import appointmentModel from '../model/appointmentModel.js';

const router = express.Router();

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await appointmentModel.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get appointments by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ userId: req.params.userId });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get appointments by doctor ID
router.get('/doctor/:docId', async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ docId: req.params.docId });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new appointment
router.post('/', async (req, res) => {
    try {
        const appointment = new appointmentModel(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update appointment
router.put('/:id', async (req, res) => {
    try {
        const appointment = await appointmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
