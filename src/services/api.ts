import axios from "axios";
import { getToken } from "../util/token";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication APIs
export const loginUser = (email: string, password: string) =>
  api.post("/login", {
    user: { email, password },
  });

export const signupUser = (
  email: string,
  password: string,
  name: string,
  phone_number: string
) =>
  api.post("/signup", {
    user: { email, password, name, phone_number },
  });

export const getUsers = () => api.get("/users/others");

export const sendSms = (userId: number, message: string) =>
  api.post(`/send_sms?user_id=${userId}&message=${message}`);

export default api;
