// Script to seed demo users for BookMyDoc
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './model/userModel.js';
import connectDB from './config/mongodb.js';


// const User = require('./model/userModel');

dotenv.config();

const seedUsers = async () => {
  await connectDB();

  const users = [
    {
      name: 'Dr. Dhairya',
      email: 'dr.dhairya@hospital.com',
      password: await bcrypt.hash('password123', 10),
      role: 'doctor',
    },
    {
      name: 'Dhairya',
      email: 'dhairya@email.com',
      password: await bcrypt.hash('password123', 10),
      role: 'patient',
    },
    {
      name: 'Admin',
      email: 'admin@bookmydoc.com',
      password: await bcrypt.hash('password123', 10),
      role: 'admin',
    },
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

  mongoose.connection.close();
};

seedUsers();
