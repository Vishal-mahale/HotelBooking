import React, { useEffect,useState } from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

function RecommendedHotels() {

  const { rooms, recentSearchCities, setRecentSearchCities,navigate } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filteredHotels = () => {
    const filteredHotels = rooms
      .slice()
      .filter((room) => recentSearchCities.includes(room.hotel.city[0]));
    setRecommended(filteredHotels);
  };
  //It creates a shallow copy of the rooms array.
  // The original rooms array remains unchanged, no matter what you do to the copied one.

  useEffect(() => {
    filteredHotels();

  }, [rooms, recentSearchCities]);

  return (
    recommended?.length > 0 && (
      <div className="px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Title
          title={"Recommended Hotels"}
          subTitle={
            "Discover our handpicked selection of a exceptional properties around the world, offering unparalleledd luxery and unforgettable experiences."
          }
        ></Title>

        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {recommended?.slice(0, 4).map((room, index) => (
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

export default RecommendedHotels;
