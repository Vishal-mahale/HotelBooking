import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  assets,
  facilityIcons,
  roomCommonData,
  roomsDummyData,
} from "../assets/assets";
import StarRating from "../components/StarRating";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

function RoomDetails() {
  const { user, rooms, getToken, navigate, toast } = useAppContext();
  const { id } = useParams();
  const [mainImage, setmainImage] = useState(null);
  const [room, setRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isAavailable, setIsAavailable] = useState(false);

  const checkAvailability = async () => {
    try {
      if (
        !checkInDate ||
        !checkOutDate ||
        new Date(checkOutDate) <= new Date(checkInDate)
      ) {
        toast.error("Invalid dates");
        return;
      }
      const { data } = await axios.post("/api/bookings/check-availability", {
        checkInDate,
        checkOutDate,
        room: id,
      });

      if (data.success) {
        if (data.isAvailable) {
          setIsAavailable(true);
          toast.success("Room is available");
        } else {
          setIsAavailable(false);
          toast.error("Room is not available");
        }
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!isAavailable) {
        return checkAvailability();
      } else {
        const { data } = await axios.post(
          "/api/bookings/book",
          {
            checkInDate,
            checkOutDate,
            guests,
            room: id,
            PaymentMethod: "Pay at the hotel.",
          },
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          }
        );

        if (data.success) {
          toast.success(data.message);
          navigate("/my-bookings");
          scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const room = rooms.find((room) => room._id === id);
    room && setRoom(room);
    room && setmainImage(room.images[0]);
  }, [rooms]);

  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:;text-4xl font-playfair">
            {room.hotel.name}{" "}
            <span className="font-inter text-sm">({room.roomType})</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20%
          </p>
        </div>
        {/* rooms rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating></StarRating>
          <p className="ml-2">200+ reviews</p>
        </div>

        <div className="flex items-center gap-1 mt-2 text-gray-500">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>

        {/* room images */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="main-image"
              className="w-full object-cover rounded-xl shadow-lg "
            />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  src={image}
                  alt="hotel-image"
                  key={index}
                  onClick={() => setmainImage(image)}
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                    image === mainImage && "outline-3 outline-orange-500"
                  }`}
                />
              ))}
          </div>
        </div>

        {/* rooms highlights */}
        <div className="flex flex-col md:flex-row mt-10 md:justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                  key={index}
                >
                  <img
                    src={facilityIcons[item]}
                    alt="item"
                    className="w-5 h-5"
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-2xl font-medium">${room.pricePerNight}/night</p>
        </div>

        {/* check in and check out form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
        >
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-6 md:gap-10 text-gray-500">
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check in
              </label>
              <input
                type="date"
                id="checkIn"
                placeholder="Check in"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none required"
                onChange={(e) => setCheckInDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="w-px h-15 bg-gray-300 max-md:hidden"></div>

            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check Out
              </label>
              <input
                type="date"
                id="checkOut"
                onChange={(e) => setCheckOutDate(e.target.value)}
                disabled={!checkInDate}
                min={checkInDate}
                placeholder="Check Out"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none required"
              />
            </div>
            <div className="w-px h-15 bg-gray-300 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder="Guests"
                className="max-w-20 rounded border border-gray-300 px-1 py-2 mt-1.5 outline-none required"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer max-lg:mt-6 max-xl:mt-6"
          >
            {isAavailable ? "Bool Now" : "Check Availability"}
          </button>
        </form>

        {/* Common Specifiications */}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-2">
              <img
                src={spec.icon}
                alt={`${spec.title}-icon`}
                className="w-6.5"
              />
              <div>
                <p className="text-base">{spec.title}</p>
                <p className="text-gray-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl border-y border-gray-300 my-10 py-10 text-gray-500">
          <p>
            Guests will be allocated on the ground floor according to the
            availability. You get a confertable two bedroom apartment has a true
            city feeling. The price quoted is for the two guests, at the guests
            slot please mark the number of gustes to get the exat price of
            group. Guests will get allocated the ground according to the
            availability.You get a confertable two bedroom apartment has a true
            city feeling.
          </p>
        </div>

        {/* hosted by */}
        <div className="flex flex-col flex-start gap-4">
          <div className="flex gap-4">
            <img
              src={room.hotel.owner.image}
              alt="Host"
              className="h-14 w-14 md:w-18 md:h-18 rounded-full"
            />
            <div className="">
              <p className="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
              <div className="flex items-center mt-1">
                <StarRating />
                <p className="ml-2">200+ Reviews</p>
              </div>
            </div>
          </div>
          <button className="px-6 py-2.5 mt-5 rounded text-white bg-blue-500 transition-all cursor-ppointer hover:bg-blue-700 max-w-50">
            Contact Now
          </button>
        </div>
      </div>
    )
  );
}

export default RoomDetails;
