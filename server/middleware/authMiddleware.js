import User from '../models/User.js'

export const protect = async (req, res, next) => {
  const userId = req.auth // Assuming req.auth is populated by Clerk middleware
  if (!userId) {
    return res.json({ success: false, message: 'Unauthorized' })
  }

  const user = await User.findById(userId)
  if (!user) {
    return res.json({ success: false, message: 'User not found' })
  }

  req.user = user // Attach user to request object
  next() // Proceed to the next middleware or route handler
}
