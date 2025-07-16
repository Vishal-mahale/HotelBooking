import React, { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

function HotelReg() {
  const { setShowHotelReg, getToken, setIsOwner, toast } = useAppContext();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      
      const { data } = await axios.post(
        '/api/hotels/register',
        { name, address, contact, city },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // toast.error(data.message);
      toast.error(error.message);      
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/70">
      <form
        className="flex bg-white rounded-xl max-w-4xl max-md:mx-2"
        onSubmit={submitHandler}
        onClick={(e) => e.stopPropagation()}
      >
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
            onClick={() => setShowHotelReg(false)}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={contact}
              onChange={(e) => setContact(e.target.value)}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
