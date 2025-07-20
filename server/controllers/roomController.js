import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'
import cloudinary from 'cloudinary'


export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body
    const hotel = await Hotel.findOne({ owner: req.auth.userId })

    console.log("Hotel controller");
    

    if (!hotel) {
      return res.json({
        success: false,
        message: 'Hotel not found for the authenticated user.'
      })
    }

    // Upload images to cloudinary
    const uploadImages = req.files.map(async file => {
      const response = await cloudinary.uploader.upload(file.path)
      return response.secure_url
    })
    
    // Check if any images were uploaded.wait for mages to complete.
    const images = await Promise.all(uploadImages)

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images
    })

    res.json({
      success: true,
      message: 'Room created successfully'
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

// Controller to get all the rooms
export const getRoom = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: 'hotel',
        populate: {
          path: 'owner',
          select: 'image'
        }
      })
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      rooms
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

//API to get all the rooms from the specific hotels.(of owners)
export const getOwnersRooms = async (req, res) => {
  try {
    const HotelData = await Hotel.findOne({ owner: req.auth.userId })
    const rooms = await Room.find({ hotel: HotelData._id.toString() }).populate(
      'hotel'
    )
    res.json({
      success: true,
      rooms
    })
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    })
  }
}




export const toggleRoomAvailability = async (req, res) => {
  try {
    
    const { roomId } = req.body
    const room = await Room.findById(roomId)
    if (!room) {
      return res.json({
        success: false,
        message: 'Room not found'
      })
    }

    room.isAvailable = !room.isAvailable // Toggle availability
    await room.save()

    res.json({
      success: true,
      message: `Room is now ${
        room.isAvailable ? 'available' : 'not available'
      }`,
      room
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}
