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

console.log('MongoDB URI:', process.env.MONGODB_URI);

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
const PORT = process.env.PORT || 5050

// middleware
app.use(express.json());

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


// api endpoints
app.use('/api/users', userRoutes)
app.use('/api/doctors', doctorRoutes) 
app.use('/api/appointments', appointmentRoutes)


app.use(cors({
  origin: ['https://bookmydoc-frontend-dm5l.onrender.com'],
  credentials: true
}));


app.get('/',(req,res)=>{
    res.send('Pong!')
})


app.listen(PORT, ()=>{
    console.log("Started at",`http://localhost:${PORT}`)
})