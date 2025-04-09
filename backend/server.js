import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config();    

// Add this line to check if the environment variable is loaded
console.log('MongoDB URI:', process.env.MONGODB_URI);

connectDB()

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app config
const app = express()
const PORT = process.env.PORT || 4000

// middleware
app.use(cors());
app.use(express.json());

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// api endpoints
app.use('/api/users', userRoutes)
app.use('/api/appointments', appointmentRoutes)

app.get('/',(req,res)=>{
    res.send('API working!')
})

app.listen(PORT, ()=>{
    console.log("Started at",`http://localhost:${PORT}`)
})