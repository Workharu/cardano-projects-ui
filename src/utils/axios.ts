/** Axios **/
import axios, { AxiosRequestConfig } from 'axios';

const { VITE_APP_API_URL } = import.meta.env;
const axiosServices = axios.create({ baseURL: VITE_APP_API_URL || 'http://localhost:8000/api/v1' });

// ==============================|| AXIOS - FOR API SERVICES ||============================== //

/**
 * Axios interceptor to handle request configuration.
 * @param config - AxiosRequestConfig object.
 * @return Modified AxiosRequestConfig object.
 */
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.pathname = '/dashboard/maintenance/500';
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;

/**
 * Fetcher function to handle API requests using axios.
 * @param args - URL string or an array containing the URL and AxiosRequestConfig.
 * @returns The data from the API response.
 */
export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.get(url, { ...config });

  return res.data;
};
