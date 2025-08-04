import React from 'react';

const AboutUs = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="max-w-4xl bg-white shadow-xl rounded-2xl p-10 text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">About Us</h1>
        <p className="mb-4 text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-blue-500">QuickStay</span>, your trusted platform for hassle-free hotel bookings. Whether you're traveling for business or leisure, our goal is to make your stay comfortable, affordable, and memorable.
        </p>
        <p className="mb-4 text-lg leading-relaxed">
          Founded in 2025, QuickStay was created with a vision to connect travelers with top-rated hotels across the country. We provide a smooth booking experience, competitive pricing, verified hotel listings, and secure payments.
        </p>
        <p className="mb-4 text-lg leading-relaxed">
          With a growing network of partners and a commitment to customer satisfaction, we aim to become your go-to travel companion. Thank you for choosing us!
        </p>
        <p className="text-sm text-gray-500 mt-6">
          For inquiries, feel free to <a href="/contact" className="text-blue-600 underline">contact us</a>.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
