import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { registerHotel } from '../controllers/hotelController.js';

const hotelRouter = express.Router();

// Route to register a hotel
hotelRouter.post('/register', protect, registerHotel);

export default hotelRouter;
