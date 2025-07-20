// import nodemailer from 'nodemailer'

// Create a test account or replace with real credentials.
// const transporter = nodemailer.createTransport({
//   host: 'smtp-relay.brevo.com',
//   port: 587,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS
//   }
// })



// transporter
//   .verify()
//   .then(() => console.log('SMTP connection OK'))
//   .catch(err => console.error('SMTP error:', err))

// const testMailOptions = {
//   from: 'vishal070699@gmail.com', // Use a domain you've verified in Brevo
//   to: 'vmahale799@gmail.com', // Your personal email for testing
//   subject: 'Test Booking Confirmation',
//   html: '<p>This is a test email from your booking system.</p>'
// }
// const testEmailResult = await transporter.sendMail(testMailOptions)
// console.log('Test email result:', testEmailResult)

// export default transporter
