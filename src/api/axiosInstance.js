// src/api/axiosInstance.js
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";
import { getAccessToken, setAccessToken, clearAccessToken } from "./tokenStore";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // important to send httpOnly refresh cookie
  headers: { "Content-Type": "application/json" },
});

// attach access token if present
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let subscribers = [];

function subscribe(cb) {
  subscribers.push(cb);
}
function onRefreshed(token) {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (!err.response || err.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(err);
    }

    if (isRefreshing) {
      // queue requests while refreshing
      return new Promise((resolve, reject) => {
        subscribe((token) => {
          if (!token) return reject(err);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Call refresh endpoint; server reads httpOnly cookie and returns new accessToken in JSON
      const resp = await axios.post(`${API_BASE_URL}/auth/refresh`, null, { withCredentials: true });
      const newToken = resp.data?.accessToken;
      if (!newToken) throw new Error("Refresh failed: no token");

      setAccessToken(newToken);
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

      isRefreshing = false;
      onRefreshed(newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch (refreshErr) {
      isRefreshing = false;
      onRefreshed(null);
      clearAccessToken();
      return Promise.reject(refreshErr);
    }
  }
);

export default api;