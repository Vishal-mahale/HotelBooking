import stripe from 'stripe'
import Booking from '../models/Booking.js'


// API to handle Stripe webhooks

export const stripeWebHooks = async (req, res) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
  const sig = req.headers['stripe-signature']
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
  let event

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    )
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type == 'payment_intent.succeeded') {
    const paymentIntent = event.data.object
    const paymentIntentId = paymentIntent.id

    console.log('PaymentIntent was successful!', paymentIntent)

    const session = await stripeInstance.checkout.sessions.list({
      payment_intent: paymentIntentId
    })

    const { bookingId } = session.data[0].metadata

    await Booking.findByIdAndUpdate(bookingId, {
      isPaid: true,
      paymentId: paymentIntentId
    })
  } else {
    console.log('Unhandled event type:', event.type)
  }
  res.json({ received: true })
}
