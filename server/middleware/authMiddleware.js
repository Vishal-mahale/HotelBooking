import User from '../models/User.js'

export const protect = async (req, res, next) => {

  const { userId } = await req.auth();
  
  if (!userId) {
    return res.json({ success: false, message: 'Unauthorized' })
  }

  const user = await User.findById(userId)
  if (!user) {
    return res.json({ success: false, message: 'User not found' })
  }
  // console.log("This is user " + user);
  req.user = user // Attach user to request object
  next() // Proceed to the next middleware or route handler
}
