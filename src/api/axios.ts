import axios, { AxiosError } from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message = error.response?.data?.message || 'Something went wrong';

    return Promise.reject(new Error(message));
  }
);
