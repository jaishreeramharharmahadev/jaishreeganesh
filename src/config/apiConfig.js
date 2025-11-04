// src/config/apiConfig.js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const IS_PROD = import.meta.env.PROD === true;