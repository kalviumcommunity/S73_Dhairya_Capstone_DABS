// Updated backend/doctorRoutes.js
// Adds approval endpoints for admin, pending doctors fetch, and filters approved doctors.
// Also adds slot management for doctors.

import express from 'express';
import doctorModel from '../model/doctorModel.js';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for file uploads (keeping as is, but not used in registration now)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Get all approved doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await doctorModel.find({ available: true, approved: true });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
    try {
        const doctor = await doctorModel.findById(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get pending doctors for admin approval
router.get('/pending', async (req, res) => {
    try {
        const pendingDoctors = await doctorModel.find({ approved: false });
        res.json(pendingDoctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Approve or reject doctor
router.patch('/:id/approve', async (req, res) => {
    try {
        const { approved } = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(
            req.params.id,
            { 
                approved,
                available: approved // Available only if approved
            },
            { new: true }
        );

        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        
        res.json({
            message: approved ? 'Doctor approved' : 'Doctor rejected',
            doctor
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update doctor slots (for doctor dashboard)
router.patch('/:id/slots', async (req, res) => {
    try {
        const { slots_booked } = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(
            req.params.id,
            { slots_booked },
            { new: true }
        );

        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update doctor availability
router.patch('/:id/availability', async (req, res) => {
    try {
        const { available } = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(
            req.params.id,
            { available },
            { new: true }
        );

        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Other routes like seed-demo, get by specialty, etc., remain as is...

export default router;
