import stripe from 'stripe'
import Booking from '../models/Booking.js'

// API to handle Stripe webhooks
export const stripeWebHooks = async (req, res) => {

  console.log('Received Stripe webhook:', req.body)

  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
  const sig = req.headers['stripe-signature']
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
  let event
  console.log(stripeInstance, sig, endpointSecret)

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    )
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  console.log('Webhook event received:', event.type, event.id)

  try {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object
      const paymentIntentId = paymentIntent.id

      console.log('PaymentIntent was successful!', paymentIntentId)

      // Get checkout session using the payment intent
      const sessions = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId
        // limit: 1
      })

      const session = sessions.data[0]
      const { bookingId } = session.metadata

      if (!bookingId) {
        console.error('No bookingId found in session metadata:', session.id)
        return res.status(400).json({
          error: 'No bookingId in metadata',
          received: false
        })
      }

      const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paymentMethod: 'Stripe'
      })
      
      console.log('Updated booking:', updatedBooking)

      return res.json({ received: true })
  
    } else {
      console.log(`Unhandled event type ${event.type}`)
      return res.json({ received: true })
    }
  } catch (error) {

    console.error('Error processing webhook event:', error)
    
    return res.status(500).json({
      error: 'Internal server error',
      received: false
    })
    
  }
}
