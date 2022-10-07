import axios, { AxiosRequestConfig } from "axios";
import { AUTH_KEY } from "../constants/Cookies";
import { getCookies } from "./cookies";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const Axios = axios.create({
  baseURL,
  timeout: 5000,
});

Axios.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = getCookies(AUTH_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});

export default Axios;
