import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js'
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from './controllers/clerkWebhooks.js'
import userRouter from './routes/userRouter.js'
import hotelRouter from './routes/hotelRouter.js'
import connectCloudinary from './config/cloudinary.js'
import roomRouter from './routes/roomRouter.js'
import bookingRouter from './routes/bookingRoute.js'

connectDB() // Connect to MongoDB
connectCloudinary() // Connect to Cloudinary    

const app = express() //to enable cross origin resource sharing

app.use(cors())
app.use(express.json()) // to parse JSON bodies
app.use(clerkMiddleware())
app.use('/api/clerk', clerkWebHooks)


app.get('/', (req, res) => {
  res.send('Hello World. How you doin.')
})

app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter) // Serve static files from the uploads directory
app.use('/api/bookings', bookingRouter) 

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
