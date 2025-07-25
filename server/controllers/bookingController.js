import Booking from '../models/Booking.js'
import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'
// import transporter from '../config/nodemailer.js'

import { sendEmail } from '../config/nodeMailer.js'
import User from '../models/User.js' // If you have a User model

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

// export const createBooking = async (req, res) => {
//   try {
//     const { room, checkInDate, checkOutDate, guests } = req.body
//     const user = req.user._id // Assuming user ID is available in req.user

//     // Check if the room is available
//     const isAvailable = await checkAvailability({
//       checkInDate,
//       checkOutDate,
//       room
//     })
//     if (!isAvailable) {
//       return res.json({
//         success: false,
//         message: 'Room is not available for the selected dates.'
//       })
//     }

//     const roomData = await Room.findById(room).populate('hotel')
//     const pricePerNight = roomData.pricePerNight

//     const checkIn = new Date(checkInDate)
//     const checkOut = new Date(checkOutDate)
//     const timeDifference = checkOut.getTime() - checkIn.getTime()
//     const days = Math.ceil(timeDifference / (1000 * 3600 * 24))
//     const totalPrice = pricePerNight * days

//     const booking = await Booking.create({
//       user,
//       hotel: roomData.hotel._id,
//       room,
//       checkInDate,
//       checkOutDate,
//       guests: +guests,
//       totalPrice
//     })
//     res.json({
//       success: true,
//       message: 'Booking created successfully',
//       booking
//     })
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message
//     })
//   }
// }



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



export const createBooking = async (req, res) => {
  try {

    console.log('Tis is create Booking.')

    const { room, checkInDate, checkOutDate, guests } = req.body
    const userId = req.user._id

    // Check availability
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room
    })
    if (!isAvailable) {
      return res.json({
        success: false,
        message: 'Room is not available for the selected dates....'
      })
    }

    // const roomData = await Room.findById(room).populate('hotel')
    // const pricePerNight = roomData.pricePerNight

    // const checkIn = new Date(checkInDate)
    // const checkOut = new Date(checkOutDate)
    // const timeDifference = checkOut.getTime() - checkIn.getTime()
    // const days = Math.ceil(timeDifference / (1000 * 3600 * 24))
    // const totalPrice = pricePerNight * days

    // const booking = await Booking.create({
    //   user: userId,
    //   hotel: roomData.hotel._id,
    //   room,
    //   checkInDate,
    //   checkOutDate,
    //   guests: +guests,
    //   totalPrice
    // })

    // Fetch user's email
    const user = await User.findById(userId)

    console.log(user)

    // // Send booking confirmation email
    // const emailHtml = `
    //   <h2>Booking Confirmation</h2>
    //   <p>Hello ${user.name},</p>
    //   <p>Your hotel booking has been confirmed. Here are the details:</p>
    //   <ul>
    //     <li><strong>Hotel:</strong> ${roomData.hotel.name}</li>
    //     <li><strong>Room:</strong> ${roomData.name}</li>
    //     <li><strong>Check-in:</strong> ${new Date(
    //       checkInDate
    //     ).toDateString()}</li>
    //     <li><strong>Check-out:</strong> ${new Date(
    //       checkOutDate
    //     ).toDateString()}</li>
    //     <li><strong>Guests:</strong> ${guests}</li>
    //     <li><strong>Total Price:</strong> ₹${totalPrice}</li>
    //   </ul>
    //   <p>Thank you for booking with us!</p>
    // `

    // await sendEmail({
    //   to: user.email,
    //   subject: 'Hotel Booking Confirmation',
    //   html: emailHtml
    // })

    console.log('aFter sebd mail....')

    // res.json({
    //   success: true,
    //   message: 'Booking created successfully.......',
    //   booking
    // })
  } catch (error) {
    console.error(error)
    res.json({
      success: false,
      message: error.message
    })
  }
}
