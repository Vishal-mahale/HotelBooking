import { protect } from '../middleware/authMiddleware.js'
import express from 'express'
import {
  getUserData,
  storedRecentSerachCities
} from '../controllers/userController.js'

const userRouter = express.Router()

// Route to get user data
userRouter.get('/', protect, getUserData)
userRouter.post('/store-recent-search', protect, storedRecentSerachCities)

export default userRouter
