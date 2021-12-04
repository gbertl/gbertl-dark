import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

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

export const checkExpiredToken = () => {
  let isExpired = true;
  if (localStorage.getItem('accessToken')) {
    const user = jwt_decode(localStorage.getItem('accessToken'));
    isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  }
  return isExpired;
};
