// controllers/testimonialController.js
import Testimonial from '../models/Testimonial.js'

// Create or update a testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { rating, review } = req.body
    const userId = req.user._id // from auth middleware
    let testimonial = await Testimonial.findOne({ userId })
    if (testimonial) {
      // Update existing testimonial
      testimonial.rating = rating
      testimonial.review = review
      testimonial.updatedAt = new Date()
      await testimonial.save()
      return res.status(200).json({
        success: true,
        message: 'Testimonial updated successfully',
        testimonial
      })
    }

    // Otherwise, create a new testimonial
    const newTestimonial = new Testimonial({
      userId,
      rating,
      review
    })
    await newTestimonial.save()
    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      testimonial: newTestimonial,
      username
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create/update testimonial',
      error: err.message
    })
  }
}

// Get all testimonials with user name and image
export const getTestimonials = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 3
    const skip = (page - 1) * limit

    const testimonials = await Testimonial.find()
      .populate('userId', 'username image')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const count = await Testimonial.countDocuments()

    res.status(200).json({
      success: true,
      testimonials,
      totalPages: Math.ceil(count / limit)
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonials',
      error: err.message
    })
  }
}
