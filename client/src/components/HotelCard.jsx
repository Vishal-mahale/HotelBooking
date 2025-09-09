import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

function HotelCard({ room, index }) {
  return (
    <div>
      <Link
        to={"/rooms/" + room._id}
        onClick={() => scrollTo(0, 0)}
        className="relative w-full max-w-sm overflow-hidden bg-white text-gray-500 shadow-md"
      >
        <img
          src={room.images[0]}
          alt={room?.hotel?.name}
          className="w-full h-48 object-cover rounded-xl"
        />

        {index % 2 === 0 && (
          <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full">
            Best sellers
          </p>
        )}

        <div className="p-4 pt-5">
          <div className="flex items-center justify-between">
            <p className="font-playfair text-xl font-medium text-gray-800">
              {room.hotel.name}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <img src={assets.starIconFilled} alt="star-icon" /> 4.5
          </div>
          <div className="flex items-center gap-1 text-sm">
            <img src={assets.locationFilledIcon} alt="location-icon" />
            <span>{room.hotel.address}</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p>
              <span className="text-xl text-gray-800">
                ${room.pricePerNight}
              </span>{" "}
              night
            </p>
            <button className="text-sm font-medium px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-all cursor-pointer">
              Book Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCard;
