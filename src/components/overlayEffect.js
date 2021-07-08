export const generateOverlayEffect = () => {
  for (let x = 0; x < 10; x++) {
    const div = document.createElement("div");
    div.className = "overlay-effect__item";
    document.querySelector(".overlay-effect").appendChild(div);
  }
};

export const openOverlayEffect = () => {
  document
    .querySelector(".overlay-effect")
    .classList.add("overlay-effect--active");
};

export const closeOverlayEffect = () => {
  document
    .querySelector(".overlay-effect")
    .classList.remove("overlay-effect--active");
};
