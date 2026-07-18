import axios from "axios";

const API = axios.create({
  baseURL: "https://carbazaar-backend-2a1e.onrender.com/api",
});
// Get all cars with filters
export const fetchCars = async (params = {}) => {
  const { data } = await API.get("/cars", { params });
  return data;
};

// Get single car by ID
export const fetchCarById = async (id) => {
  const { data } = await API.get(`/cars/${id}`);
  return data;
};

// Create new car listing
export const createCar = async (formData) => {
  const token = JSON.parse(localStorage.getItem("carbazaar_user"))?.token;
  const { data } = await API.post("/cars", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export const updateCar = async (id, formData) => {
  const token = JSON.parse(localStorage.getItem("carbazaar_user"))?.token;
  const { data } = await API.put(`/cars/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteCar = async (id) => {
  const token = JSON.parse(localStorage.getItem("carbazaar_user"))?.token;
  const { data } = await API.delete(`/cars/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};