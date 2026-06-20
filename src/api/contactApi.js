import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const submitContact = async (formData) => {
  const { data } = await API.post("/contact", formData);
  return data;
};