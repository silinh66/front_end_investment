import axios, { AxiosRequestConfig } from 'axios';
import { config } from './env';
const instanceAxios = {
  baseURL: `${config.app.VITE_APP_API_URL}`,
  timeout: 10000,
};
const api = axios.create({
  baseURL: `${config.app.VITE_APP_API_URL}`,
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'foobar',
  },
});

const axiosConfig = axios.create(instanceAxios);
export const request = ({ method, url, data, ...rest }: AxiosRequestConfig) =>
  axiosConfig({
    method: method,
    url: url,
    data: data,
    ...rest,
  });
export const requestToken = async ({
  method,
  url,
  data,
  ...rest
}: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');

  let options = {
    method: method,
    url: url,
    data: data,

    ...rest,
  };
  if (token)
    options = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'foobar',
        Authorization: `Bearer ${token}`,
      },
    };

  return axiosConfig(options);
};
// Thêm interceptor để xử lý lỗi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
