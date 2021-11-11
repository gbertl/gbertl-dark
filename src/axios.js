import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api'
    : 'https://gilbertlc-api.herokuapp.com/api';

export const protectedRoute = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

export const axiosInstance = axios.create({
  baseURL,
});

protectedRoute.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const user = jwt_decode(localStorage.getItem('accessToken'));
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (isExpired) {
      try {
        const { data } = await axiosInstance.post('/token/refresh/', {
          refresh: localStorage.getItem('refreshToken'),
        });

        localStorage.setItem('accessToken', data.access);

        protectedRoute.defaults.headers['Authorization'] =
          originalRequest.headers['Authorization'] = `Bearer ${data.access}`;

        return protectedRoute(originalRequest);
      } catch (e) {
        console.log(e);
        alert('login again!');
      }
    }

    return Promise.reject(error);
  }
);
