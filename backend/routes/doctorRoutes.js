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

// Create new doctor
router.post('/', async (req, res) => {
    try {
        const doctor = new doctorModel(req.body);
        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Update doctor
router.put('/:id', async (req, res) => {
    try {
        const doctor = await doctorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



export default router;
