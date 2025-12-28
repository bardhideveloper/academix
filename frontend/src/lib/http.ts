import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});


http.interceptors.request.use((config) => {
  const token = localStorage.getItem("ax_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.detail ||
      err?.response?.data?.message ||
      err.message ||
      "Unexpected error";
    return Promise.reject({ ...err, friendlyMessage: message });
  }
);
