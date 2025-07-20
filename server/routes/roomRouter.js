import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  createRoom,
  getRoom,
  getOwnersRooms,
  toggleRoomAvailability
} from '../controllers/roomController.js'
import upload from '../middleware/uploadMiddleware.js'

const roomRouter = express.Router()

roomRouter.post('/', upload.array('images', 4), protect, createRoom)
roomRouter.get('/', getRoom)
roomRouter.get('/owner', protect, getOwnersRooms)
roomRouter.post('/toggle-availability', protect, toggleRoomAvailability)

export default roomRouter
