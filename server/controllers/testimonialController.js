// controllers/testimonialController.js
import Testimonial from '../models/Testimonial.js'
import User from '../models/User.js'

// Create a testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { address, rating, review } = req.body
    const userId = req.user._id // from auth middleware

    const newTestimonial = new Testimonial({
      userId,
      address,
      rating,
      review
    })
    await newTestimonial.save()
    res.status(201).json(newTestimonial)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to create testimonial', error: err.message })
  }
}

// Get all testimonials with user name and image
export const getTestimonials = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 3
    const skip = (page - 1) * limit

    const testimonials = await Testimonial.find()
      .populate('userId', 'name image')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
    const count = await Testimonial.countDocuments()
    res.status(200).json({ testimonials, totalPages: Math.ceil(count / limit) })
    
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch testimonials', error: err.message })
  }
}
