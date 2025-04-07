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



export default router;
