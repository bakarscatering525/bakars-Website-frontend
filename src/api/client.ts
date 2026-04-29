// frontend/src/api/client.ts

import axios from "axios";
import { storage } from "@utils/storage";
import { apiBaseUrl } from "./config";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 15000),
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // Example: Add auth token if available
    const token = localStorage.getItem(storage.keys.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Log request errors
    console.error("API request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API response error:", error.response);

      if (error.response.status === 401) {
        // Clear any stale auth token and let the app decide how to react.
        localStorage.removeItem(storage.keys.AUTH_TOKEN);
        window.dispatchEvent(new Event("bakars:auth-unauthorized"));
      }
    } else if (error.request) {
      console.error("No response from API:", error.request);
    } else {
      console.error("API error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
