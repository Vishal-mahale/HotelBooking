import React from "react";
import { assets, cities } from "../assets/assets";

function HotelReg() {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/70">
      <form className="flex bg-white rounded-xl max-w-4xl max-md:mx-2">
        <img
          src={assets.regImage}
          alt="reg-image"
          className="w-1/2 rounded-xl hidden md:block"
        />
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <img
            src={assets.closeIcon}
            alt="close-icon"
            className="absolute top-4 right-4 w-4 h-4 cursor-pointer"
          />
          <p className="text-2xl text-semibold mt-6">Register your Hotel</p>
          {/* hotel name */}
          <div className="w-full mt-4">
            <label htmlFor="name" className="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              placeholder="Type here..."
              required
            />
          </div>
          {/* phone */}
          <div className="w-full mt-4">
            <label htmlFor="phone" className="font-medium text-gray-500">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              placeholder="Type here..."
              required
            />
          </div>
          {/* address */}
          <div className="w-full mt-4">
            <label htmlFor="name" className="font-medium text-gray-500">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              placeholder="Type here..."
              required
            />
          </div>
          {/* Select cities from dropdown */}
          <div className="w-full mt-4">
            <label htmlFor="cities" className="font-medium text-gray-500">
              Cities
            </label>
            <select
              name=""
              id="cities"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 transition-all mr-auto px-6 py-2 rounded cursor-pointer mt-6 text-white">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default HotelReg;
