import React, { useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/Title";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";

function AddRoom() {
  const { getToken, toast } = useAppContext();

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: {
      "Free Wifi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !inputs.amenities ||
      !Object.values(images).some((image) => image)
    ) {
      toast.error("Please fill all the details....");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append("amenities", JSON.stringify(amenities));

      Object.keys(images).forEach((key) => {
        images[key] && formData.append("images", images[key]);
      });
      
      const response = await axios.post("/api/rooms/", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      const data = response.data
      console.log(data);
      
      if (data.success) {
        toast.success(data.message);
        setInputs({
          roomType: "",
          pricePerNight: "",
          amenities: {
            "Free Wifi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
          },
        });
        setImages({ image1: null, image2: null, image3: null, image4: null });
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-10 pb-10">
      <form
        className="bg-white p-6 rounded-xl shadow-md"
        onSubmit={handleSubmit}
      >
        <Title
          title="Add Room"
          font="outfit"
          subtitle="Fill in the details carefully and provide accurate room details, pricing and amenities to enhance your user booking experience."
          align="left"
        />

        {/* Upload area for images */}
        <p className="text-gray-800 font-medium mt-10">Images</p>
        <div className="grid grid-cols-2 sm:flex gap-4 my-4 flex-wrap">
          {Object.keys(images).map((key) => (
            <label
              htmlFor={`roomImages${key}`}
              key={key}
              className="cursor-pointer"
            >
              <img
                className="max-h-32 w-32 object-cover rounded-md border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all"
                src={
                  images[key]
                    ? URL.createObjectURL(images[key])
                    : assets.uploadArea
                }
                alt={`roomImages${key}`}
              />
              <input
                type="file"
                accept="image/*"
                id={`roomImages${key}`}
                className="hidden"
                onChange={(e) =>
                  setImages({ ...images, [key]: e.target.files[0] })
                }
              />
            </label>
          ))}
        </div>

        {/* Room Type and Price */}
        <div className="w-full flex max-sm:flex-col sm:gap-6 mt-4">
          <div className="flex-1 max-w-xs">
            <p className="text-gray-800 font-medium">Room Type</p>
            <select
              value={inputs.roomType}
              onChange={(e) =>
                setInputs({ ...inputs, roomType: e.target.value })
              }
              className="border mt-1 border-gray-300 rounded-md p-2 w-full text-gray-600"
            >
              <option value="">Select Room Type</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Luxury Room">Luxury Room</option>
              <option value="Family Suite">Family Suite</option>
            </select>
          </div>

          <div className="max-w-xs">
            <p className="text-gray-800 font-medium">
              Price <span className="text-sm text-gray-500">/night</span>
            </p>
            <input
              type="number"
              placeholder="0"
              className="border border-gray-300 mt-1 rounded-md p-2 w-28 text-gray-600"
              value={inputs.pricePerNight}
              onChange={(e) =>
                setInputs({ ...inputs, pricePerNight: e.target.value })
              }
            />
          </div>
        </div>

        {/* Amenities */}
        <p className="mt-6 text-gray-800 font-medium">Amenities</p>
        <div className="flex flex-col gap-2 mt-2 text-gray-600 max-w-md">
          {Object.keys(inputs.amenities).map((amenity, index) => (
            <label key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`amenities${index + 1}`}
                checked={inputs.amenities[amenity]}
                onChange={() =>
                  setInputs({
                    ...inputs,
                    amenities: {
                      ...inputs.amenities,
                      [amenity]: !inputs.amenities[amenity],
                    },
                  })
                }
              />
              <span className="ml-2">{amenity}</span>
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 text-white px-8 py-2 rounded-lg my-8 shadow-md transition-all"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Room"}
        </button>
      </form>
    </div>
  );
}

export default AddRoom;
