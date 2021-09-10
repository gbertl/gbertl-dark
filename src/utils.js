export const toggleBodyScroll = () => {
  document.body.classList.toggle('overflow-y-hidden');
};

export const hideBodyScroll = () => {
  document.body.classList.add('overflow-y-hidden');
};

export const showBodyScroll = () => {
  document.body.classList.remove('overflow-y-hidden');
};

export const openNavbar = () => {
  document
    .querySelector('.navbar-toggler')
    .classList.add('navbar-toggler--active');
  document.querySelector('.navbar').classList.add('navbar--open');
};

export const closeNavbar = () => {
  document
    .querySelector('.navbar-toggler')
    .classList.remove('navbar-toggler--active');
  document.querySelector('.navbar').classList.remove('navbar--open');
};

export const hideToggler = () => {
  document
    .querySelector('.navbar-toggler')
    .classList.add('navbar-toggler--hide');
};

export const showToggler = () => {
  document
    .querySelector('.navbar-toggler')
    .classList.remove('navbar-toggler--hide');
};

export const generateOverlayEffect = () => {
  for (let x = 0; x < 10; x++) {
    const div = document.createElement('div');
    div.className = 'overlay-effect__item';
    document.querySelector('.overlay-effect').appendChild(div);
  }
};

export const openOverlayEffect = () => {
  document
    .querySelector('.overlay-effect')
    .classList.add('overlay-effect--active');
};

export const closeOverlayEffect = () => {
  document
    .querySelector('.overlay-effect')
    .classList.remove('overlay-effect--active');
};
