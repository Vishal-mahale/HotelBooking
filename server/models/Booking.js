import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      ref: 'User'
    },
    hotel: {
      type: String,
      required: true,
      ref: 'Hotel'
    },
    room: {
      type: String,
      required: true,
      ref: 'Room',
    },
    checkInDate: {
      type: Date,
      required: true
    },
    checkOutDate: {
      type: Date,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'pending'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      default : "pay at hotel",
      required: true
    },
    isPaid: {
      type: Boolean,
      default: false
    }, 
  },
  { timestamps: true }
)

const Booking = mongoose.model('Booking', bookingSchema)
export default Booking
