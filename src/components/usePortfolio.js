import {useEffect} from "react";
import {analytics} from "../firebase";
import {toggleBodyScroll, closeNavbar, showToggler} from "./helper";
import {closeOverlayEffect} from "./overlayEffect";

export default function usePortfolio() {
  useEffect(() => {
    showToggler();
    closeNavbar();
    closeOverlayEffect();

    const filter = document.querySelector(".filter");
    const filterBtns = filter.querySelectorAll(".filter__button");

    filterBtns.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (!e.target.classList.contains("filter__button--active")) {
          toggleBodyScroll();

          const filterStatus = document.querySelector(
            ".portfolio__filter-status"
          );

          filterStatus.classList.add("portfolio__filter-status--open");
          filterStatus.querySelector(
            "p"
          ).innerHTML = `Filtering <span className='text-bold'>${e.target.innerHTML}</span> Works`;

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

    let timer;
    let handleHoldWrapper;
    let handleReleaseWrapper;

    const carousel = () => {
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
        if (counter == images.length - 1) {
          counter = 0;
        } else {
          counter++;
        }
        apply();
        updateDotIndicators();
      };

      const slidePrev = () => {
        if (counter == 0) {
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
        if (images.length == 1) return;

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
          x == 0 ? "dot-indicators__item--active" : ""
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

    let currentItemIndex;

    const setModalBody = (currentItem) => {
      let thumbnails = [];

      currentItem
        .querySelectorAll(".portfolio-item__screenshots img")
        .forEach((img) => {
          thumbnails.push(img.outerHTML);
        });

      modal.querySelector(".modal__thumbnails").innerHTML = thumbnails.join("");

      modal.querySelector(
        ".modal__heading"
      ).innerHTML = currentItem.querySelector(
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
    };

    const updatePrevNextItem = () => {
      if (currentItemIndex !== 0) {
        document
          .querySelector(".modal__prev-work")
          .classList.remove("invisible");

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
        document
          .querySelector(".modal__next-work")
          .classList.remove("invisible");
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

    // use to addEventListener & removeEventListener for carousel
    let slideNextHandler;
    let slidePrevHandler;

    const updateModal = (currentItem) => {
      const currentTitle = currentItem
        .querySelector(".portfolio-item__heading")
        .textContent.split(" ")
        .join("_")
        .toLowerCase();

      analytics.logEvent(`${currentTitle}_opened`);

      setModalBody(currentItem);

      // remove old eventlisteners for carousel (prevent duplication)
      document
        .querySelector(".modal__carousel-next-btn")
        .removeEventListener("click", slideNextHandler);
      document
        .querySelector(".modal__carousel-prev-btn")
        .removeEventListener("click", slidePrevHandler);

      const btnWrapper = document.querySelector(".modal__carousel-btn-wrapper");

      btnWrapper.removeEventListener("mousedown", handleHoldWrapper);
      btnWrapper.removeEventListener("touchstart", handleHoldWrapper);
      btnWrapper.removeEventListener("mouseup", handleReleaseWrapper);
      btnWrapper.removeEventListener("touchend", handleReleaseWrapper);

      carousel();

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
    document
      .querySelector(".modal__close")
      .addEventListener("click", toggleModal);

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

    return () => {
      clearInterval(timer);
    };
  }, []);
}
