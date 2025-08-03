import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true }, // Added index for faster lookups
    password: { type: String, required: true },
    role: { type: String, default: 'patient' },
    phone: { type: String, default: '000000000' },
    address: { type: Object, default: { line1: '', line2: '' } },
    gender: { type: String, default: 'Not Selected' },
    dob: { type: String, default: 'Not Selected' },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;