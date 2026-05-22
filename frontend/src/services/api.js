import axios from "axios";

const API = axios.create({
  baseURL: "https://shopsystem-3e1y.onrender.com/api",
});

// ADD TOKEN TO EVERY REQUEST
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;