window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loader").classList.add("loader--hide");
  }, 500);
});

const bgAnimationItems = () => {
  const rows = 7,
    cols = 10;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const div = document.createElement("div");
      div.className = `col-${j + 1}`;
      document.querySelector(".bg-animation-effect").appendChild(div);
    }
  }
};

bgAnimationItems();

const overlayEffect = () => {
  for (let x = 0; x < 10; x++) {
    const div = document.createElement("div");
    div.className = "overlay-effect__item";
    document.querySelector(".overlay-effect").appendChild(div);
  }
};

overlayEffect();

const toggleBodyScroll = () => {
  document.body.classList.toggle("overflow-y-hidden");
};

const filter = document.querySelector(".filter");
const filterBtns = filter.querySelectorAll(".filter__button");

filterBtns.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter__button--active")) {
      toggleBodyScroll();

      const filterStatus = document.querySelector(".portfolio__filter-status");

      filterStatus.classList.add("portfolio__filter-status--open");
      filterStatus.querySelector(
        "p"
      ).innerHTML = `Filtering <span class='text-bold'>${e.target.innerHTML}</span> Works`;

      filter
        .querySelector(".filter__button--active")
        .classList.remove("filter__button--active");
      e.target.classList.add("filter__button--active");

      setTimeout(() => {
        filterItems(e.target);
        filterStatus.classList.remove("portfolio__filter-status--open");
        toggleBodyScroll();
      }, 800);
    }
  });
});

let portfolioItems;

const filterItems = (filterBtn) => {
  const selectedCategory = filterBtn.getAttribute("data-filter");
  document.querySelectorAll(".portfolio-item").forEach((item) => {
    const category = item.getAttribute("data-category").split(",");

    if (
      category.indexOf(selectedCategory) !== -1 ||
      selectedCategory === "all"
    ) {
      item.classList.add("portfolio-item--show");
    } else {
      item.classList.remove("portfolio-item--show");
    }
  });

  portfolioItems = document.querySelectorAll(".portfolio-item--show");
};

filterItems(document.querySelector(".filter__button--active"));

const modal = document.querySelector(".modal");

const updateDotIndicators = (current) => {
  document
    .querySelector(".dot-indicators__item--active")
    .classList.remove("dot-indicators__item--active");
  current.classList.add("dot-indicators__item--active");
};

// Carousel
const carousel = () => {
  const thumbnailWrapper = document.querySelector(".modal__thumbnails");
  const thumbnails = thumbnailWrapper.querySelectorAll("img");
  const thumbnailNextBtn = document.querySelector(".modal__carousel-next-btn");
  const thumbnailPrevBtn = document.querySelector(".modal__carousel-prev-btn");

  const size = thumbnailWrapper.querySelector("img").clientWidth;
  let counter = 0;

  // reset position
  thumbnailWrapper.style.transition = "none";
  thumbnailWrapper.style.transform = `translateX(0)`;

  const apply = () => {
    thumbnailWrapper.style.transition = "0.4s";
    thumbnailWrapper.style.transform = `translateX(${-size * counter}px)`;
  };

  const slideNext = () => {
    if (counter == thumbnails.length - 1) {
      counter = 0;
    } else {
      counter++;
    }
    apply();
  };

  const slidePrev = () => {
    if (counter == 0) {
      counter = thumbnails.length - 1;
    } else {
      counter--;
    }
    apply();
  };

  thumbnailNextBtn.addEventListener("click", () => {
    slideNext();

    updateDotIndicators(
      document.querySelector(`.dot-indicators__item[value='${counter}']`)
    );
  });

  thumbnailPrevBtn.addEventListener("click", () => {
    slidePrev();

    updateDotIndicators(
      document.querySelector(`.dot-indicators__item[value='${counter}']`)
    );
  });

  if (thumbnails.length > 1) {
    document
      .querySelector(".modal__carousel-btn-wrapper")
      .classList.remove("hidden");
    document.querySelector(".dot-indicators").classList.remove("hidden");

    let dotsList = [];

    for (let x = 0; x < thumbnails.length; x++) {
      let button = document.createElement("button");
      button.className = "dot-indicators__item";
      button.value = x;

      let li = document.createElement("li");
      li.innerHTML = button.outerHTML;

      dotsList.push(li.outerHTML);
    }

    document.querySelector(".dot-indicators").innerHTML = dotsList.join("");

    const firstDot = document.querySelector(".dot-indicators__item");
    firstDot.classList.add("dot-indicators__item--active");

    document.querySelectorAll(".dot-indicators__item").forEach((indicator) => {
      indicator.addEventListener("click", (e) => {
        counter = e.target.value;
        apply();

        updateDotIndicators(e.target);
      });
    });
  } else {
    document
      .querySelector(".modal__carousel-btn-wrapper")
      .classList.add("hidden");
    document.querySelector(".dot-indicators").classList.add("hidden");
  }
};

let currentItemIndex;

const setModalBody = (currentItem) => {
  let thumbnails = [];

  currentItem
    .querySelectorAll(".portfolio-item__screenshots img")
    .forEach((img) => {
      thumbnails.push(img.outerHTML);
    });

  modal.querySelector(".modal__thumbnails").innerHTML = thumbnails.join("");

  modal.querySelector(".modal__heading").innerHTML = currentItem.querySelector(
    ".portfolio-item__heading"
  ).innerHTML;

  modal.querySelector(".modal__body").innerHTML = currentItem.querySelector(
    ".portfolio-item__details"
  ).innerHTML;

  currentItemIndex = Array.from(portfolioItems).indexOf(currentItem);

  modal.querySelector(".modal__counter").innerHTML = `${
    currentItemIndex + 1
  } of ${portfolioItems.length}`;

  modal.querySelector(".modal__filter-title").innerHTML = `( ${
    document.querySelector(".filter__button--active").innerHTML
  } )`;

  carousel();
};

