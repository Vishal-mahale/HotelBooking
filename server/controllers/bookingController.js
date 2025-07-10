import Booking from '../models/Booking.js'
import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'

// function to check avilability of a room
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const booking = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate }
    })

    const isAvailable = booking.length === 0
    return isAvailable
  } catch (error) {
    console.error('Error checking room availability:', error.message)
  }
}

// API to check availability of a room
export const checkAvailabilityApi = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, room } = req.body
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room
    })
    res.json({ success: true, isAvailable })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body
    const user = req.user._id // Assuming user ID is available in req.user

    // Check if the room is available
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room
    })

    if (!isAvailable) {
      return res.json({
        success: false,
        message: 'Room is not available for the selected dates'
      })
    }

    const roomData = await Room.findById(room).populate('hotel')
    const totalPrice = roomData.pricePerNight

    const checkIn = new Date(checkInDate)
    const checkOut = new Date(checkOutDate)
    const timeDifference = checkOut.getTime() - checkIn.getTime()
    const days = Math.ceil(timeDifference / (1000 * 3600 * 24))
    totalPrice *= days

    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice
    })

    res.json({
      success: true,
      message: 'Booking created successfully',
      booking
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

// Api to get the all the bbooking for the user
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id // Assuming user ID is available in req.user
    const bookings = await Booking.find({ user: userId })
      .populate('room')
      .populate('hotel')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      bookings
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.user._id })
    if (!hotel) {
      return res.json({
        success: false,
        message: 'Hotel not found'
      })
    }

    const bookings = await Booking.find({ hotel: req.user._id })
      .populate('room hotel user')
      .sort({ createdAt: -1 })
    const totalBookings = bookings.length
    
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    )

    res.json({
      success: true,
      dashboardData: { bookings, totalBookings, totalRevenue }
    })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}
