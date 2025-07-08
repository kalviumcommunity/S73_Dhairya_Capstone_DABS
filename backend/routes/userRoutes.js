import express from 'express';
import userModel from '../model/userModel.js';
import doctorModel from '../model/doctorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to parse JSON payloads
router.use(express.json());

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

// Create new user (Patient) - Patient Registration
router.post('/', async (req, res) => {
    try {
        const { name, email, password, role = 'patient' } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = new userModel({ 
            name, 
            email, 
            password: hashedPassword, 
            role: role || 'patient' 
        });
        
        await user.save();

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({ 
            message: 'User registered successfully', 
            user: userResponse 
        });
    } catch (error) {
        console.error('User registration error:', error);
        res.status(500).json({ message: error.message });
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

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // First try to find user in userModel
        let user = await userModel.findOne({ email });
        let doctor = null;
        let loginUser = null;
        let role = null;

        if (user) {
            loginUser = user;
            role = user.role || 'patient';
        } else {
            // If not found in userModel, try doctorModel
            doctor = await doctorModel.findOne({ email });
            if (doctor) {
                loginUser = doctor;
                role = 'doctor';
            }
        }

        if (!loginUser) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, loginUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: loginUser._id, role }, 
            process.env.JWT_SECRET || 'your-secret-key', 
            { expiresIn: '1d' }
        );

        // Remove password from response
        const userResponse = loginUser.toObject();
        delete userResponse.password;

        res.json({
            message: 'Login successful',
            user: { 
                id: loginUser._id, 
                name: loginUser.name, 
                email: loginUser.email, 
                role 
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error.' });
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

        // Check if doctor already exists
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor already exists with this email.' });
        }

        // Also check if email exists in user model
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
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
            date: Date.now(),
            available: true
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