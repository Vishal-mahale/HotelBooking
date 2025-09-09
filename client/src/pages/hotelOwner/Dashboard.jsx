import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import { assets, dashboardDummyData } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";

function Dashboard() {
  const { currency, getToken, user, toast } = useAppContext();
  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/bookings/hotel", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        console.log(data.dashboardData);
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Log the full error object
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Add useEffect to log state changes
  useEffect(() => {}, [dashboardData]);

  return (
    <div className="">
      <Title
        title="Dashboard"
        font="outfit"
        subTitle="Monitor your room listings, track bookings and analyze revenue-all in one place. Stay updated with the real-time insights to ensure smooth operations"
        align="left"
      />

      <div className="flex gap-4 py-8">
        {/* total booking */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalBookingIcon}
            alt="totalBooking-icon"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Booking</p>
            <p className="text-base text-center text-neutral-400">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        {/* total revenue */}
        <div className="bg-primary/3 border border-primary/3 rounded flex p-4 pr-8">
          <img
            src={assets.totalRevenueIcon}
            alt="totalBooking-icon"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-base text-neutral-400 text-center">
              {dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h1 className="text-xl text-blue-900/70 font-medium mb-5">
        Recent Bookings
      </h1>
      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                User Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center max-sm:hidden">
                Room Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Total Amount
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData.bookings?.length > 0 ? (
              dashboardData.bookings.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                    {item.user?.username || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center max-sm:hidden">
                    {item.room?.roomType || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                    {currency}
                    {item.totalPrice || 0}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 flex text-center">
                    <button
                      className={`py-1 px-3 text-xs rounded-full mx-auto 
                      ${
                        item.isPaid
                          ? "bg-green-200 text-green-600"
                          : "bg-amber-200 text-yellow-600"
                      }`}
                    >
                      {item.isPaid ? "Completed" : "Pending"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-4 text-gray-500 text-center">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
