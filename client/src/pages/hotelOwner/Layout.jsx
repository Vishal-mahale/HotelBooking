import React, { useEffect } from "react";
import Navbar from "../../components/hotelOwner/Navbar";
import SideBar from "../../components/hotelOwner/SideBar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

function Layout() {
  
  const { isOwner, navigate } = useAppContext();

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner]);


  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-full">
        <SideBar></SideBar>
        <div className="flex-1 min-h-screen p-4 pt-10 md:px-10 pb-24">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default Layout;
