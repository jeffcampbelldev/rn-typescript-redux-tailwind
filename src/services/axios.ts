import axios from 'axios';
import { Config } from '_app/config';
import { getAuthToken } from './localStorage';

export const AxiosInstance = axios.create({ baseURL: Config.API_URL });

AxiosInstance.interceptors.request.use(
  async config => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
