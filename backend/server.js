import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import userRoutes from './routes/userRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import dotenv from 'dotenv'
dotenv.config();    

// Add this line to check if the environment variable is loaded
console.log('MongoDB URI:', process.env.MONGODB_URI);

connectDB()

// app config
const app = express()
const PORT = process.env.PORT || 4000

// middleware
app.use(express.json()) 
app.use(cors())

// api endpoints
app.use('/api/users', userRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/appointments', appointmentRoutes)

app.get('/',(req,res)=>{
    res.send('API working!')
})

app.listen(PORT, ()=>{
    console.log("Started at",`http://localhost:${PORT}`)
})
