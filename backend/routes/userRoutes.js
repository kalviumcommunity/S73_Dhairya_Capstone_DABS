import express from 'express';
import userModel from '../model/userModel.js';
import doctorModel from '../model/doctorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';

const router = express.Router();

// Middleware to parse JSON payloads
router.use(express.json());



const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new user (Patient)
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });

// Create new user
router.post('/', async (req, res) => {
    try {
        const user = new userModel(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
});

// Update user
router.put('/:id', async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Combined login route for both users and doctors
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check in both collections
        let user = await userModel.findOne({ email });
        let doctor = await doctorModel.findOne({ email });
        
        // If no user or doctor found
        if (!user && !doctor) {
            return res.status(404).json({ message: 'User not found' });
        }

        const account = user || doctor;
        const role = user ? 'user' : 'doctor';

        // Verify password
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create token
        const token = jwt.sign(
            { id: account._id, role },
            'your_jwt_secret',  
            { expiresIn: '1d' }
        );  

        // Remove password from response
        const accountData = account.toObject();
        delete accountData.password;

        res.json({
            message: 'Login successful',
            user: { ...accountData, role },
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Doctor registration route
router.post('/register-doctor', async (req, res) => {
    try {
        const { name, email, password, speciality, experience, about, address, fees, degree } = req.body;

        // Validate required fields
        if (!name || !email || !password || !speciality || !experience || !about || !address || !fees || !degree) {
            return res.status(400).json({ message: 'All fields are required for doctor registration.' });
        }

        // Check if doctor exists
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor already exists with this email.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create doctor
        const doctor = new doctorModel({
            name,
            email,
            password: hashedPassword,
            speciality,
            experience,
            degree,
            about,
            fees: Number(fees),
            address,
            date: Date.now()
        });

        await doctor.save();

        // Remove password from response
        const doctorResponse = doctor.toObject();
        delete doctorResponse.password;

        res.status(201).json({
            message: 'Doctor registered successfully',
            doctor: doctorResponse
        });
    } catch (error) {
        console.error('Doctor registration error:', error);
        res.status(500).json({ 
            message: 'Registration failed', 
            error: error.message 
        });
    }
});


export default router;
