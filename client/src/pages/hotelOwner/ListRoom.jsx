import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function ListRoom() {
  const [rooms, setRooms] = useState([]);
  const { user, getToken } = useAppContext();

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms/", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      console.log(data);
      
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <div className="">
      <Title
        title="Room Listings"
        subTitle="View, edit or manage all the listed rooms
       . Keep the information up-to-date to provide best experience for users."
        align="left"
        font="outfit"
      />
      <p className="text-gray-500 mt-8"> All Rooms</p>
      <div className="w-full max-w-3xl text-left border border-gray-500 rounded-xl max-h-80 overflow-y-scroll mt-4">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="font-gray-800 font-medium py-3 px-4">Name</th>
              <th className="font-gray-800 font-medium py-3 px-4 max-sm:hidden">
                Facility
              </th>
              <th className="font-gray-800 font-medium py-3 px-4 text-center">
                Price/night
              </th>
              <th className="font-gray-800 font-medium py-3 px-4 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rooms.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 ">
                  {item.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.amenities.join(", ")}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  {item.pricePerNight} $
                </td>
                <td className="py-3 px-4 border-gray-300 text-sm border-t text-red-500 text-center">
                  <label
                    htmlFor=""
                    className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3"
                  >
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                    />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListRoom;
