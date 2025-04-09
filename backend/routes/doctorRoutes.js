import express from 'express';
import doctorModel from '../model/doctorModel.js';

import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await doctorModel.find({ available: true });


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


// Get doctors by specialty
router.get('/specialty/:specialty', async (req, res) => {
    try {
        const doctors = await doctorModel.find({
            speciality: req.params.specialty,
            available: true
        });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new doctor
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, email, password, speciality, experience, about, address, fees, degree, date } = req.body;

        if (!name || !email || !password || !speciality || !experience || !about || !address || !fees || !degree || !date) {
            return res.status(400).json({ message: 'All fields are required for doctor registration.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const doctor = new doctorModel({
            ...req.body,
            password: hashedPassword,
            image: req.file ? req.file.path : null,
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

// Update doctor slots
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
