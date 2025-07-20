import User from '../models/User.js'
import { Webhook } from 'svix'

const clerkWebHooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    // Getting headers
    const headers = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature']
    }
    // Verify the webhook headers
    await webhook.verify(JSON.stringify(req.body), headers)

    // Getting data from request body
    const { data, type } = req.body

    // Switch case for the different Events

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          username: data.first_name + ' ' + data.last_name,
          image: data.image_url
        }
        await User.create(userData)
        break
      }
      case 'user.updated': {
        await User.findByIdAndUpdate(data.id, userData)
        break
      }
      case 'user.deleted': {
        await User.findByIdAndDelete(data.id)
        break
      }
      default:
        break
    }
    res.json({ success: true, message: 'Webhook received successfully' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export default clerkWebHooks
