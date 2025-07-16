import axios from "axios";
import { createContext, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [recentSearchCities, setRecentSearchCities] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      const { role, recentSearchCities, success } = response.data;

      if (success) {
        setIsOwner(role === "hotelOwner"); // or whatever logic you prefer
        setRecentSearchCities(recentSearchCities);
      } else {
        //If  the user is not fetched we are going to fetch it for next 5 seconds.
        setTimeout(() => {
          fetchUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  const value = {
    user,
    toast,
    axios,
    isOwner,
    navigate,
    getToken,
    currency,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    recentSearchCities,
    setRecentSearchCities,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
};
