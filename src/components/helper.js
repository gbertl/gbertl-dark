export const toggleBodyScroll = () => {
  document.body.classList.toggle("overflow-y-hidden");
};

export const openNavbar = () => {
  document
    .querySelector(".navbar-toggler")
    .classList.add("navbar-toggler--active");
  document.querySelector(".navbar").classList.add("navbar--open");
};

export const closeNavbar = () => {
  document
    .querySelector(".navbar-toggler")
    .classList.remove("navbar-toggler--active");
  document.querySelector(".navbar").classList.remove("navbar--open");
};

export const hideToggler = () => {
  document
    .querySelector(".navbar-toggler")
    .classList.add("navbar-toggler--hide");
};

export const showToggler = () => {
  document
    .querySelector(".navbar-toggler")
    .classList.remove("navbar-toggler--hide");
};
