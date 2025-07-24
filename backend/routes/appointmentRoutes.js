// Updated backend/appointmentRoutes.js
// Adds proper appointment creation with slot checking.

import express from 'express';
import appointmentModel from '../model/appointmentModel.js';
import doctorModel from '../model/doctorModel.js';
import userModel from '../model/userModel.js';

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

// Create new appointment with slot validation
router.post('/', async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime, amount, paymentMethod = 'demo' } = req.body;

        if (!userId || !docId || !slotDate || !slotTime || !amount) {
            return res.status(400).json({ message: 'Missing required fields for appointment.' });
        }

        // Fetch user and doctor data
        const user = await userModel.findById(userId);
        const doctor = await doctorModel.findById(docId);

        if (!user) return res.status(404).json({ message: 'User not found.' });
        if (!doctor) return res.status(404).json({ message: 'Doctor not found.' });

        // Check if slot is available
        const slotKey = `${slotDate}_${slotTime}`;
        if (doctor.slots_booked[slotKey]) {
            return res.status(400).json({ message: 'Slot already booked.' });
        }

        // Create appointment
        const appointment = new appointmentModel({
            userId,
            docId,
            slotDate,
            slotTime,
            userData: user.toObject(),
            docData: doctor.toObject(),
            amount,
            date: Date.now(),
            payment: paymentMethod !== 'demo', // True if not demo
            paymentMethod,
            status: 'confirmed'
        });

        await appointment.save();

        // Update doctor's booked slots
        await doctorModel.findByIdAndUpdate(docId, {
            $set: { [`slots_booked.${slotKey}`]: true }
        });

        res.status(201).json({ message: 'Appointment booked successfully', appointment });
    } catch (error) {
        console.error('Appointment creation error:', error);
        res.status(500).json({ message: 'Server error during booking. Please try again.' });
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
