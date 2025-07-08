import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { useLocation, Routes, Route } from "react-router-dom";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import Mybookings from "./pages/Mybookings";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/hotelOwner/Layout";
import Dashboard from "./pages/hotelOwner/Dashboard";
import ListRoom from "./pages/hotelOwner/ListRoom"
import AddRoom from "./pages/hotelOwner/AddRoom";

function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {!isOwnerPath && <Navbar></Navbar>}
      {false && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/rooms" element={<AllRooms />}></Route>
          <Route path="/rooms/:id" element={<RoomDetails />}></Route>
          <Route path="/my-bookings" element={<Mybookings />}></Route>
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="add-room" element={<AddRoom />}></Route>
            <Route path="list-room" element={<ListRoom />}></Route>
          </Route>
        </Routes>
      </div>
      {!isOwnerPath &&<Footer></Footer>}
    </div>
  );
}

export default App;
