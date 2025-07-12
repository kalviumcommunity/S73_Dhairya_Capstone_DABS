// Script to seed demo users for BookMyDoc
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './model/userModel.js';
import Doctor from './model/doctorModel.js';
import mongoose from 'mongoose';

// Define Admin model if not exists
let Admin;
try {
  Admin = mongoose.model('admin');
} catch {
  const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' }
  });
  Admin = mongoose.model('admin', adminSchema);
}
import connectDB from './config/mongodb.js';


// const User = require('./model/userModel');

dotenv.config();

const seedUsers = async () => {
  await connectDB();

  const users = [
    {
      name: 'Dhairya',
      email: 'dhairya@email.com',
      password: await bcrypt.hash('password123', 10),
      role: 'patient',
    }
  ];
  // Seed admin in Admin collection
  const admins = [
    {
      name: 'Admin',
      email: 'admin@bookmydoc.com',
      password: await bcrypt.hash('password123', 10),
      role: 'admin',
    }
  ];

  // Seed admins
  for (const admin of admins) {
    const exists = await Admin.findOne({ email: admin.email });
    if (!exists) {
      await Admin.create(admin);
      console.log(`Created admin: ${admin.email}`);
    } else {
      console.log(`Admin already exists: ${admin.email}`);
    }
  }

  // Seed doctor in Doctor collection
  const doctors = [
    {
      name: 'Dr. Dhairya',
      email: 'dr.dhairya@hospital.com',
      password: await bcrypt.hash('password123', 10),
      speciality: 'Cardiologist',
      degree: 'MBBS, MD',
      experience: '10 years',
      about: 'Experienced cardiologist.',
      fees: 800,
      address: { line1: 'Apollo Hospital, Delhi', line2: '' },
      date: Date.now(),
      available: true
    }
  ];

  for (const user of users) {
    const exists = await User.findOne({ email: user.email });
    if (!exists) {
      await User.create(user);
      console.log(`Created user: ${user.email}`);
    } else {
      console.log(`User already exists: ${user.email}`);
    }
  }

  // Seed doctors
  for (const doc of doctors) {
    const exists = await Doctor.findOne({ email: doc.email });
    if (!exists) {
      await Doctor.create(doc);
      console.log(`Created doctor: ${doc.email}`);
    } else {
      console.log(`Doctor already exists: ${doc.email}`);
    }
  }

  mongoose.connection.close();
};

seedUsers();
