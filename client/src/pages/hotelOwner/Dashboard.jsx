import React, { useState } from "react";
import Title from "../../components/Title";
import { assets, dashboardDummyData } from "../../assets/assets";

function Dashboard() {
  
  const [dashboardData, setdashboardData] = useState(dashboardDummyData);

  return (
    <div className="">
      <Title
        title="Dashboard"
        font="outfit"
        subTitle="Monitor your room listings, track bookings and analyze revenue-all in one place. Stay updated with the real-time insights to ensure smooth operations"
        align="left"
      ></Title>

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
                total Amount
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData.bookings.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  {item.user.username}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center max-sm:hidden">
                  {item.room.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  {item.totalPrice}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 flex text-center">
                  <button
                    className={`py-1 px-3 text-xs rounded-full mx-auto 
                    ${
                      item.isPaid
                        ? "bg-green-200 text-green-600 "
                        : "bg-amber-200 text-yello-600"
                    } `}
                  >
                    {item.isPaid ? "Completed" : "Pending"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
