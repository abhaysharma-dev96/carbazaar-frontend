import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("carbazaar_user"))?.token}`,
  },
});

export const getWishlist = async () => {
  const { data } = await API.get("/wishlist", getConfig());
  return data;
};

export const addToWishlist = async (carId) => {
  const { data } = await API.post(`/wishlist/${carId}`, {}, getConfig());
  return data;
};

export const removeFromWishlist = async (carId) => {
  const { data } = await API.delete(`/wishlist/${carId}`, getConfig());
  return data;
};