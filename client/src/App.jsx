import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { useLocation, Routes, Route } from "react-router-dom";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
// import Mybookings from "./pages/Mybookings";
import Mybookings from "./pages/MyBookings"; 

import HotelReg from "./components/HotelReg";
import Layout from "./pages/hotelOwner/Layout";
import Dashboard from "./pages/hotelOwner/Dashboard";
import ListRoom from "./pages/hotelOwner/ListRoom";
import AddRoom from "./pages/hotelOwner/AddRoom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import Loader from "./components/Loader";

import Testimonials from "./pages/Testimonials";
import AboutUs from "./pages/AboutUs";

function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const { showHotelReg } = useAppContext();

  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar></Navbar>}
      {showHotelReg && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/testimonials" element={<Testimonials />}></Route>
          <Route path="/rooms" element={<AllRooms />}></Route>
          <Route path="/rooms/:id" element={<RoomDetails />}></Route>
          <Route path="/my-bookings" element={<Mybookings />}></Route>
          <Route path="/loader/:nextUrl" element={<Loader />}></Route>
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="add-room" element={<AddRoom />}></Route>
            <Route path="list-room" element={<ListRoom />}></Route>
          </Route>
        </Routes>
      </div>
      {!isOwnerPath && <Footer></Footer>}
    </div>
  );
}

export default App;
