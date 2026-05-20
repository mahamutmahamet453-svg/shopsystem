import axios from "axios";

const API = axios.create({
  baseURL:
    "https://shopsystem-3e1y.onrender.com/api",
});

export default API;