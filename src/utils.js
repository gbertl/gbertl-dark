let slideNextHandler;
let slidePrevHandler;
let timer;
let handleHoldWrapper;
let handleReleaseWrapper;

export const carousel = () => {
  const wrapper = document.querySelector(".modal__thumbnails");
  const images = wrapper.querySelectorAll("img");
  const btnWrapper = document.querySelector(".modal__carousel-btn-wrapper");
  const nextBtn = document.querySelector(".modal__carousel-next-btn");
  const prevBtn = document.querySelector(".modal__carousel-prev-btn");
  const dotIndicators = document.querySelector(".dot-indicators");
  let counter = 0;

  // reset position
  wrapper.style.transition = "none";
  wrapper.style.transform = "translateX(0)";

  if (images.length > 1) {
    btnWrapper.classList.remove("hidden");
    dotIndicators.classList.remove("hidden");
  } else {
    btnWrapper.classList.add("hidden");
    dotIndicators.classList.add("hidden");
  }

  const apply = () => {
    const size = images[counter].clientWidth;

    wrapper.style.transition = ".4s";
    wrapper.style.transitionDelay = ".8s";
    wrapper.style.transform = `translateX(${-size * counter}px)`;
  };

  const updateDotIndicators = () => {
    document
      .querySelector(".dot-indicators__item--active")
      .classList.remove("dot-indicators__item--active");

    document
      .querySelector(`.dot-indicators__item[value='${counter}']`)
      .classList.add("dot-indicators__item--active");
  };

  const slideNext = () => {
    if (counter === images.length - 1) {
      counter = 0;
    } else {
      counter++;
    }
    apply();
    updateDotIndicators();
  };

  const slidePrev = () => {
    if (counter === 0) {
      counter = images.length - 1;
    } else {
      counter--;
    }
    apply();
    updateDotIndicators();
  };

  // autoplay
  clearInterval(timer);
  if (images.length > 1) {
    timer = setInterval(() => {
      slideNext();
      updateDotIndicators();
    }, 5000);
  }

  // hold wrapper to pause autoplay
  if (images.length > 1) {
    handleHoldWrapper = () => {
      clearInterval(timer);
    };
    handleReleaseWrapper = () => {
      timer = setInterval(() => {
        slideNext();
        updateDotIndicators();
      }, 5000);
    };

    btnWrapper.addEventListener("mousedown", handleHoldWrapper);
    btnWrapper.addEventListener("touchstart", handleHoldWrapper);
    btnWrapper.addEventListener("mouseup", handleReleaseWrapper);
    btnWrapper.addEventListener("touchend", handleReleaseWrapper);
  }

  const resetTimer = () => {
    if (images.length === 1) return;

    clearInterval(timer);

    timer = setInterval(() => {
      slideNext();
      updateDotIndicators();
    }, 5000);
  };

  // saved for removeEventListener outside this function
  slideNextHandler = () => {
    document
      .querySelector(".chevron-right")
      .classList.add("chevron-right--active");

    setTimeout(() => {
      document
        .querySelector(".chevron-right")
        .classList.remove("chevron-right--active");
    }, 1200);

    resetTimer();
    slideNext();
  };

  slidePrevHandler = () => {
    document
      .querySelector(".chevron-left")
      .classList.add("chevron-left--active");

    setTimeout(() => {
      document
        .querySelector(".chevron-left")
        .classList.remove("chevron-left--active");
    }, 1200);

    resetTimer();
    slidePrev();
  };

  nextBtn.addEventListener("click", slideNextHandler);
  prevBtn.addEventListener("click", slidePrevHandler);

  // create dots
  let dotsList = [];

  for (let x = 0; x < images.length; x++) {
    let button = document.createElement("button");
    button.className = `dot-indicators__item ${
      x === 0 ? "dot-indicators__item--active" : ""
    }`;
    button.value = x;

    let li = document.createElement("li");
    li.innerHTML = button.outerHTML;

    dotsList.push(li.outerHTML);

    dotIndicators.innerHTML = dotsList.join("");
  }

  dotIndicators.querySelectorAll(".dot-indicators__item").forEach((dot) => {
    dot.addEventListener("click", (e) => {
      counter = e.target.value;
      resetTimer();
      apply();
      updateDotIndicators();
    });
  });
};
