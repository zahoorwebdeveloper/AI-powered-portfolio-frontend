import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-powered-portfolio-backend.vercel.app/api",
  withCredentials: true,
});

export default api;