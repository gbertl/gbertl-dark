import axios from 'axios';
import Router from 'next/router';
import { checkExpiredToken } from './utils';
import * as api from './api';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api'
    : 'https://gilbertlc-api.herokuapp.com/api';

export const protectedRoute = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    }`,
  },
});

export const axiosInstance = axios.create({
  baseURL,
});

protectedRoute.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const tokenExpired = checkExpiredToken();

    if (tokenExpired) {
      try {
        await api.refreshToken();
        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${localStorage.getItem('accessToken')}`;

        return protectedRoute(originalRequest);
      } catch {
        Router.push({
          pathname: '/login',
          query: { ...Router.query, goBack: Router.pathname },
        });
      }
    }

    return Promise.reject(error);
  }
);
