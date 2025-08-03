import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true }, // Added index for faster lookups
    password: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    fees: { type: Number, required: true },
    address: {
        line1: { type: String, required: true },
        line2: { type: String }
    },
    date: { type: Number, required: true },
    available: { type: Boolean, default: false },
    approved: { type: Boolean, default: false, index: true }, // Added index for faster filtering
    slots_booked: { type: Object, default: {} }
});

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);
export default doctorModel;