import axios from 'axios';
import Router from 'next/router';
import { checkExpiredToken } from './utils';
import * as api from './api';
import Cookies from 'universal-cookie';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api'
    : 'https://gilbertlc-api.herokuapp.com/api';

const cookies = new Cookies();

export const protectedRoute = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${
      typeof window !== 'undefined' ? cookies.get('accessToken') : null
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

    const tokenExpired = checkExpiredToken(cookies.get('accessToken'));

    if (tokenExpired) {
      try {
        const accessToken = await api.refreshToken(cookies.get('refreshToken'));
        cookies.set('accessToken', accessToken, { path: '/' });

        protectedRoute.defaults.headers['Authorization'] =
          originalRequest.headers['Authorization'] = `Bearer ${cookies.get(
            'accessToken'
          )}`;

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
