import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

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

export default api;