const updatePrevNextItem = () => {
  if (currentItemIndex !== 0) {
    document.querySelector(".modal__prev-work").classList.remove("invisible");

    document.querySelector(
      ".modal__prev-work-title"
    ).innerHTML = portfolioItems[currentItemIndex - 1].querySelector(
      ".portfolio-item__heading"
    ).innerHTML;
    document
      .querySelector(".modal__prev-work")
      .querySelector(".modal__small-img").src = portfolioItems[
      currentItemIndex - 1
    ].querySelector(".portfolio-item__img").src;
  } else {
    document.querySelector(".modal__prev-work").classList.add("invisible");
  }

  // if not equal to the last item
  if (currentItemIndex + 1 !== portfolioItems.length) {
    document.querySelector(".modal__next-work").classList.remove("invisible");
    document.querySelector(
      ".modal__next-work-title"
    ).innerHTML = portfolioItems[currentItemIndex + 1].querySelector(
      ".portfolio-item__heading"
    ).innerHTML;
    document
      .querySelector(".modal__next-work")
      .querySelector(".modal__small-img").src = portfolioItems[
      currentItemIndex + 1
    ].querySelector(".portfolio-item__img").src;
  } else {
    document.querySelector(".modal__next-work").classList.add("invisible");
  }
};

const updateModal = (currentItem) => {
  setModalBody(currentItem);
  updatePrevNextItem();
};

const toggleModal = () => {
  modal.classList.toggle("modal--open");
  toggleBodyScroll();
};

document.querySelectorAll(".portfolio-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    updateModal(e.target.closest(".portfolio-item"));
    toggleModal();
    document.querySelector(".modal__overlay").scrollTop = 0;
  });
});

const handleNextPrev = (direction) => {
  if (direction === "next") {
    currentItemIndex++;
  } else if (direction === "prev") {
    currentItemIndex--;
  } else {
    return;
  }

  document
    .querySelector(".modal__transition")
    .classList.add(`modal__transition--${direction}`);

  setTimeout(() => {
    updateModal(portfolioItems[currentItemIndex]);
    document.querySelector(".modal__overlay").scrollTop = 0;
  }, 400);

  setTimeout(() => {
    document
      .querySelector(".modal__transition")
      .classList.remove(`modal__transition--${direction}`);
  }, 1000);
};

document
  .querySelector(".modal__prev-work-btn")
  .addEventListener("click", () => {
    handleNextPrev("prev");
  });

document
  .querySelector(".modal__next-work-btn")
  .addEventListener("click", () => {
    handleNextPrev("next");
  });

// closing of modal
document.querySelector(".modal__close").addEventListener("click", toggleModal);

document.querySelector(".modal").addEventListener("click", (e) => {
  if (!e.target.closest(".modal__content")) {
    toggleModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (document.querySelector(".modal--open") && e.key === "Escape") {
    toggleModal();
  }
});

const toggleContactForm = () => {
  document
    .querySelector(".contact-form")
    .classList.toggle("contact-form--open");
  toggleBodyScroll();
};

document
  .querySelector(".contact__send-btn")
  .addEventListener("click", toggleContactForm);

document
  .querySelector(".contact-form__close")
  .addEventListener("click", toggleContactForm);

document.querySelector(".contact-form").addEventListener("click", (e) => {
  if (!e.target.closest(".contact-form__content")) {
    toggleContactForm();
  }
});

document
  .querySelector(".contact-form__form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2ml4lwk",
        "template_e0ppieo",
        e.target,
        "user_jmQ3lowI4xMVTboiORnz4"
      )
      .then(
        (result) => {
          alert(
            "Your message has been sent successfully, I hope to respond within 24 hours. Thanks!"
          );
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  });

const toggleNavbar = () => {
  document
    .querySelector(".navbar-toggler")
    .classList.toggle("navbar-toggler--active");
  document.querySelector(".navbar").classList.toggle("navbar--open");
};

const toggleOverlayEffect = () => {
  document
    .querySelector(".overlay-effect")
    .classList.toggle("overlay-effect--active");
};

document.querySelector(".navbar-toggler").addEventListener("click", () => {
  toggleNavbar();
  toggleOverlayEffect();
});

const toggleSection = (hash) => {
  // hide section that doesnt have .hidden (shown sections)
  document.querySelectorAll("section:not(.hidden)").forEach((section) => {
    section.classList.add("hidden");
  });
  document.querySelector(hash).classList.remove("hidden");
};

document.querySelectorAll('a[href^="#"]').forEach((hashLink) => {
  hashLink.addEventListener("click", (e) => {
    e.preventDefault();
    const hash = e.target.hash;

    if (e.target.classList.contains("navbar__link")) {
      toggleSection(hash);
      toggleNavbar();
      toggleOverlayEffect();
    } else {
      document
        .querySelector(".navbar-toggler")
        .classList.add("navbar-toggler--hide");
      toggleOverlayEffect();

      setTimeout(() => {
        toggleSection(hash);
        document
          .querySelector(".navbar-toggler")
          .classList.remove("navbar-toggler--hide");
        toggleOverlayEffect();
      }, 950);
    }
  });
});
