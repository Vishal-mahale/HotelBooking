import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { useLocation, Routes, Route } from "react-router-dom";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";

function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");
  console.log(isOwnerPath);

  return (
    <div>
      {!isOwnerPath && <Navbar></Navbar>}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/rooms" element={<AllRooms />}></Route>
          <Route path="/rooms/:id" element={<RoomDetails />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
