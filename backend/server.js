import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import dotenv from 'dotenv'

dotenv.config();    

connectDB()

// app config
const app = express()
const PORT = process.env.PORT || 4000

// middleware
app.use(express.json()) 
app.use(cors())

// api endpoints
app.get('/',(req,res)=>{
    res.send('API working!')
})

app.listen(PORT, ()=>{
    console.log("Started at",PORT)
})