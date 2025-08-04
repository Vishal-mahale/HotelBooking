import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  createTestimonial,
  getTestimonials
} from '../controllers/testimonialController.js'

const router = express.Router()

router.post('/', protect, createTestimonial)
router.get('/', getTestimonials)

export default router
