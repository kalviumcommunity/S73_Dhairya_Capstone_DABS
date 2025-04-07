import express from 'express';
import doctorModel from '../model/doctorModel.js';

const router = express.Router();

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await doctorModel.find();
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


export default router;
