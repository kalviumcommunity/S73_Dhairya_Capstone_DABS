import express from 'express';
import userModel from '../model/userModel.js';
import doctorModel from '../model/doctorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
router.use(express.json());

// Patient Registration
router.post('/', async (req, res) => {
    try {
        const { name, email, password, role = 'patient' } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ 
            name, 
            email, 
            password: hashedPassword, 
            role: role || 'patient' 
        });
        
        await user.save();
        
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(201).json({ message: 'User registered successfully', user: userResponse });
    } catch (error) {
        console.error('User registration error:', error);
        res.status(500).json({ message: 'Server error during registration. Please try again.' });
    }
});

// Doctor Registration
router.post('/register-doctor', async (req, res) => {
    try {
        const { 
            name, 
            email, 
            password, 
            speciality, 
            experience, 
            degree, 
            about, 
            address, 
            fees 
        } = req.body;

        if (!name || !email || !password || !speciality || !experience || !degree || !about || !address || !fees) {
            return res.status(400).json({ message: 'All fields are required for doctor registration.' });
        }

        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor already exists with this email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const doctor = new doctorModel({
            name,
            email,
            password: hashedPassword,
            speciality,
            experience,
            degree,
            about,
            address: typeof address === 'object' ? address : { line1: address, line2: '' },
            fees: parseInt(fees),
            date: Date.now(),
            available: false,
            approved: false,
            slots_booked: {}
        });

        await doctor.save();
        
        const doctorResponse = doctor.toObject();
        delete doctorResponse.password;
        
        res.status(201).json({ 
            message: 'Doctor registration successful. Awaiting admin approval.', 
            doctor: doctorResponse 
        });
    } catch (error) {
        console.error('Doctor registration error:', error);
        res.status(500).json({ message: 'Server error during doctor registration. Please try again.' });
    }
});

// Combined login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        let user = await userModel.findOne({ email });
        let doctor = null;
        let loginUser = null;
        let role = null;

        if (user) {
            loginUser = user;
            role = user.role || 'patient';
        } else {
            doctor = await doctorModel.findOne({ email });
            if (doctor) {
                loginUser = doctor;
                role = 'doctor';
            }
        }
        
        if (email.toLowerCase() === 'dhairya@bookmydoc.com' && password === 'password123') {
            const token = jwt.sign(
                { id: 'admin_id', role: 'admin' },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '1d' }
            );
            
            return res.json({
                message: 'Admin login successful',
                user: { 
                    id: 'admin_id', 
                    name: 'Admin', 
                    email: 'dhairya@bookmydoc.com', 
                    role: 'admin' 
                },
                token
            });
        }


        if (!loginUser) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, loginUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        if (role === 'doctor' && !loginUser.approved) {
            return res.status(403).json({ message: 'Account pending admin approval.' });
        }

        const token = jwt.sign(
            { id: loginUser._id, role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1d' }
        );

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
        res.status(500).json({ message: 'Server error during login. Please try again.' });
    }
});

export default router;
