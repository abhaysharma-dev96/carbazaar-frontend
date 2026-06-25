import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
  const { data } = await API.post("/cars", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Delete car
export const deleteCar = async (id) => {
  const { data } = await API.delete(`/cars/${id}`);
  return data;
};
// Update car listing
export const updateCar = async (id, formData) => {
  const { data } = await API.put(`/cars/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};