import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const registerUser = async (formData) => {
  const { data } = await API.post("/auth/register", formData);
  return data;
};

export const loginUser = async (formData) => {
  const { data } = await API.post("/auth/login", formData);
  return data;
};