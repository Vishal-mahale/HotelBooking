import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

function FeaturedDestinations() {
  
  const { rooms, navigate } = useAppContext();
  
  return (
    rooms?.length > 0 && (
      <div className="px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Title
          title={"Featured Destinations"}
          subTitle={
            "Discover our handpicked selection of a exceptional properties around the world, offering unparalleledd luxery and unforgettable experiences."
          }
        ></Title>

        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {rooms?.slice(0, 4).map((room, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/4">
              <HotelCard room={room} index={index} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            className="px-6 py-3 bg-white font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all duration-200"
            onClick={() => {
              navigate("/rooms");
              scrollTo(0, 0);
            }}
          >
            View all destinations
          </button>
        </div>
      </div>
    )
  );
}

export default FeaturedDestinations;
