import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});



axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    // Handle 401/403 globally
    if (err.response?.status === 401) {
      console.warn('Unauthorized! Redirecting...');
      // Redirect or logout
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
