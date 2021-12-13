import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import Cookies from 'universal-cookie';
import * as api from './api';
import { protectedRoute } from './axios';

export const toggleBodyScroll = () => {
  document.body.classList.toggle('overflow-y-hidden');
};

export const hideBodyScroll = () => {
  document.body.classList.add('overflow-y-hidden');
};

export const showBodyScroll = () => {
  document.body.classList.remove('overflow-y-hidden');
};

export const generateOverlayEffect = () => {
  for (let x = 0; x < 10; x++) {
    const div = document.createElement('div');
    div.className = 'overlay-effect__item';
    document.querySelector('.overlay-effect').appendChild(div);
  }
};

export const checkExpiredToken = (accessToken) => {
  let isExpired = true;

  if (accessToken) {
    const user = jwt_decode(accessToken);
    isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  }

  return isExpired;
};

export const isAuthenticated = async ({ req }) => {
  const cookies = new Cookies(req.headers.cookie);
  const tokenExpired = checkExpiredToken(cookies.get('accessToken'));

  if (tokenExpired) {
    try {
      const accessToken = await api.refreshToken(cookies.get('refreshToken'));
      cookies.set('accessToken', accessToken, {
        path: '/',
        expires: dayjs.unix(jwt_decode(accessToken).exp).toDate(),
      });

      protectedRoute.defaults.headers['Authorization'] = `Bearer ${cookies.get(
        'accessToken'
      )}`;

      return true;
    } catch {
      return false;
    }
  } else {
    return true;
  }
};
